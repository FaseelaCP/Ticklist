import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import eventsImage from "../../assets/events.jpg";
import attractionsImage from "../../assets/attractions.jpg";
import venuesImage from "../../assets/venues.jpg";
import sportsImage from "../../assets/sports.jpg";
import { Link } from "react-router-dom";

export default function CategoryNav() {
  const categories = [
    { label: "Events", image: venuesImage, to: "/events" },
    { label: "Attractions", image: attractionsImage, to: "/attractions" },
    { label: "Venues", image: eventsImage, to: "/venues" },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-around"}}>
        {categories.map((category, index) => (
          <Tooltip key={index} title={category.label}>
            <IconButton
              key={index}
              component={Link}
              to={category.to}
              sx={{ mx: 2 }}
              aria-haspopup="true"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link
                  to={category.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    style={{ width: 64, height: 64, borderRadius: "50%" }}
                  />
                  <Typography variant="body2" align="center">
                    {category.label}
                  </Typography>
                </Link>
              </Box>
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </React.Fragment>
  );
}
