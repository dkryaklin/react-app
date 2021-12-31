import { ItemsList } from 'components/components';
import { CARD_SIZE } from 'components/constants';
import ItemClassComponent from 'components/Item/ItemClass';
import { connect } from 'react-redux';
import { RootState } from 'store/store';
import { ItemInterface } from 'components/types';
import React from 'react';

interface ItemsListProps {
  items: ItemInterface[],
  renderFrom: number,
  renderTo: number,
}

class ItemsListClassComponent extends React.Component<ItemsListProps> {
  render() {
    const { items, renderFrom, renderTo } = this.props;

    const listHeight = CARD_SIZE.heightWithGap * items.length;

    const itemsToRender = [];
    for (let i = renderFrom; i <= renderTo; i++) {
      const item = items[i];

      if (item) {
        itemsToRender.push(<ItemClassComponent key={item.email} item={item} />);
      }
    }

    return (
      <ItemsList.Root style={{ height: `${listHeight}px` }}>
        {itemsToRender}
      </ItemsList.Root>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.search.items,
  renderFrom: state.search.renderFrom,
  renderTo: state.search.renderTo,
});

export default connect(mapStateToProps)(React.memo(ItemsListClassComponent));