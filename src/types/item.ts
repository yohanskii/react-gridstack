import { GridStackWidget } from "gridstack";

export namespace GridT {
  export type ItemType = "text" | "list";

  export type Item = GridStackWidget & {
    id: string;
    type: ItemType;
  };
}
