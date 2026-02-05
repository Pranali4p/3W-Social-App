import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Fab,
  Skeleton,
  Alert,
} from "@mui/material"; // Removed 'Button' since it's not used
import { motion, AnimatePresence } from "framer-motion";
import { Search, Add } from "@mui/icons-material";
import axios from "axios";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal"; // Assuming you have this component

const samplePosts = [
  { id: 1, username: "Alice", content: "Loving this sunny day! ☀️ #Nature", image: "/Images/sunset.jpg", likes: 12, comments: [{ username: "Bob", text: "Beautiful!" }, { username: "Charlie", text: "Where is this?" }] },
  { id: 2, username: "Bob", content: "New recipe: Vegan tacos! 🌮 Yummy!", image: "/Images/taco.jpg", likes: 8, comments: [{ username: "Alice", text: "Recipe please!" }] },
  { id: 3, username: "Charlie", content: "Hiking adventures! 🏞️ #Adventure", image: "/Images/hiking.jpg", likes: 15, comments: [{ username: "Diana", text: "Epic view!" }, { username: "Eve", text: "Join next time?" }] },
  { id: 4, username: "Diana", content: "Book club pick: 'The Midnight Library' 📖 Thoughts?", image: "/Images/book.jpg", likes: 5, comments: [] },
  { id: 5, username: "Eve", content: "Workout done! 💪 Feeling strong!", image: "/Images/workout.jpg", likes: 20, comments: [{ username: "Alice", text: "Motivated!" }, { username: "Bob", text: "Keep it up!" }] },
  { id: 6, username: "Frank", content: "City lights at night ✨ #Urban", image: "/Images/city.jpg", likes: 10, comments: [{ username: "Charlie", text: "Stunning!" }] },
  { id: 7, username: "Grace", content: "Pet love! 🐶 My furry friend.", image: "/Images/pet.jpg", likes: 18, comments: [{ username: "Diana", text: "So cute!" }, { username: "Eve", text: "Adorable!" }] },
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

  // Simulate real-time updates (e.g., via WebSocket) for a "cool" dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prev) =>
        prev.map((p) => ({
          ...p,
          likes: Math.random() > 0.8 ? p.likes + 1 : p.likes, // Random like increment for demo
        }))
      );
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Load posts with pagination (replaces the simple load in your original)
  const loadPosts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=6`);
      const newPosts = res.data || samplePosts.slice((page - 1) * 6, page * 6);
      setPosts(reset ? newPosts : [...posts, ...newPosts]);
      setHasMore(newPosts.length === 6);
      setLoading(false);
    } catch (err) {
      setError("Posting");
      setPosts(reset ? samplePosts : [...posts, ...samplePosts.slice((page - 1) * 6, page * 6)]);
      setLoading(false);
    }
  }, [page, posts]);

  useEffect(() => {
    loadPosts(true);
  }, [loadPosts]); // Added 'loadPosts' to the dependency array to fix the ESLint warning

  // Infinite scroll for seamless loading (cool UX!)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
        loadPosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadPosts]);

  // Filter posts based on search (adds discoverability)
  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (p) =>
          p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [posts, searchQuery]);

  const handleLike = (postId, liked) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1) }
          : p
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the top
    setModalOpen(false);
  };

  return (
    <Box
      pt={10}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3} sx={{ fontWeight: "bold" }}>
        Social Feed
      </Typography>

      <Container maxWidth="md">
        {/* Search bar for filtering posts */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts by username or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
        />

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Stack spacing={3}>
          <AnimatePresence>
            {filteredPosts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <PostCard post={p} onLike={handleLike} onComment={handleComment} />
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <>
              <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />
              <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />
            </>
          )}
        </Stack>

        {!hasMore && !loading && (
          <Box textAlign="center" mt={3}>
            <Typography>No more posts to load.</Typography>
          </Box>
        )}
      </Container>

      {/* Floating Action Button for creating posts (cool interaction!) */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setModalOpen(true)}
      >
        <Add />
      </Fab>

      {/* Modal for creating new posts */}
      <CreatePostModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreatePost} />
    </Box>
  );
}

export default Feed;