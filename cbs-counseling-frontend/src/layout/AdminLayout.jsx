import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import image from "../assets/images/logo.jpg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Collapse,
  Dialog,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import profile from "../assets/images/profile.png";
import { ReactComponent as ExpandMoreIcon } from "../assets/icons/ExpandMoreIcon.svg";
import { ReactComponent as NotificationIcon } from "../assets/icons/NotificationIcon.svg";
import GridViewIcon from "@mui/icons-material/GridView";
import { ReactComponent as LogoutIcon } from "../assets/icons/LogoutIcon.svg";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAdminStore } from "../store/admin/AdminStore";
import { useNotificationStore } from "../store/notificationStore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import images from "../assets/images/schoolLogo.png";
import background from "../assets/images/bgLow.png";
const drawerWidth = 250;
const subNavigation = [
  { name: "Dashboard", to: "/dashboard", icon: <GridViewIcon /> },
  {
    name: "User Management",
    icon: <PeopleAltOutlinedIcon />,
    subItems: [
      {
        name: "Student",
        to: "/user/student",
        icon: <AccountCircleOutlinedIcon />,
      },
      {
        name: "Counselor",
        to: "/user/counselor",
        icon: <SchoolOutlinedIcon />,
      },
    ],
  },
  {
    name: "Cases & Sessions",
    to: "/casesstudies",
    icon: <SchoolOutlinedIcon />,
  },
  { name: "Events", to: "/events", icon: <InsertInvitationOutlinedIcon /> },
  {
    name: "Upcoming Events",
    to: "/upcommingevents",
    icon: <CalendarMonthIcon />,
  },
  { name: "Counseling Type", to: "/addType", icon: <NewspaperOutlinedIcon /> },
  // {
  //   name: "Notification",
  //   to: "/notification",
  //   icon: <NotificationsNoneOutlinedIcon />,
  // },
  // { name: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> },
];
const SimpleDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { admin, getAdmin, isChange, logoutAuth } = useAdminStore();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };
  useEffect(() => {
    getAdmin();
  }, [isChange]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: 50,
          right: 50,
          m: 0,
          width: "270px",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Stack spacing={2} borderRadius={3} padding="10px" paddingTop={"20px"}>
        <Stack alignItems="center">
          <Typography variant="h6" color="#292D32" paddingBottom={1}>
            {admin?.name}
          </Typography>
          <Typography variant="h7" color="rgba(41, 45, 50, 0.44)">
            Admin
          </Typography>
        </Stack>{" "}
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          onClick={handleLogout}
          sx={{ cursor: "pointer" }}
        >
          <LogoutIcon />
          <Typography variant="h4" color="#000">
            Logout
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
};

const AdminLayout = (props) => {
  const { window, children } = props;
  const { admin, logoutAuth } = useAdminStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleLogout = () => {
    logoutAuth(navigate);
  };
  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EDE3FF",
        height: "100%",
      }}
    >
      <Toolbar
        sx={{
          height: "98px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={images} alt="Vite Logo" width={"80px"} height="80px" />
        </Box>
      </Toolbar>
      <Divider />

      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#a1a1a1",
            },
          },
        }}
      >
        {subNavigation.map((item) =>
          item.name === "User Management" ? (
            <div key={item.name}>
              <ListItem sx={{ paddingBottom: "8px" }} disablePadding>
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    color: "#5F6368",
                    borderRadius: "8px",
                    backgroundColor:
                      open && location.pathname.startsWith("/user")
                        ? "#fff"
                        : "transparent",
                    "&:hover": {
                      color: "#864DF4",
                      backgroundColor: "#fff",
                    },
                    "&:hover .MuiListItemIcon-root": { color: "#864DF4" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 24, marginRight: 1 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      variant: "h6",
                    }}
                  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                sx={{ overflow: "hidden" }} // Prevents the shift on expand
              >
                <List component="div">
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.name}
                      sx={{ paddingBottom: "8px" }}
                      disablePadding
                    >
                      <ListItemButton
                        component={Link}
                        to={subItem.to}
                        sx={{
                          marginLeft: "40px",
                          marginRight: "40px",
                          borderRadius: "8px",
                          color:
                            location.pathname === subItem.to
                              ? "#864DF4"
                              : "#5F6368",
                          backgroundColor:
                            location.pathname === subItem.to
                              ? "#fff"
                              : "transparent",
                          "&:hover": {
                            color: "#864DF4",
                            backgroundColor: "#fff",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 24,
                            marginRight: 1,
                            color:
                              location.pathname === subItem.to
                                ? "#864DF4"
                                : "#686465",
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.name}
                          primaryTypographyProps={{
                            variant: "h6",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ) : (
            <ListItem
              sx={{ paddingBottom: "20px" }}
              key={item.name}
              disablePadding
            >
              <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                  marginLeft: "20px",
                  marginRight: "10px",
                  borderRadius: "8px",
                  color: location.pathname === item.to ? "#864DF4" : "#5F6368",
                  backgroundColor:
                    location.pathname === item.to ? "#fff" : "transparent",
                  "&:hover": { color: "#864DF4", backgroundColor: "#fff" },
                  "&:hover .MuiListItemIcon-root": { color: "#864DF4" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 24,
                    marginRight: 1,
                    color:
                      location.pathname === item.to ? "#864DF4" : "#686465",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

      <Box
        sx={{
          margin: 4,
          mt: "auto", // Ensures the footer stays at the bottom
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <Typography variant="h7" color={"#B4B5B6"} sx={{ ml: 1 }}>
            Powered by
          </Typography>
        </div>
        <div>
          <img src={image} alt="Powered by" style={{ maxWidth: "100%" }} />
        </div>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: `#F0E8FF`,
          boxShadow: `none`,
        }}
      >
        <Toolbar
          sx={{
            height: "98px",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "flex-start",
              padding: "15px",
            }}
          >
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box display={isMobile && "none"}> </Box>
            {/* <NotificationIcon /> */}
            <Box
              borderRadius="24px"
              padding={"5px 20px 5px 5px"}
              bgcolor={"#F7F7F7"}
              width={"200px"}
              color={"#000"}
              gap={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={handleDialogOpen}
              sx={{ cursor: "pointer", flexShrink: 0, marginLeft: "10px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px" ,paddingLeft:"10px"}}>
                  <Typography variant="h6" color={"#292D32"} display="block">
                    {admin?.name}
                  </Typography>
                  <Typography
                    variant="h7"
                    color={"rgba(41, 45, 50, 0.44)"}
                    display="block"
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
              <ExpandMoreIcon />
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundImage: `url(${background}) `,
          paddingTop: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>{" "}
      <SimpleDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
};

AdminLayout.propTypes = {
  window: PropTypes.func,
};

export default AdminLayout;
