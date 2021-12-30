import React, { useEffect, useRef } from 'react';
import { App } from 'components/components';
import { getRenderItemsRange } from 'components/helpers';
import SearchComponent from 'components/Search/Search';
import ItemsListComponent from 'components/ItemsList/ItemsList';
import { fetchItemsThunk, actions } from 'store/searchSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

function AppComponent() {
  const items = useAppSelector((state) => state.search.items);
  const loading = useAppSelector((state) => state.search.loading);

  const dispatch = useAppDispatch();

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const animFrameRef = useRef(0);

  const onScroll = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    animFrameRef.current = requestAnimationFrame(() => {
      const renderItemsRange = getRenderItemsRange(scrollRef.current);
      dispatch(actions.setRenderItemsRange(renderItemsRange));
    });
  };

  useEffect(() => {
    dispatch(fetchItemsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (loading) {
    content = <App.Message>loading...</App.Message>;
  } else if (!loading && !items.length) {
    content = <App.Message>nothing to show</App.Message>;
  } else {
    content = <ItemsListComponent />;
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
