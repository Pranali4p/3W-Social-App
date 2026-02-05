import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Chip,
  Fab,
} from "@mui/material";
import { EmojiEmotions, Send, Close, CloudUpload } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePost() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // store uploaded file
  const [imagePreview, setImagePreview] = useState(""); // for preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // For upload progress
  const [isDragOver, setIsDragOver] = useState(false); // For drag-and-drop
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for file input

  const emojis = ["😀", "❤️", "👍", "🔥", "🎉", "😢", "🤔", "👏", "🌟", "💯", "🚀", "🌈", "💥", "😎", "🤩"];

  const handleEmojiClick = (emoji) => {
    setContent(content + emoji);
    setEmojiAnchor(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // create a preview URL
    } else {
      setError("Please select a valid image file.");
    }
  };

  // Drag-and-drop handlers for cooler UX
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) {
      setError("Add some content or an image to post!");
      return;
    }

    setLoading(true);
    setError("");
    setUploadProgress(0);

    try {
      const token = localStorage.getItem("token");

      // Use FormData to send file
      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      await axios.post("http://localhost:5000/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      navigate("/feed"); // Redirect to feed
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create post. Try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        pt: 10,
        pb: 5,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box
          width={{ xs: 350, md: 500 }}
          p={4}
          boxShadow={5}
          borderRadius={3}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            textAlign="center"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}
          >
            <Send sx={{ mr: 1 }} /> Create a Cool Post
          </Typography>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Caption Input with Character Counter */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="What's on your mind? Add emojis for fun! 🎉"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              inputProps={{ maxLength: 280 }} // Twitter-like limit
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ff6b6b" },
                  "&.Mui-focused fieldset": { borderColor: "#ff6b6b" },
                },
                input: { color: "white" },
              }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Chip
                label={`${content.length}/280`}
                sx={{ color: content.length > 250 ? "red" : "white", bgcolor: "rgba(255,255,255,0.2)" }}
              />
              <IconButton onClick={(e) => setEmojiAnchor(e.currentTarget)} sx={{ color: "white" }}>
                <EmojiEmotions />
              </IconButton>
            </Box>
            <Menu anchorEl={emojiAnchor} open={Boolean(emojiAnchor)} onClose={() => setEmojiAnchor(null)}>
              {emojis.map((emoji) => (
                <MenuItem key={emoji} onClick={() => handleEmojiClick(emoji)}>
                  {emoji}
                </MenuItem>
              ))}
            </Menu>

            {/* Drag-and-Drop Image Upload Area */}
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: `2px dashed ${isDragOver ? "#ff6b6b" : "white"}`,
                borderRadius: 2,
                p: 3,
                mb: 2,
                textAlign: "center",
                bgcolor: isDragOver ? "rgba(255,107,107,0.2)" : "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload sx={{ fontSize: 40, color: "white", mb: 1 }} />
              <Typography>Drag & drop an image here or click to upload</Typography>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>

            {/* Post Preview with Remove Option */}
            <AnimatePresence>
              {(content || imagePreview) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.2)", color: "white", position: "relative" }}>
                    <IconButton
                      onClick={removeImage}
                      sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
                    >
                      <Close />
                    </IconButton>
                    <CardContent>
                      <Typography variant="h6">Preview:</Typography>
                      {content && <Typography sx={{ mb: 1 }}>{content}</Typography>}
                      {imagePreview && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={imagePreview}
                          alt="Preview"
                          sx={{ mt: 1, borderRadius: 2 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Progress */}
            {loading && (
              <Box mb={2}>
                <Typography>Uploading... {uploadProgress}%</Typography>
                <LinearProgress variant="determinate" value={uploadProgress} sx={{ bgcolor: "rgba(255,255,255,0.3)" }} />
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                bgcolor: "#ff6b6b",
                "&:hover": { bgcolor: "#ff5252" },
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Post It!"}
            </Button>
          </form>
        </Box>
      </motion.div>

      {/* Floating Back Button for Cool Navigation */}
      <Fab
        color="secondary"
        sx={{ position: "fixed", top: 20, left: 20 }}
        onClick={() => navigate("/feed")}
      >
        <Close />
      </Fab>
    </Box>
  );
}

export default CreatePost;