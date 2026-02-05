import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function PostCard({ post, onLike, onComment }) {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike(post.id, !liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(post.id, { username: "You", text: commentText });
    setCommentText("");
  };

  return (
    <Card
      sx={{
        bgcolor: "rgba(255,255,255,0.1)",
        color: "white",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.2)",
        overflow: "hidden",
      }}
    >
      {/* Username */}
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {post.username}
        </Typography>
      </CardContent>

      {/* Post Image */}
      {post.image && (
        <CardMedia
          component="img"
          src={post.image}
          alt="Post"
          sx={{
            width: "100%",
            maxHeight: 400,       // max height for big images
            objectFit: "contain", // full image shown
            bgcolor: "rgba(0,0,0,0.05)",
          }}
        />
      )}

      {/* Likes & Comments */}
      <CardContent>
        {/* Like Button */}
        <Box display="flex" alignItems="center" mb={1}>
          <IconButton sx={{ color: "white" }} onClick={handleLikeClick}>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography component="span" sx={{ ml: 1 }}>
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </Typography>
        </Box>

        {/* Comments */}
        <Stack spacing={1} mb={2}>
          {post.comments.map((c, i) => (
            <Typography key={i} variant="body2">
              <strong>{c.username}:</strong> {c.text}
            </Typography>
          ))}
        </Stack>

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit}>
          <TextField
            fullWidth
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            size="small"
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#ff6b6b" },
                "&.Mui-focused fieldset": { borderColor: "#ff6b6b" },
              },
              input: { color: "white" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#ff6b6b",
              "&:hover": { bgcolor: "#ff5252" },
              width: "100%",
            }}
          >
            Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PostCard;
