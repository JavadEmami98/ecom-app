import {
  Button,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Container,
  Box,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ShoppingCart,
  Home as HomeIcon,
  Person,
  Menu as MenuIcon,
  Favorite,
  LocalOffer,
  Close,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.theme.mode);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isDark = themeMode === "dark";

  const navLinks = [
    { label: "خانه", to: "/", icon: <HomeIcon fontSize="small" /> },
    {
      label: "محصولات",
      to: "/products",
      icon: <LocalOffer fontSize="small" />,
    },
    {
      label: "علاقه‌مندی‌ها",
      to: "/favorites",
      icon: <Favorite fontSize="small" />,
    },
  ];

  const colors = {
    border: isDark ? "#334155" : "#e2e8f0",
    text: isDark ? "#e2e8f0" : "#334155",
    purple: isDark ? "#8b5cf6" : "#7c3aed",
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to="/" className="flex items-center">
              <Box
                sx={{
                  height: 50,
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  bgcolor: isDark
                    ? "rgba(139, 92, 246, 0.1)"
                    : "rgba(139, 92, 246, 0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(139, 92, 246, 0.2)"
                      : "rgba(139, 92, 246, 0.1)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src="https://asset.okala.com/unsigned/rs:fill/size:56:30/quality:90/dpr:2.5/plain/s3:/cdn/static/react-ui-v2/okala-logo.svg"
                  alt="لوگو"
                  className="w-full h-full object-contain p-2"
                />
              </Box>
            </Link>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Link to="/" className="no-underline">
                <Button
                  startIcon={<HomeIcon />}
                  sx={{
                    color: isDark ? "#e2e8f0" : "#334155",
                    fontWeight: 500,
                    gap: "4px",
                    "&:hover": {
                      bgcolor: isDark
                        ? "rgba(139, 92, 246, 0.1)"
                        : "rgba(139, 92, 246, 0.05)",
                    },
                  }}
                >
                  <p className="mr-1 mt-1">خانه</p>
                </Button>
              </Link>
              <Link to="/checkout" className="no-underline">
                <IconButton
                  sx={{
                    color: isDark ? "#e2e8f0" : "#334155",
                    "&:hover": {
                      bgcolor: isDark
                        ? "rgba(139, 92, 246, 0.1)"
                        : "rgba(139, 92, 246, 0.05)",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartItemsCount}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      },
                    }}
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                onClick={() => dispatch(toggleTheme())}
                title={isDark ? "تم روشن" : "تم تاریک"}
                sx={{
                  color: isDark ? "#fbbf24" : "#7c3aed",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(251, 191, 36, 0.1)"
                      : "rgba(124, 58, 237, 0.1)",
                  },
                }}
              >
                {isDark ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {isAuthenticated ? (
                <>
                  <Chip
                    icon={<Person />}
                    label={user?.email || "کاربر"}
                    variant="outlined"
                    sx={{
                      minWidth: 180,
                      color: isDark ? "#e2e8f0" : "#334155",
                      borderColor: isDark ? "#475569" : "#cbd5e1",
                      "& .MuiChip-icon": {
                        color: isDark ? "#8b5cf6" : "#7c3aed",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(logout())}
                    sx={{
                      borderColor: isDark ? "#ef4444" : "#dc2626",
                      color: isDark ? "#ef4444" : "#dc2626",
                      "&:hover": {
                        borderColor: isDark ? "#dc2626" : "#b91c1c",
                        bgcolor: isDark
                          ? "rgba(239, 68, 68, 0.1)"
                          : "rgba(220, 38, 38, 0.05)",
                      },
                    }}
                  >
                    خروج
                  </Button>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Link to="/auth?mode=login" className="no-underline">
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: isDark ? "#8b5cf6" : "#7c3aed",
                        "&:hover": { bgcolor: isDark ? "#7c3aed" : "#6d28d9" },
                        fontWeight: 600,
                        px: 3,
                      }}
                    >
                      ورود
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" className="no-underline">
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: isDark ? "#8b5cf6" : "#7c3aed",
                        color: isDark ? "#8b5cf6" : "#7c3aed",
                        "&:hover": {
                          borderColor: isDark ? "#7c3aed" : "#6d28d9",
                          bgcolor: isDark
                            ? "rgba(139, 92, 246, 0.1)"
                            : "rgba(124, 58, 237, 0.05)",
                        },
                        fontWeight: 600,
                        px: 3,
                      }}
                    >
                      ثبت نام
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Toolbar>

          {/* ===== MOBILE & TABLET: Navbar ساده ===== */}
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            {/* همبرگر */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: colors.text }}
            >
              <MenuIcon />
            </IconButton>

            {/* لوگو وسط */}
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  height: 44,
                  width: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  bgcolor: isDark
                    ? "rgba(139, 92, 246, 0.1)"
                    : "rgba(139, 92, 246, 0.05)",
                }}
              >
                <img
                  src="https://asset.okala.com/unsigned/rs:fill/size:56:30/quality:90/dpr:2.5/plain/s3:/cdn/static/react-ui-v2/okala-logo.svg"
                  alt="لوگو"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 6,
                  }}
                />
              </Box>
            </Link>

            {/* سبد خرید */}
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <IconButton sx={{ color: colors.text }}>
                <Badge
                  badgeContent={cartItemsCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ===== MOBILE & TABLET: Bottom Sheet Drawer ===== */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: "none" } }}
        PaperProps={{
          sx: {
            borderRadius: "20px 20px 0 0",
            bgcolor: isDark ? "#1e293b" : "#ffffff",
            px: 2,
            pt: 1,
            pb: 4,
          },
        }}
      >
        {/* Handle */}
        <Box
          sx={{
            width: 40,
            height: 4,
            bgcolor: "grey.400",
            borderRadius: 2,
            mx: "auto",
            mb: 2,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ fontWeight: 600, fontSize: 16, color: colors.text }}>
            منو
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            sx={{ color: colors.text }}
          >
            <Close />
          </IconButton>
        </Box>

        <List disablePadding>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ textDecoration: "none" }}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItem
                sx={{
                  borderRadius: "10px",
                  mb: 0.5,
                  bgcolor:
                    location.pathname === link.to
                      ? isDark
                        ? "rgba(139, 92, 246, 0.15)"
                        : "rgba(139, 92, 246, 0.08)"
                      : "transparent",
                  color:
                    location.pathname === link.to ? colors.purple : colors.text,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            </Link>
          ))}
        </List>

        <Box sx={{ borderTop: `1px solid ${colors.border}`, mt: 2, pt: 2 }}>
          {/* تغییر تم */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: 14, color: colors.text }}>تغییر تم</Box>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              sx={{ color: isDark ? "#fbbf24" : colors.purple }}
            >
              {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* ورود / خروج */}
          {isAuthenticated ? (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                dispatch(logout());
                setDrawerOpen(false);
              }}
              sx={{ borderColor: "#dc2626", color: "#dc2626" }}
            >
              خروج از حساب
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Link
                to="/auth?mode=login"
                style={{ flex: 1, textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: colors.purple, fontWeight: 600 }}
                >
                  ورود
                </Button>
              </Link>
              <Link
                to="/auth?mode=signup"
                style={{ flex: 1, textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: colors.purple,
                    color: colors.purple,
                    fontWeight: 600,
                  }}
                >
                  ثبت نام
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* ===== MOBILE & TABLET: Bottom Navigation Bar ===== */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "block", md: "none" },
          zIndex: 1200,
          borderTop: `1px solid ${colors.border}`,
          borderRadius: "12px 12px 0 0",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={location.pathname}
          sx={{
            bgcolor: isDark ? "#1e293b" : "#ffffff",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <BottomNavigationAction
            label="خانه"
            value="/"
            icon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              "&.Mui-selected": { color: colors.purple },
            }}
          />
          <BottomNavigationAction
            label="سبد"
            value="/checkout"
            icon={
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            }
            component={Link}
            to="/checkout"
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              "&.Mui-selected": { color: colors.purple },
            }}
          />
          <BottomNavigationAction
            label="محصولات"
            value="/products"
            icon={<LocalOffer />}
            component={Link}
            to="/products"
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              "&.Mui-selected": { color: colors.purple },
            }}
          />
          <BottomNavigationAction
            label="حساب"
            value="/profile"
            icon={<Person />}
            component={Link}
            to={isAuthenticated ? "/profile" : "/auth?mode=login"}
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              "&.Mui-selected": { color: colors.purple },
            }}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Navbar;
