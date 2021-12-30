import { Search } from "components/components";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setQuery } from 'store/querySlice';

export default function SearchComponent() {
  const query = useAppSelector((state) => state.query.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (query) {
      searchParams.set("q", query);
    } else {
      searchParams.delete('q');
    }

    const params = searchParams.toString();

    let newRelativePathQuery = window.location.pathname;
    if (params) {
      newRelativePathQuery += `?${params}`;
    }

    window.history.pushState(null, '', newRelativePathQuery);
  }, [query]);

  return (
    <Search.Root>
      <Search.Icon />
      <Search.Input value={query} onChange={(e) => dispatch(setQuery(e.target.value))} />
    </Search.Root>
  )
};