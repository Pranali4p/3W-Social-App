// src/components/CreatePostModal.js
import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// Preset images from public/images
const presetImages = [
  "/images/sunset.jpg",
  "/images/taco.jpg",
  "/images/hiking.jpg",
  "/images/default.jpg",
];

const CreatePostModal = ({ open, onClose, onCreate }) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("/images/default.jpg");

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost = {
      _id: Date.now(), // temporary ID for frontend
      username: "You",
      content,
      image: selectedImage,
      likes: 0,
      comments: [],
    };

    onCreate(newPost);
    setContent("");
    setSelectedImage("/images/default.jpg");
    onClose();
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

        <Typography mb={1}>Select an image:</Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {presetImages.map((img) => (
            <img
              key={img}
              src={img}
              alt="preset"
              style={{
                width: 80,
                height: 60,
                objectFit: "cover",
                border: selectedImage === img ? "3px solid blue" : "1px solid gray",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
