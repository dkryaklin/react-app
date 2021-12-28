import React from 'react';
import { App, Search, Item } from './components';

interface ItemInterface {
  id: number;
  imageUrl: string;
  name: string;
  title: string;
  address: string;
  email: string;
}

function SearchComponent() {
  return (
    <Search.Root>
      <Search.Icon />
      <Search.Input />
    </Search.Root>
  )
};

function ItemsListComponent({ items }: { items: ItemInterface[] }) {
  return (
    <React.Fragment>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} isSelected={true} />)
      )}
    </React.Fragment>
  );
}

function ItemComponent({ item, isSelected }: { item: ItemInterface, isSelected: true }) {
  const buttonLabel = isSelected ? 'SKIP SELECTION' : 'MARK AS SIUTABLE';

  return (
    <Item.Root isSelected>
      <Item.Img src={item.imageUrl} alt={item.name} />
      <Item.Data>
        <Item.Name>{item.name}</Item.Name>
        <Item.Title>{item.title}</Item.Title>
        <Item.Address>{item.address}</Item.Address>
        <Item.Email>{item.email}</Item.Email>
        <Item.Splitter isSelected />
        <Item.Button>{buttonLabel}</Item.Button>
      </Item.Data>
    </Item.Root>);
}

const mockItem: ItemInterface = {
  id: 1,
  imageUrl: 'https://robohash.org/perferendissapienteodit.png?size=136x136',
  name: 'Josie Waters',
  title: 'Investor Integration Supervisor',
  address: `22745 O'Kon Parks, Ernsermouth`,
  email: 'alex@fisherking.co',
};

const mockList = new Array(100).fill(mockItem);

function AppComponent() {
  return (

    <App.Root>
      <App.ScrollContainer>
        <SearchComponent />
        <ItemsListComponent items={mockList} />
      </App.ScrollContainer>
      <App.ScrollLine />
    </App.Root>
  );
}

export default AppComponent;
