import {
  CARD_SIZE,
  RENDER_ITEMS_TRESHOLD,
  IMAGE_LOAD_DELAY_TIME,
} from "components/constants";
import { useEffect, useState, useDebugValue } from "react";
import { RenderItemsRange, TextChunk } from "components/types";

export function getRenderItemsRange(scrollEl: HTMLElement): RenderItemsRange {
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

export function useImageLoaded() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, IMAGE_LOAD_DELAY_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useDebugValue(imageLoaded ? "Image loaded" : "Image not loaded");

  return imageLoaded;
}

export function getMarkedTextChunks(
  str: string,
  query: string
): Array<TextChunk> {
  const lowerCaseStr = str.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();

  if (!lowerCaseQuery || !lowerCaseStr.includes(lowerCaseQuery)) {
    return [{ text: str }];
  }

  const results: Array<TextChunk> = [];
  const chunks = lowerCaseStr.split(lowerCaseQuery);

  let start = 0;
  chunks.forEach((chunk: string, index: number) => {
    results.push({
      text: str.substring(start, start + chunk.length),
    });
    start += chunk.length;

    if (index !== chunks.length - 1) {
      results.push({
        text: str.substring(start, start + query.length),
        marked: true,
        key: `${chunk}${index}`,
      });
      start += query.length;
    }
  });

  return results;
}
