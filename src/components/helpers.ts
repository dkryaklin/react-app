import { ItemInterface } from "components/types";
import { CARD_SIZE, RENDER_ITEMS_TRESHOLD } from "components/constants";

export function getRenderItems(scrollEl: HTMLElement, items: ItemInterface[]) {
  const scrollHeight = scrollEl.offsetHeight;
  const itemsInViewport = Math.ceil(scrollHeight / CARD_SIZE.heightWithGap);

  let itemsFrom =
    Math.floor(scrollEl.scrollTop / CARD_SIZE.heightWithGap) -
    RENDER_ITEMS_TRESHOLD;

  if (itemsFrom < 0) {
    itemsFrom = 0;
  }

  let itemsTo = itemsFrom + itemsInViewport + RENDER_ITEMS_TRESHOLD * 2 - 1;

  return items.slice(itemsFrom, itemsTo);
}
