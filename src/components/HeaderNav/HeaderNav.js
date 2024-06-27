import React, { useState, useContext } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import LoginModal from "../Login/Login";
import { AuthContext } from "../Context/AuthContext";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderNav() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // State for LoginModal visibility
  const theme = useTheme();
  const [searchEvent, setSearchEvent] = useState(""); // State for search term
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleOpenLoginModal = () => {
    setIsOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchEvent(event.target.value);
  };

  const handleSearchClick = () => {
    if (!searchEvent) return; // Prevent empty searches

    // Trigger navigation to the Search page with the search term
    navigate(`/search?q=${searchEvent}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Bungee, sans-serif",
            color: "white",
            textDecoration: "none",
          }}
        >
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            TICKLIST
          </Link>
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="standard"
            placeholder="Search for events"
            value={searchEvent}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleSearchClick}>
                  <FaSearch style={{ color: "white" }}  />
                </InputAdornment>
              ),
              style: { color: "white" },
              sx: { cursor: 'pointer' } // Apply styles directly to TextField input
            }}
          />
          {!isLoggedIn && ( // Only show login button if not logged in
            <IconButton onClick={handleOpenLoginModal} color="inherit">
              <FaUserCircle style={{ color: "white" }} />
            </IconButton>
          )}
          {isOpen && ( // Render LoginModal if open
            <LoginModal
              open={isOpen}
              onClose={handleCloseLoginModal}
              onLogin={login} // Pass login function from AuthContext
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
