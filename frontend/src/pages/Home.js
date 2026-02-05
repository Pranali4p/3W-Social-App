import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, TextField, IconButton, Fab } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { People, Share, ThumbUp, EmojiEmotions, KeyboardArrowUp, Email, Brightness4, Brightness7 } from "@mui/icons-material";

function Home() {
  const [darkMode, setDarkMode] = useState(false); // Placeholder for theme toggle
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]); // Parallax effect

  const features = [
    { icon: <Share />, title: "Share Moments", desc: "Post photos, captions, and emojis with friends." },
    { icon: <ThumbUp />, title: "Like & Comment", desc: "Engage with posts through likes and comments." },
    { icon: <People />, title: "Connect Globally", desc: "Build a community and grow your network." },
    { icon: <EmojiEmotions />, title: "Express Yourself", desc: "Use emojis and creative captions." },
  ];

  const testimonials = [
    { name: "Alice", text: "3W Social makes sharing so fun and easy!", avatar: "A" },
    { name: "Bob", text: "Love the interactive feed and emojis!", avatar: "B" },
    { name: "Charlie", text: "The best platform for creators!", avatar: "C" },
  ];

  const steps = [
    { step: 1, title: "Sign Up", desc: "Create your account in seconds." },
    { step: 2, title: "Post & Share", desc: "Upload photos and add fun captions." },
    { step: 3, title: "Connect", desc: "Like, comment, and grow your community." },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Particle Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'float 20s infinite linear',
          },
        }}
      />
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
          }
        `}
      </style>

      {/* Hero Section with Parallax */}
      <motion.div style={{ y }}>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textShadow: '0 0 20px rgba(255,107,107,0.5)' }}>
              Welcome to 3W Social
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, color: 'lightgray' }}>
              Connect • Share • Grow – Unleash your creativity in a vibrant community.
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/feed"
                sx={{
                  bgcolor: '#ff6b6b',
                  '&:hover': { bgcolor: '#ff5252', boxShadow: '0 0 20px #ff6b6b' },
                  borderRadius: 5,
                  px: 4,
                }}
              >
                Explore Feed
              </Button>
            </motion.div>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ mt: 2, color: 'white' }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </motion.div>
        </Box>
      </motion.div>

      {/* How It Works Section */}
      <Box sx={{ py: 5, px: 3, bgcolor: 'rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 4, color: 'white', fontWeight: 'bold' }}>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {steps.map((s, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { transform: 'translateY(-10px)', transition: '0.3s' },
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>{s.step}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>{s.title}</Typography>
                    <Typography>{s.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 5, px: 3, bgcolor: 'rgba(255,255,255,0.1)', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 4, color: 'white' }}>Why Choose 3W Social?</Typography>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { boxShadow: '0 0 20px #ff6b6b' },
                  }}
                >
                  <CardContent>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      {f.icon}
                    </motion.div>
                    <Typography variant="h6" sx={{ mt: 2 }}>{f.title}</Typography>
                    <Typography>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 5, px: 3, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>Join the Community</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} md={3}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Typography variant="h3" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>10K+</Typography>
              <Typography color="lightgray">Active Users</Typography>
            </motion.div>
          </Grid>
          <Grid item xs={6} md={3}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <Typography variant="h3" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>50K+</Typography>
              <Typography color="lightgray">Posts Shared</Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials Carousel */}
      <Box sx={{ py: 5, px: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>What Users Say</Typography>
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <Card sx={{ maxWidth: 400, mx: 'auto', bgcolor: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: '#667eea', width: 60, height: 60 }}>
                {testimonials[currentTestimonial].avatar}
              </Avatar>
              <Typography>"{testimonials[currentTestimonial].text}"</Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'lightgray' }}>
                - {testimonials[currentTestimonial].name}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Footer CTA with Newsletter */}
      <Box sx={{ py: 5, px: 3, textAlign: 'center', bgcolor: '#111', color: 'white', position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Stay Updated</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          <TextField
            placeholder="Enter your email"
            variant="outlined"
            sx={{ bgcolor: 'white', borderRadius: 1, width: 300 }}
          />
          <Button variant="contained" sx={{ bgcolor: '#ff6b6b' }}>
            <Email sx={{ mr: 1 }} /> Subscribe
          </Button>
        </Box>
        <Typography variant="h6">Ready to Join?</Typography>
        <Button variant="contained" component={Link} to="/register" sx={{ mt: 2, bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}>
          Sign Up Now
        </Button>
      </Box>

      {/* Scroll to Top Button */}
      <Fab
        color="primary"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: '#ff6b6b',
          '&:hover': { bgcolor: '#ff5252' },
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Box>
  );
}

export default Home;