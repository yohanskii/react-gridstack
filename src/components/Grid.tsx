import { GridT } from "../types/item";
import { Box } from "@mui/material";
import { useState } from "react";
import ControlledStack from "./Controlled";

const defaultItems: GridT.Item[] = [
  {
    id: "item-1",
    w: 2,
    h: 1,
    x: 0,
    y: 0,
    type: "text",
    noMove: true,
    noResize: true,
  },
  {
    id: "item-2",
    w: 2,
    h: 2,
    x: 5,
    y: 14,
    type: "list",
    noMove: false,
    noResize: true,
  },
];

const ControlledExample = () => {
  const [items, setItems] = useState(defaultItems);
  console.log("items:", items);

  return (
    <Box>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: 0,
        }}
        onClick={() => {
          const item: GridT.Item = {
            id: `item-1-${Date.now()}`,
            x: 2,
            y: 0,
            w: 2,
            h: 2,
            type: "list",
            noMove: true,
            noResize: false,
          };
          setItems((items) => [...items, item]);
        }}
      >
        Add Item to 1 grid
      </div>

      <ControlledStack
        items={items}
        addItem={(item) => {
          setItems((items) => [...items, item]);
        }}
        changeItems={(items) => setItems(items)}
      />
    </Box>
  );
};

export default ControlledExample;
