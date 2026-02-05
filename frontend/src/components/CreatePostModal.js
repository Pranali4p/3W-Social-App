// src/components/CreatePostModal.js
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CreatePostModal = ({ open, onClose, onCreate }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (content.trim()) {
      const newPost = {
        id: Date.now(),
        username: "You", // In a real app, get from user context
        content,
        image: image ? URL.createObjectURL(image) : "/Images/default.jpg",
        likes: 0,
        comments: [],
      };
      onCreate(newPost);
      setContent("");
      setImage(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <Close />
        </IconButton>
        <Typography variant="h6" mb={2}>
          Create New Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: 16 }}
        />
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;