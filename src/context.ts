import React from "react";

export interface contextInterface {
  scrollRef: React.MutableRefObject<HTMLDivElement>;
}

// @ts-expect-error
export const AppContext = React.createContext<contextInterface>({});
