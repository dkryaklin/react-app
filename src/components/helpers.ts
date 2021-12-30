import { CARD_SIZE, RENDER_ITEMS_TRESHOLD } from "components/constants";

export function getRenderItemsRange(scrollEl: HTMLElement) {
  const scrollHeight = scrollEl.offsetHeight;
  const itemsInViewport = Math.ceil(scrollHeight / CARD_SIZE.heightWithGap);

  let renderFrom =
    Math.floor(scrollEl.scrollTop / CARD_SIZE.heightWithGap) -
    RENDER_ITEMS_TRESHOLD;

  if (renderFrom < 0) {
    renderFrom = 0;
  }

  let renderTo = renderFrom + itemsInViewport + RENDER_ITEMS_TRESHOLD * 2 - 1;

  return { renderFrom, renderTo };
}

export function getQueryFromSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("q") || "";
}

export function setQueryToSearchParams(query: string) {
  const searchParams = new URLSearchParams(window.location.search);

  if (query) {
    searchParams.set("q", query);
  } else {
    searchParams.delete("q");
  }

  const params = searchParams.toString();

  let newRelativePathQuery = window.location.pathname;
  if (params) {
    newRelativePathQuery += `?${params}`;
  }

  window.history.pushState(null, "", newRelativePathQuery);
}
