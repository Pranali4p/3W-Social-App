import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Settings, AccountCircle, Logout, Help, Palette } from "@mui/icons-material";
import { getUser, logout } from "../utils/auth";

function Navbar() {
  const user = getUser(); // optional, used for profile/menu if needed
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#111", boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff6b6b' }}>
          3W Social
        </Typography>

        <div>
          {/* Always show these buttons */}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/feed">Feed</Button>
          <Button color="inherit" component={Link} to="/create">Create Post</Button>

          {/* Login/Register if not logged in */}
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              {/* Optional menu for logged-in users */}
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Settings />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                  <AccountCircle sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); }}>
                  <Palette sx={{ mr: 1 }} /> Theme
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); }}>
                  <Help sx={{ mr: 1 }} /> Help
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
