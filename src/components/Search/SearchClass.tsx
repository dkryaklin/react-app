import { Search } from "components/components";
import { actions, filterItemsThunk } from 'store/searchSlice';
import { SEARCH_DEBOUNCE_TIME } from 'components/constants';
import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "store/store";

interface SearchProps {
  query: string,
  setQuery: (query: string) => void,
  filterItemsThunk: (query: string) => void,
};

class SearchClassComponent extends React.Component<SearchProps> {
  searchDebRef: number;

  constructor(props: SearchProps) {
    super(props);
    this.searchDebRef = 0;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { setQuery, filterItemsThunk } = this.props;

    const query = e.target.value;

    setQuery(query);

    clearTimeout(this.searchDebRef);

    this.searchDebRef = window.setTimeout(() => {
      filterItemsThunk(query);
    }, SEARCH_DEBOUNCE_TIME);
  };

  render() {
    const { query } = this.props;

    return (
      <Search.Root>
        <Search.Icon />
        <Search.Input value={query} onChange={(e) => this.onChange(e)} />
      </Search.Root >
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  query: state.search.query,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setQuery: (query: string) => dispatch(actions.setQuery(query)),
  filterItemsThunk: (query: string) => dispatch(filterItemsThunk(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchClassComponent));