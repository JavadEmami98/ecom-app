import { Button, IconButton, Badge, AppBar, Toolbar, Container, Box, Chip } from "@mui/material";
import { Brightness4, Brightness7, ShoppingCart, Home as HomeIcon, Person } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.theme.mode);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        background: themeMode === 'dark' 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: themeMode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Box sx={{ 
              height: 50, 
              width: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              bgcolor: themeMode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: themeMode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                transform: 'scale(1.05)'
              }
            }}>
              <img
                src="https://asset.okala.com/unsigned/rs:fill/size:56:30/quality:90/dpr:2.5/plain/s3:/cdn/static/react-ui-v2/okala-logo.svg"
                alt="لوگو"
                className="w-full h-full object-contain p-2"
              />
            </Box>
          </Link>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
            <Link to="/" className="no-underline">
              <Button 
                startIcon={<HomeIcon />}
                sx={{ 
                  color: themeMode === 'dark' ? '#e2e8f0' : '#334155',
                  fontWeight: 500,
                  gap: '4px',
                  '&:hover': {
                    bgcolor: themeMode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'
                  }
                }}
              >
                خانه
              </Button>
            </Link>
            
            <Link to="/checkout" className="no-underline">
              <IconButton 
                sx={{ 
                  color: themeMode === 'dark' ? '#e2e8f0' : '#334155',
                  '&:hover': {
                    bgcolor: themeMode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'
                  }
                }}
              >
                <Badge 
                  badgeContent={cartItemsCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Theme Toggle */}
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              title={themeMode === "light" ? "تم تاریک" : "تم روشن"}
              sx={{ 
                color: themeMode === 'dark' ? '#fbbf24' : '#7c3aed',
                '&:hover': {
                  bgcolor: themeMode === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(124, 58, 237, 0.1)'
                }
              }}
            >
              {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            {isAuthenticated ? (
              <>
                <Chip 
                  icon={<Person />}
                  label={user?.email || 'کاربر'}
                  variant="outlined"
                  sx={{ 
                    maxWidth: 180,
                    color: themeMode === 'dark' ? '#e2e8f0' : '#334155',
                    borderColor: themeMode === 'dark' ? '#475569' : '#cbd5e1',
                    '& .MuiChip-icon': {
                      color: themeMode === 'dark' ? '#8b5cf6' : '#7c3aed'
                    }
                  }}
                />
                <Button 
                  variant="outlined" 
                  onClick={() => dispatch(logout())}
                  sx={{
                    borderColor: themeMode === 'dark' ? '#ef4444' : '#dc2626',
                    color: themeMode === 'dark' ? '#ef4444' : '#dc2626',
                    '&:hover': {
                      borderColor: themeMode === 'dark' ? '#dc2626' : '#b91c1c',
                      bgcolor: themeMode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.05)'
                    }
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
                      bgcolor: themeMode === 'dark' ? '#8b5cf6' : '#7c3aed',
                      '&:hover': {
                        bgcolor: themeMode === 'dark' ? '#7c3aed' : '#6d28d9'
                      },
                      fontWeight: 600,
                      px: 3
                    }}
                  >
                    ورود
                  </Button>
                </Link>
                <Link to="/auth?mode=signup" className="no-underline">
                  <Button 
                    variant="outlined"
                    sx={{
                      borderColor: themeMode === 'dark' ? '#8b5cf6' : '#7c3aed',
                      color: themeMode === 'dark' ? '#8b5cf6' : '#7c3aed',
                      '&:hover': {
                        borderColor: themeMode === 'dark' ? '#7c3aed' : '#6d28d9',
                        bgcolor: themeMode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.05)'
                      },
                      fontWeight: 600,
                      px: 3
                    }}
                  >
                    ثبت نام
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
