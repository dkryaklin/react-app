import React, { useEffect, useState, useRef } from 'react';
import { App } from 'components/components';
import { ItemInterface } from 'components/types';
import { getRenderItems } from 'components/helpers';
import SearchComponent from 'components/Search/Search';
import ItemsListComponent from 'components/ItemsList/ItemsList';

function AppComponent() {
  const [items, setItems] = useState([] as ItemInterface[]);
  const [renderItems, setRenderItems] = useState([] as ItemInterface[]);

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const debounceRef = useRef(0);

  const onScroll = () => {
    if (debounceRef.current) {
      cancelAnimationFrame(debounceRef.current);
    }

    debounceRef.current = requestAnimationFrame(() => {
      const renderItems = getRenderItems(scrollRef.current, items);
      setRenderItems(renderItems);
    });
  };

  useEffect(() => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    worker.postMessage('fetchItems');

    worker.onmessage = (e) => {
      const items = e.data as ItemInterface[];
      const renderItems = getRenderItems(scrollRef.current, items);

      setLoading(false);
      setItems(items);
      setRenderItems(renderItems);
    };

    return () => {
      worker.terminate();
    }
  }, []);

  let content = <ItemsListComponent items={renderItems} itemsLength={items.length} />;

  if (loading) {
    content = <App.Message>loading...</App.Message>;
  }

  return (
    <App.Root>
      <App.ScrollContainer ref={scrollRef} onScroll={onScroll}>
        <SearchComponent />
        {content}
      </App.ScrollContainer>
      <App.ScrollLine />
    </App.Root>
  );
}

export default AppComponent;
