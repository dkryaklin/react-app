import { ItemInterface } from "components/types";
import { Item } from 'components/components';
import { CARD_SIZE } from "components/constants";
import { useState, useEffect } from "react";

function ItemComponent({ item, isSelected }: { item: ItemInterface, isSelected: boolean }) {
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
        <Item.Button>{buttonLabel}</Item.Button>
      </Item.Data>
    </Item.Root>);
}

export default ItemComponent;