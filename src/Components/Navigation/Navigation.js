import { useState } from "react";
import { Link } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navigation = () => {
  const [value, setValue] = useState("home");

  const navigationItems = [
    {
      link: "/",
      label: "Home",
      value: "home",
      icon: <HomeIcon />,
    },
    {
      link: "/leaderboard",
      label: "Lead Board",
      value: "leadboard",
      icon: <BarChartIcon />,
    },
    {
      link: "/profile",
      label: "Profile",
      value: "profile",
      icon: <AccountCircleIcon />,
    },
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "wheat",
      }}
      value={value}
      onChange={handleChange}
    >
      {navigationItems.map(({ link, label, value, icon }, index) => (
        <Link key={index} to={link}>
          <BottomNavigationAction
            key={index}
            label={label}
            value={value}
            icon={icon}
          />
        </Link>
      ))}
    </BottomNavigation>
  );
};

export default Navigation;
