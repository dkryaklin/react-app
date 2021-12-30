import { ItemInterface } from "components/types";
import { Item } from 'components/components';
import { CARD_SIZE } from "components/constants";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectItem, unselectItem } from 'store/selectedItemsSlice';

function ItemComponent({ item }: { item: ItemInterface }) {
  const selectedItems = useAppSelector((state) => state.selectedItems.value);
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
        <Item.Name>{item.name}</Item.Name>
        <Item.Title>{item.title}</Item.Title>
        <Item.Address>{item.address}, {item.city}</Item.Address>
        <Item.Email>{item.email}</Item.Email>
        <Item.Splitter isSelected={isSelected} />
        <Item.Button onClick={buttonClick}>{buttonLabel}</Item.Button>
      </Item.Data>
    </Item.Root>);
}

export default ItemComponent;