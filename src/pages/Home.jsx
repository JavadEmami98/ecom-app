import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { Storefront } from "@mui/icons-material";
import ProductGrid from "../components/ProductGrid";
import ProductSwiper from "../components/Swiper/ProductSwiper";

function Home() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper 
          elevation={0}
          sx={{ 
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            borderRadius: 4,
            p: 6,
            mb: 6,
            textAlign: 'center',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Storefront sx={{ fontSize: 60, color: '#8b5cf6' }} />
          </Box>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            خوش آمدید
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
              fontWeight: 400
            }}
          >
            فروشگاه فروش محصولات دیجیتال با بهترین کیفیت و قیمت
          </Typography>
        </Paper>

        {/* Featured Products Swiper */}
        <Box sx={{ mb: 6 }}>
          <ProductSwiper />
        </Box>

        {/* All Products Section */}
        <Box>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              mb: 4,
              fontWeight: 700,
              color: (theme) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
              textAlign: 'right',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box 
              sx={{ 
                width: 4, 
                height: 32, 
                bgcolor: '#8b5cf6', 
                borderRadius: 1 
              }} 
            />
            همه محصولات
          </Typography>
          <ProductGrid />
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
