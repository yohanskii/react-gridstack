import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => (
  <AppBar
    position="fixed"
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#7f8c8d" }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Custom Template
      </Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
