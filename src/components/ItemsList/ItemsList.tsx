import { ItemInterface } from 'components/types';
import { ItemsList } from 'components/components';
import { CARD_SIZE } from 'components/constants';
import ItemComponent from 'components/Item/Item';

function ItemsListComponent({ items, itemsLength }: { items: ItemInterface[], itemsLength: number }) {
  const listHeight = CARD_SIZE.heightWithGap * itemsLength;

  return (
    <ItemsList.Root style={{ height: `${listHeight}px` }}>
      {items.map((item) => (
        <ItemComponent key={item.email} item={item} isSelected={false} />
      ))}
    </ItemsList.Root>
  );
}

export default ItemsListComponent;