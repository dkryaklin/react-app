import { Search } from "components/components";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { actions, filterItemsThunk } from 'store/searchSlice';
import { useRef } from 'react';
import { SEARCH_DEBOUNCE_TIME } from 'components/constants';

export default function SearchComponent() {
  const query = useAppSelector((state) => state.search.query);
  const dispatch = useAppDispatch();

  const searchDebRef = useRef(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    dispatch(actions.setQuery(query));

    clearTimeout(searchDebRef.current);

    searchDebRef.current = window.setTimeout(() => {
      dispatch(filterItemsThunk(query));
    }, SEARCH_DEBOUNCE_TIME);
  };

  return (
    <Search.Root>
      <Search.Icon />
      <Search.Input value={query} onChange={onChange} />
    </Search.Root>
  )
};