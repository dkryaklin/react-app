import { Item } from 'components/components';
import { CARD_SIZE, IMAGE_LOAD_DELAY_TIME } from "components/constants";
import { actions } from 'store/searchSlice';
import { getMarkedTextChunks } from 'components/helpers';
import React from 'react';
import { connect } from 'react-redux';
import { ItemInterface } from 'components/types';
import { RootState, AppDispatch } from 'store/store';

interface ItemProps {
  item: ItemInterface,
  selectedItems: number[],
  query: string,
  unselectItem: (itemId: number) => void,
  selectItem: (itemId: number) => void,
}

interface ItemState {
  imageLoaded: boolean,
}

function getMarkedText(str: string, query: string) {
  const chunks = getMarkedTextChunks(str, query);

  return chunks.map((chunk: { text: string; key?: string; marked?: boolean }) => {
    if (chunk.marked) {
      return <mark key={chunk.key}>{chunk.text}</mark>;
    }

    return chunk.text;
  })
};

class ItemClassComponent extends React.Component<ItemProps, ItemState> {
  timeout: number;

  constructor(props: ItemProps) {
    super(props);

    this.timeout = 0;

    this.state = {
      imageLoaded: false,
    }
  }

  isSelected() {
    const { selectedItems, item } = this.props;
    return selectedItems.includes(item.id);
  }

  buttonClick() {
    const { unselectItem, selectItem, item } = this.props;

    if (this.isSelected()) {
      unselectItem(item.id);
    } else {
      selectItem(item.id);
    }
  };

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({ imageLoaded: true });
    }, IMAGE_LOAD_DELAY_TIME);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { item, query } = this.props;
    const { imageLoaded } = this.state;

    const isSelected = this.isSelected();

    const buttonLabel = isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE';
    const top = CARD_SIZE.heightWithGap * item.position;

    return (
      <Item.Root isSelected={isSelected} style={{ top: `${top}px` }}>
        <Item.ImgWrapper>
          {imageLoaded && <Item.Img src={item.avatar} alt={item.name} loading="lazy" srcSet={item.avatarSrcSet} />}
        </Item.ImgWrapper>
        <Item.Data>
          <Item.Name>{getMarkedText(item.name, query)}</Item.Name>
          <Item.Title>{getMarkedText(item.title, query)}</Item.Title>
          <Item.Address>{getMarkedText(item.address, query)}, {getMarkedText(item.city, query)}</Item.Address>
          <Item.Email>{getMarkedText(item.email, query)}</Item.Email>
          <Item.Splitter isSelected={isSelected} />
          <Item.Button onClick={() => this.buttonClick()}>{buttonLabel}</Item.Button>
        </Item.Data>
      </Item.Root >);
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedItems: state.search.selectedItems,
  query: state.search.query,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  unselectItem: (itemId: number) => dispatch(actions.unselectItem(itemId)),
  selectItem: (itemId: number) => dispatch(actions.selectItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ItemClassComponent));