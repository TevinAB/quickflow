import './index.css';
import { SearchType, SearchResultItem } from '../../types';
import { getIcon } from '../../utils';
import { useSearch } from '../../hooks/search';
import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

type SearchProps = {
  shouldSubmit: boolean;
  searchType?: SearchType;
  searchTypeList?: (
    setType: (type: SetStateAction<SearchType>) => void
  ) => JSX.Element;
  customOnClick?: (
    selectedResult: SearchResultItem,
    setQuery: (query: SetStateAction<string>) => void
  ) => void;
  inputId?: string;
};

export default function Search({
  searchType,
  searchTypeList,
  shouldSubmit,
  customOnClick,
  inputId,
}: SearchProps) {
  const history = useHistory();
  const authToken = useAppSelector((state) => state.user.token);
  const [type, setType] = useState<SearchType>('Contact');
  const [query, setQuery] = useState('');
  const { data, loading, error } = useSearch(type, query, {
    authToken: authToken,
  });

  const [showResults, setShowResults] = useState(false);
  const typeaheadRef = useRef<HTMLDivElement | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const activeResultRef = useRef<HTMLDivElement | null>(null);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [resultCount, setResultCount] = useState(0);

  const handleKeyboardTraversal = (event: KeyboardEvent) => {
    let newIndex: number = 0;

    if (event.key === 'ArrowDown') {
      newIndex = activeResultIndex + 1;
      if (newIndex >= resultCount) newIndex = 0;
      setActiveResultIndex(newIndex);
    } else if (event.key === 'ArrowUp') {
      newIndex = activeResultIndex - 1;
      if (newIndex < -1) newIndex = resultCount - 1;
      setActiveResultIndex(newIndex);
    }
  };

  const handleClick = (id: string) => {
    const selectedDoc = data?.filter((doc) => doc._id === id).pop();

    if (customOnClick && selectedDoc) {
      customOnClick(selectedDoc, setQuery);
    } else {
      const docType = String(selectedDoc?.__type).toLowerCase();

      history.push(`/${docType}/${id}`);

      const newQueryText = selectedDoc?.name || '';
      setQuery(newQueryText);
    }

    setShowResults(false);
  };

  const handleKeyDownInSearch = (event: KeyboardEvent) => {
    //allow selecting a result by pressing enter key
    if (event.key === 'Enter') {
      if (!shouldSubmit) return;

      if (activeResultRef.current) {
        //use the currently highlighted result to search
        const docId = activeResultRef.current.getAttribute('data-id') || '';

        handleClick(docId);
      }

      searchBoxRef.current?.blur();
      setActiveResultIndex(-1);
    } else {
      handleKeyboardTraversal(event);
    }
  };

  useEffect(() => {
    if (searchType) setType(searchType);
  }, [searchType]);

  useEffect(() => {
    if (data) setResultCount(data.length);
  }, [data]);

  useEffect(() => {
    function handleClickAway(event: MouseEvent) {
      if (
        !searchBoxRef.current?.contains(event.target as Node) &&
        !typeaheadRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener('click', handleClickAway);

    return () => document.removeEventListener('click', handleClickAway);
  }, []);

  return (
    <div className="search">
      <div className="search__inner-wrapper">
        {searchTypeList && (
          <div style={{ width: '120px', maxWidth: '120px' }}>
            {searchTypeList(setType)}
          </div>
        )}

        <TextField
          id={inputId || 'search-box'}
          inputRef={searchBoxRef}
          className="search__box"
          type="text"
          size="small"
          value={query}
          onKeyDown={handleKeyDownInSearch}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
      </div>
      {showResults && (
        <Typeahead
          searchResults={data?.length ? data : []}
          activeResultRef={activeResultRef}
          typeaheadRef={typeaheadRef}
          activeResultIndex={activeResultIndex}
          handleClick={handleClick}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}

type TypeaheadProps = {
  handleClick: (id: string) => void;
  searchResults: Array<SearchResultItem>;
  loading: boolean;
  error: boolean;
  activeResultIndex?: number;
  activeResultRef?: MutableRefObject<HTMLDivElement | null>;
  typeaheadRef?: MutableRefObject<HTMLDivElement | null>;
};

export function Typeahead({
  searchResults,
  handleClick,
  activeResultIndex,
  activeResultRef,
  typeaheadRef,
  loading,
  error,
}: TypeaheadProps) {
  const showError = <div className="search--error">An Error Has Occurred</div>;

  const showLoading = (
    <CircularProgress style={{ width: '32px', height: '32px' }} />
  );

  const showNothingFound = <div>No Results</div>;

  const showResults = searchResults.map((item, index) => {
    const isActive = activeResultIndex === index;
    const Icon = getIcon(item.__type);
    let classes = 'result';

    if (isActive) classes += ' active-result';

    return (
      <div
        onClick={handleClick.bind(null, item._id)}
        className={classes}
        ref={isActive ? activeResultRef : null}
        data-id={item._id}
        key={item._id}
      >
        <div className="result__icon">
          <Icon />
        </div>
        <div className="result__text">
          <span className="result--text__wrapper">{item.name}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="typeahead" ref={typeaheadRef}>
      {error && showError}
      {!error && loading && showLoading}
      {!error && !loading && searchResults.length > 0 && showResults}
      {!error && !loading && !searchResults.length && showNothingFound}
    </div>
  );
}
