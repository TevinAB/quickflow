import './index.css';
import Tag from '../Tag';
import Search from '../Search';
import { SearchType, SearchResultItem } from '../../types';

type AddAssocItemProps = {
  labelText: string;
  itemType: SearchType;
  selectedItems: Array<SearchResultItem>;
  onItemSelect: (selectedItem: SearchResultItem) => void;
  onItemRemove: (removedItem: SearchResultItem) => void;
};

export default function AddAssocItem({
  labelText,
  itemType,
  selectedItems,
  onItemSelect,
  onItemRemove,
}: AddAssocItemProps) {
  return (
    <div className="add-assoc">
      <label className="add-assoc__label" htmlFor="search">
        {labelText}
      </label>
      <Search
        searchType={itemType}
        inputId="search"
        shouldSubmit={false}
        customOnClick={(selectedItem, setQuery) => {
          onItemSelect(selectedItem);
          setQuery('');
        }}
      />
      <div className="add-assoc__tags">
        {selectedItems.map((item) => (
          <Tag
            key={item._id}
            text={item.name}
            removeButton
            onRemove={() => onItemRemove(item)}
          />
        ))}
      </div>
    </div>
  );
}
