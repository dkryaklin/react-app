import React from 'react';
import { connect } from 'react-redux';
import { App } from 'components/components';
import { getRenderItemsRange } from 'components/helpers';
import SearchClassComponent from 'components/Search/SearchClass';
import ItemsListClassComponent from 'components/ItemsList/ItemsListClass';
import { ItemInterface, RenderItemsRange } from 'components/types';
import { AppDispatch, RootState } from 'store/store';
import { actions, fetchItemsThunk } from 'store/searchSlice';

interface AppProps {
  items: ItemInterface[],
  loading: boolean,
  setRenderItemsRange: (renderItemsRange: RenderItemsRange) => void,
  fetchItemsThunk: () => void,
}

class AppClassComponent extends React.Component<AppProps> {
  scrollRef: React.RefObject<HTMLDivElement>;
  animFrameRef: number;

  constructor(props: AppProps) {
    super(props);

    this.scrollRef = React.createRef();
    this.animFrameRef = 0;
  }

  onScroll() {
    if (this.animFrameRef) {
      cancelAnimationFrame(this.animFrameRef);
    }

    this.animFrameRef = requestAnimationFrame(() => {
      const renderItemsRange = getRenderItemsRange(this.scrollRef.current!);
      this.props.setRenderItemsRange(renderItemsRange);
    });
  };

  componentDidMount() {
    this.props.fetchItemsThunk();
  }

  render() {
    const { loading, items } = this.props;

    let content;

    if (loading) {
      content = <App.Message>loading...</App.Message>;
    } else if (!loading && !items.length) {
      content = <App.Message>nothing to show</App.Message>;
    } else {
      content = <ItemsListClassComponent />;
    }

    return (
      <App.Root>
        <App.ScrollContainer ref={this.scrollRef} onScroll={() => this.onScroll()}>
          <SearchClassComponent />
          {content}
        </App.ScrollContainer>
        <App.ScrollLine />
      </App.Root>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.search.items,
  loading: state.search.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setRenderItemsRange: (renderItemsRange: RenderItemsRange) => dispatch(actions.setRenderItemsRange(renderItemsRange)),
  fetchItemsThunk: () => dispatch(fetchItemsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppClassComponent);
