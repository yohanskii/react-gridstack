import { Box } from "@mui/material";
import TopBar from "./components/TopBar";
import Drawer from "./components/Drawer";
import Grid from "./components/Grid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: "100vh", width: "100vw", background: "#dfe6e9" }}>
        <TopBar />
        <Drawer />
        <Box
          data-testid="grid-example"
          sx={{
            display: "flex",
            flex: 1,
            height: "calc(100% - 60px)",
            width: "calc(100% - 300px)",
            translate: "300px 60px",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <Grid />
        </Box>
      </Box>
    </DndProvider>
  );
}
