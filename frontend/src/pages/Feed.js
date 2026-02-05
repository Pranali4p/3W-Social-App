import React, { useEffect, useState, useCallback } from "react";
import { Container, Stack, Box, Typography, TextField, InputAdornment, Fab, Skeleton, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Add } from "@mui/icons-material";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";

// Sample fallback posts
const samplePosts = [
  { _id: 1, username: "Alice", content: "Sunny day!", image: "/Images/sunset.jpg", likes: 12, comments: [] },
  { _id: 2, username: "Bob", content: "Vegan tacos!", image: "/Images/taco.jpg", likes: 8, comments: [] },
];

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadPosts = useCallback(async (pageToLoad = 1, reset = false) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/posts?page=${pageToLoad}&limit=6`);
      const newPosts = res.data.length
        ? res.data.map((p) => ({ ...p, image: p.image ? `http://localhost:5000/uploads/${p.image}` : "" }))
        : samplePosts;

      setPosts(reset ? newPosts : [...posts, ...newPosts]);
      setHasMore(newPosts.length === 6);
      setLoading(false);
    } catch {
      setError("Failed to load posts. Showing sample posts.");
      setPosts(reset ? samplePosts : [...posts, ...samplePosts]);
      setLoading(false);
    }
  }, [posts]);

  useEffect(() => { loadPosts(1, true); }, [loadPosts]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadPosts(nextPage);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, page, loadPosts]);

  // Search filter
  useEffect(() => {
    setFilteredPosts(posts.filter(p => p.username.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [posts, searchQuery]);

  const handleLike = (postId, liked) => {
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1) } : p));
  };

  const handleComment = (postId, comment) => {
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...p.comments, comment] } : p));
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setModalOpen(false);
  };

  return (
    <Box pt={10} sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
      <Typography variant="h4" textAlign="center" mb={3} sx={{ fontWeight: "bold" }}>Social Feed</Typography>
      <Container maxWidth="md">
        <TextField fullWidth variant="outlined" placeholder="Search posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} sx={{ mb: 3, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Stack spacing={3}>
          <AnimatePresence>
            {filteredPosts.map((p, i) => (
              <motion.div key={p._id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <PostCard post={p} onLike={handleLike} onComment={handleComment} />
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && Array.from({ length: 3 }).map((_, idx) => <Skeleton key={idx} variant="rectangular" height={300} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />)}
        </Stack>

        {!hasMore && !loading && <Box textAlign="center" mt={3}><Typography>No more posts to load.</Typography></Box>}
      </Container>

      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: 16, right: 16 }} onClick={() => setModalOpen(true)}><Add /></Fab>
      <CreatePostModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreatePost} />
    </Box>
  );
}

export default Feed;
