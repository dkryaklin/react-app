export interface ItemInterface {
  id: number;
  position: number;
  avatar: string;
  avatarSrcSet: string;
  city: string;
  name: string;
  title: string;
  address: string;
  email: string;
}

export interface TextChunk {
  text: string;
  key?: string;
  marked?: boolean;
}

export interface RenderItemsRange {
  renderFrom: number;
  renderTo: number;
}
