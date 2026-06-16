import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Divider,
  Paper,
  ButtonGroup,
} from "@mui/material";
import {
  ShoppingCartOutlined,
  Delete,
  Add,
  Remove,
  ArrowBack,
  Payment,
  DeleteSweep,
} from "@mui/icons-material";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const themeMode = useSelector((state) => state.theme.mode);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: themeMode === "dark" ? "#0f172a" : "#f8fafc",
          py: 6,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 500,
            textAlign: "center",
            p: 6,
            borderRadius: 4,
            background:
              themeMode === "dark"
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
            border: `1px solid ${themeMode === "dark" ? "#334155" : "#e2e8f0"}`,
          }}
        >
          <ShoppingCartOutlined
            sx={{ fontSize: 80, color: "#8b5cf6", mb: 3 }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: themeMode === "dark" ? "#f1f5f9" : "#1e293b",
            }}
          >
            سبد خرید شما خالی است
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: themeMode === "dark" ? "#94a3b8" : "#64748b",
            }}
          >
            محصولاتی به سبد خرید خود اضافه کنید تا بتوانید خرید را تکمیل کنید.
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBack />}
              sx={{
                bgcolor: "#8b5cf6",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                gap: "4px",
                "&:hover": {
                  bgcolor: "#7c3aed",
                },
              }}
            >
              بازگشت به فروشگاه
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        bgcolor: themeMode === "dark" ? "#0f172a" : "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 4,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: themeMode === "dark" ? "#f1f5f9" : "#1e293b",
                mb: 1,
              }}
            >
              سبد خرید شما
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: themeMode === "dark" ? "#94a3b8" : "#64748b" }}
            >
              {totalItems} محصول در سبد خرید شما
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweep />}
            onClick={() => dispatch(clearCart())}
            sx={{
              borderWidth: 2,
              fontWeight: 600,
              gap: "4px",
              "&:hover": {
                borderWidth: 2,
                bgcolor: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            پاک کردن سبد
          </Button>
        </Box>

        {/* Cart Items and Summary */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 3,
                  border: `1px solid ${themeMode === "dark" ? "#334155" : "#e2e8f0"}`,
                  background:
                    themeMode === "dark"
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      themeMode === "dark"
                        ? "0 10px 30px rgba(139, 92, 246, 0.2)"
                        : "0 10px 30px rgba(124, 58, 237, 0.15)",
                    borderColor: "#8b5cf6",
                  },
                }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    width: { xs: "100%", sm: 180 },
                    height: { xs: 200, sm: "auto" },
                    bgcolor: themeMode === "dark" ? "#0f172a" : "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      maxHeight: 150,
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Product Details */}
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          bgcolor: "rgba(139, 92, 246, 0.15)",
                          color: "#8b5cf6",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          mb: 1.5,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          color:
                            themeMode === "dark" ? "#f1f5f9" : "#1e293b",
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#10b981",
                        fontSize: "1.3rem",
                        ml: 2,
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Quantity Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ButtonGroup
                      variant="outlined"
                      sx={{
                        "& .MuiButton-root": {
                          borderColor:
                            themeMode === "dark" ? "#475569" : "#cbd5e1",
                          color:
                            themeMode === "dark" ? "#e2e8f0" : "#334155",
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        sx={{
                          borderRadius: 0,
                          "&:hover": {
                            bgcolor:
                              themeMode === "dark"
                                ? "rgba(139, 92, 246, 0.1)"
                                : "rgba(139, 92, 246, 0.05)",
                          },
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Box
                        sx={{
                          px: 3,
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 700,
                          fontSize: "1rem",
                          borderLeft: `1px solid ${themeMode === "dark" ? "#475569" : "#cbd5e1"}`,
                          borderRight: `1px solid ${themeMode === "dark" ? "#475569" : "#cbd5e1"}`,
                          color:
                            themeMode === "dark" ? "#f1f5f9" : "#1e293b",
                        }}
                      >
                        {item.quantity}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        sx={{
                          borderRadius: 0,
                          "&:hover": {
                            bgcolor:
                              themeMode === "dark"
                                ? "rgba(139, 92, 246, 0.1)"
                                : "rgba(139, 92, 246, 0.05)",
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </ButtonGroup>

                    <Button
                      variant="text"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{
                        fontWeight: 600,
                        gap: "4px",
                        "&:hover": {
                          bgcolor: "rgba(239, 68, 68, 0.1)",
                        },
                      }}
                    >
                      حذف
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Order Summary */}
          <Paper
            elevation={3}
            sx={{
              height: "fit-content",
              position: "sticky",
              top: 100,
              p: 3,
              borderRadius: 3,
              background:
                themeMode === "dark"
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
              border: `1px solid ${themeMode === "dark" ? "#334155" : "#e2e8f0"}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: themeMode === "dark" ? "#f1f5f9" : "#1e293b",
              }}
            >
              خلاصه سفارش
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: themeMode === "dark" ? "#94a3b8" : "#64748b",
                }}
              >
                <Typography>تعداد محصولات:</Typography>
                <Typography fontWeight={600}>{totalItems}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: themeMode === "dark" ? "#94a3b8" : "#64748b",
                }}
              >
                <Typography>جمع جزء:</Typography>
                <Typography fontWeight={600}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: themeMode === "dark" ? "#94a3b8" : "#64748b",
                }}
              >
                <Typography>هزینه ارسال:</Typography>
                <Chip label="رایگان" size="small" color="success" />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: themeMode === "dark" ? "#f1f5f9" : "#1e293b",
                }}
              >
                مجموع:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#10b981" }}
              >
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Payment />}
              sx={{
                bgcolor: "#8b5cf6",
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 700,
                gap: "4px",
                "&:hover": {
                  bgcolor: "#7c3aed",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px rgba(139, 92, 246, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              پرداخت
            </Button>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<ArrowBack />}
                sx={{
                  mt: 2,
                  borderColor: themeMode === "dark" ? "#475569" : "#cbd5e1",
                  color: themeMode === "dark" ? "#e2e8f0" : "#334155",
                  py: 1.5,
                  fontWeight: 600,
                  gap: "4px",
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    bgcolor:
                      themeMode === "dark"
                        ? "rgba(139, 92, 246, 0.1)"
                        : "rgba(139, 92, 246, 0.05)",
                  },
                }}
              >
                ادامه خرید
              </Button>
            </Link>
          </Paper>
        </div>
      </Container>
    </Box>
  );
}

export default Checkout;
