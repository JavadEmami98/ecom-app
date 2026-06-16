import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating, IconButton, Button } from "@mui/material";
import { AddShoppingCart, Visibility } from "@mui/icons-material";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("محصول به سبد خرید اضافه شد.");
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        border: themeMode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
        background: themeMode === 'dark' 
          ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: themeMode === 'dark' 
            ? '0 20px 40px rgba(139, 92, 246, 0.3)'
            : '0 20px 40px rgba(124, 58, 237, 0.2)',
          borderColor: '#8b5cf6'
        }
      }}
    >
      {/* Product Image */}
      <Box 
        sx={{ 
          position: 'relative',
          bgcolor: themeMode === 'dark' ? '#0f172a' : '#f1f5f9',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 220,
          overflow: 'hidden'
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ 
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        />
        
        {/* Category Badge */}
        <Chip 
          label={product.category}
          size="small"
          sx={{ 
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: '#8b5cf6',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        />
      </Box>

      {/* Product Details */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Rating 
            value={product.rating?.rate ?? 0} 
            precision={0.5} 
            size="small" 
            readOnly 
            sx={{ color: '#fbbf24' }}
          />
          <Typography 
            variant="caption" 
            sx={{ color: themeMode === 'dark' ? '#94a3b8' : '#64748b' }}
          >
            ({product.rating?.count ?? 0})
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            mb: 1.5,
            fontWeight: 600,
            fontSize: '0.95rem',
            lineHeight: 1.4,
            color: themeMode === 'dark' ? '#e2e8f0' : '#1e293b',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em'
          }}
        >
          {product.title}
        </Typography>

        {/* Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            color: themeMode === 'dark' ? '#94a3b8' : '#64748b',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            flexGrow: 1
          }}
        >
          {product.description}
        </Typography>

        {/* Footer with Price and Actions */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pt: 2,
          borderTop: themeMode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
        }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#10b981',
                fontSize: '1.25rem'
              }}
            >
              ${product.price}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={handleAddToCart}
              sx={{
                bgcolor: '#8b5cf6',
                color: 'white',
                '&:hover': {
                  bgcolor: '#7c3aed',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <AddShoppingCart fontSize="small" />
            </IconButton>
            
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Visibility />}
                sx={{
                  borderColor: '#8b5cf6',
                  color: '#8b5cf6',
                  gap: '4px',
                  '&:hover': {
                    borderColor: '#7c3aed',
                    bgcolor: 'rgba(139, 92, 246, 0.1)'
                  }
                }}
              >
                جزئیات
              </Button>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;