import { ItemInterface } from "components/types";
import { Item } from 'components/components';
import { CARD_SIZE } from "components/constants";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { actions } from 'store/searchSlice';
import { useImageLoaded, getMarkedTextChunks } from 'components/helpers';
import React from 'react';

function getMarkedText(str: string, query: string) {
  const chunks = getMarkedTextChunks(str, query);

  return chunks.map((chunk: { text: string; key?: string; marked?: boolean }) => {
    if (chunk.marked) {
      return <mark key={chunk.key}>{chunk.text}</mark>;
    }

    return chunk.text;
  })
};

function ItemComponent({ item }: { item: ItemInterface }) {
  const selectedItems = useAppSelector((state) => state.search.selectedItems);
  const query = useAppSelector((state) => state.search.query);

  const dispatch = useAppDispatch();

  const isSelected = selectedItems.includes(item.id);

  const buttonLabel = isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE';
  const top = CARD_SIZE.heightWithGap * item.position;

  const imageLoaded = useImageLoaded();

  function buttonClick() {
    if (isSelected) {
      dispatch(actions.unselectItem(item.id));
    } else {
      dispatch(actions.selectItem(item.id));
    }
  };

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
        <Item.Button onClick={buttonClick}>{buttonLabel}</Item.Button>
      </Item.Data>
    </Item.Root>);
}

export default React.memo(ItemComponent);