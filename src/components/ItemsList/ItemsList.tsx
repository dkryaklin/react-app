import { ItemsList } from 'components/components';
import { CARD_SIZE } from 'components/constants';
import { useAppSelector } from 'store/hooks';
import ItemComponent from 'components/Item/Item';


function ItemsListComponent() {
  const items = useAppSelector((state) => state.search.items);

  const renderFrom = useAppSelector((state) => state.search.renderFrom);
  const renderTo = useAppSelector((state) => state.search.renderTo);

  const listHeight = CARD_SIZE.heightWithGap * items.length;

  const itemsToRender = [];
  for (let i = renderFrom; i <= renderTo; i++) {
    const item = items[i];

    if (item) {
      itemsToRender.push(<ItemComponent key={item.email} item={item} />);
    }
  }

  return (
    <ItemsList.Root style={{ height: `${listHeight}px` }}>
      {itemsToRender}
    </ItemsList.Root>
  );
}

export default ItemsListComponent;