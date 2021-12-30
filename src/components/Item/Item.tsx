import { ItemInterface } from "components/types";
import { Item } from 'components/components';
import { CARD_SIZE } from "components/constants";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectItem, unselectItem } from 'store/selectedItemsSlice';

function getMarkedText(str: string, query: string) {
  const lowerCaseStr = str.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();

  if (!lowerCaseQuery || !lowerCaseStr.includes(lowerCaseQuery)) {
    return str;
  }

  const results: Array<string | React.ReactElement<any, any>> = [];
  const chunks = lowerCaseStr.split(lowerCaseQuery);

  let start = 0;
  chunks.forEach((chunk: string, index: number) => {
    results.push(str.substring(start, start + chunk.length));
    start += chunk.length;

    if (index !== chunks.length - 1) {
      results.push(<mark key={`${chunk}${index}`}>{str.substring(start, start + query.length)}</mark>);
      start += query.length;
    }
  });

  return results;
};

function ItemComponent({ item }: { item: ItemInterface }) {
  const selectedItems = useAppSelector((state) => state.selectedItems.value);
  const query = useAppSelector((state) => state.query.value);

  const dispatch = useAppDispatch();

  const isSelected = selectedItems.includes(item.id);

  const buttonLabel = isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE';
  const top = CARD_SIZE.heightWithGap * item.position;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return (() => {
      clearTimeout(timeout);
    });
  }, []);

  function buttonClick() {
    if (isSelected) {
      dispatch(unselectItem(item.id));
    } else {
      dispatch(selectItem(item.id));
    }
  };

  return (
    <Item.Root isSelected={isSelected} style={{ top: `${top}px` }}>
      <Item.ImgWrapper>
        {loaded && <Item.Img src={item.avatar} alt={item.name} loading="lazy" srcSet={item.avatarSrcSet} />}
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