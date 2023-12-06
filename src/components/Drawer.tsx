import { Drawer as MuiDrawer, Toolbar } from "@mui/material";

import Tabs from "./Tabs";

const Drawer = () => {
  return (
    <MuiDrawer
      variant="permanent"
      anchor="left"
      open
      PaperProps={{ sx: { width: "300px" } }}
    >
      <Toolbar />
      <Tabs />
    </MuiDrawer>
  );
};

export default Drawer;
