import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  InputAdornment,
  IconButton,
  Tabs,
  Tab
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { login, signup } from "../store/authSlice";

function Auth() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || [],
  );
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") === "login");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(searchParams.get("mode") === "login");
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim().toLowerCase();

    const userAlreadyExists = registeredUsers.some(
      (user) => user.email === email,
    );

    if (!isLogin && userAlreadyExists) {
      toast.error("شما قبلا با این ایمیل ثبت نام کرده اید.");
      return;
    }

    dispatch(isLogin ? login({ email }) : signup({ email }));
    navigate("/");
  };

  const handleTabChange = (event, newValue) => {
    const nextMode = newValue === 0;
    setIsLogin(nextMode);
    setSearchParams({ mode: nextMode ? "login" : "signup" });
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 88px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: themeMode === 'dark' ? '#0f172a' : '#f8fafc',
        py: 6,
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={4}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            border: themeMode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
            background: themeMode === 'dark' 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          {/* Header with Icon */}
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              py: 4,
              textAlign: 'center'
            }}
          >
            <Person sx={{ fontSize: 60, color: 'white', mb: 1 }} />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              {isLogin ? "خوش آمدید" : "ثبت نام"}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}>
              {isLogin 
                ? "برای ادامه خرید وارد شوید" 
                : "حساب کاربری خود را ایجاد کنید"}
            </Typography>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={isLogin ? 0 : 1} 
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: themeMode === 'dark' ? '#94a3b8' : '#64748b'
                },
                '& .Mui-selected': {
                  color: '#8b5cf6 !important'
                }
              }}
            >
              <Tab label="ورود" />
              <Tab label="ثبت نام" />
            </Tabs>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="ایمیل"
                placeholder="example@email.com"
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#8b5cf6' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#8b5cf6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#8b5cf6'
                  }
                }}
              />

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="رمز عبور"
                placeholder="حداقل 6 کاراکتر"
                required
                inputProps={{ minLength: 6 }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#8b5cf6' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#8b5cf6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#8b5cf6'
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isLogin ? "ورود به حساب" : "ایجاد حساب کاربری"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Auth;
