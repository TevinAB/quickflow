import './index.css';
import Tag from '../Tag';
import Search from '../Search';
import type { SearchType, SearchResultItem } from '../../types';

type AddAssocItemProps = {
  id?: string;
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
  id,
}: AddAssocItemProps) {
  return (
    <div className="add-assoc">
      <Search
        searchType={itemType}
        inputId={id}
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
