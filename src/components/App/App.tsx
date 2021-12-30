import React, { useEffect, useState, useRef } from 'react';
import { App } from 'components/components';
import { ItemInterface } from 'components/types';
import { getRenderItems } from 'components/helpers';
import SearchComponent from 'components/Search/Search';
import ItemsListComponent from 'components/ItemsList/ItemsList';
import { useAppSelector } from 'store/hooks';
import { FETCH_ITEMS_FN, SEARCH_DEBOUNCE_TIME, SEARCH_ITEMS_FN } from 'components/constants';

const worker = new Worker(new URL('./worker.js', import.meta.url));

function AppComponent() {
  const query = useAppSelector((state) => state.query.value);

  const [items, setItems] = useState([] as ItemInterface[]);
  const [renderItems, setRenderItems] = useState([] as ItemInterface[]);

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const animFrameRef = useRef(0);
  const searchDebRef = useRef(0);

  const lastSearchedQuery = useRef(query);

  const onScroll = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    animFrameRef.current = requestAnimationFrame(() => {
      const renderItems = getRenderItems(scrollRef.current, items);
      setRenderItems(renderItems);
    });
  };

  useEffect(() => {
    worker.postMessage([FETCH_ITEMS_FN]);

    const workerCallback = (e: MessageEvent<any>) => {
      const [fn, { items, query: searchedQuery }] = e.data;

      if (fn === FETCH_ITEMS_FN) {
        setLoading(false);
      }

      if (fn === SEARCH_ITEMS_FN && lastSearchedQuery.current === searchedQuery) {
        setItems(items);
      }
    };

    worker.addEventListener('message', workerCallback);

    return () => {
      worker.removeEventListener('message', workerCallback);
      worker.terminate();
    }
  }, []);

  useEffect(() => {
    setRenderItems(getRenderItems(scrollRef.current, items));
  }, [items]);

  useEffect(() => {
    if (loading) {
      return;
    }

    clearTimeout(searchDebRef.current);

    searchDebRef.current = window.setTimeout(() => {
      lastSearchedQuery.current = query;
      worker.postMessage([SEARCH_ITEMS_FN, [query]]);
    }, SEARCH_DEBOUNCE_TIME);
  }, [loading, query]);

  let content = <ItemsListComponent items={renderItems} itemsLength={items.length} />;

  if (loading) {
    content = <App.Message>loading...</App.Message>;
  } else if (!loading && !items.length && query) {
    content = <App.Message>nothing to show</App.Message>;
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
