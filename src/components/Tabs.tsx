import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Lists from "./Lists";

export default function Tabs() {
  const [value, setValue] = React.useState("2");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Styles" value="1" />
            <Tab label="Données" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Styles</TabPanel>
        <TabPanel sx={{ padding: 0 }} value="2">
          <Lists />
        </TabPanel>
      </TabContext>
    </Box>
  );
}