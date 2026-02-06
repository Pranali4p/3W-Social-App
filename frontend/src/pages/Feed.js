import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Typography, TextField, InputAdornment, Fab, Skeleton } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";

// Sample posts
const samplePosts = [
  { _id: 1, username: "Alice", content: "Sunny day!", image: "/images/sunset.jpg", likes: 12, comments: [{ username: "Bob", text: "Beautiful!" }] },
  { _id: 2, username: "Bob", content: "Vegan tacos!", image: "/images/taco.jpg", likes: 8, comments: [{ username: "Alice", text: "Recipe please!" }] },
  { _id: 3, username: "Charlie", content: "Hiking adventures!", image: "/images/hiking.jpg", likes: 15, comments: [{ username: "Diana", text: "Epic view!" }] },
  { _id: 4, username: "Diana", content: "Book club pick!", image: "/images/book.jpg", likes: 5, comments: [] },
];

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Load posts immediately
  useEffect(() => {
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
    setLoading(false);
  }, []);

  // Search filter
  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (p) =>
          p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [posts, searchQuery]);

  // Handle likes
  const handleLike = (postId, liked) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1) }
          : p
      )
    );
  };

  // Handle comments
  const handleComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
  };

  // Handle new post creation
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
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
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: 1,
            input: { color: "white" },
          }}
        />

        <Stack spacing={3}>
          <AnimatePresence>
            {filteredPosts.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <PostCard post={p} onLike={handleLike} onComment={handleComment} />
              </motion.div>
            ))}
          </AnimatePresence>

          {loading &&
            Array.from({ length: 3 }).map((_, idx) => (
             <Skeleton
  key={idx}
  variant="rectangular"
  height={400} // match image height
  sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 3 }}
/>


            ))}
        </Stack>
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setModalOpen(true)}
      >
        <Add />
      </Fab>

      <CreatePostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreatePost}
      />
    </Box>
  );
}

export default Feed;
