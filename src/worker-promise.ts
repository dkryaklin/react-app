import { FETCH_ITEMS_FN, SEARCH_ITEMS_FN } from "components/constants";
import { ItemInterface } from "components/types";

const worker = new Worker(new URL("./worker.js", import.meta.url));

const messagesHash: {
  [key: string]: { resolve: Function; reject: Function };
} = {};

worker.addEventListener("message", (e) => {
  const { id, results } = e.data;
  messagesHash[id].resolve(results);
  delete messagesHash[id];
});

const generateId = () => {
  return Date.now() + Math.round(Math.random() * 1000000000);
};

const postMessage = <T>(fn: string, data?: Array<any>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const id = generateId();
    messagesHash[id] = { resolve, reject };

    worker.postMessage({ fn, id, data });
  });
};

export const fetchItems = (): Promise<ItemInterface[]> => {
  return postMessage(FETCH_ITEMS_FN);
};

export const filterItems = (query: string): Promise<ItemInterface[]> => {
  return postMessage(SEARCH_ITEMS_FN, [query]);
};
