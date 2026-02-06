// src/components/PostCard.js
import React, { useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Stack, Avatar, TextField, Button } from "@mui/material";
import { Favorite, FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";

function PostCard({ post, onLike, onComment }) {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike(post._id, !liked);
  };

  const handleCommentSubmit = () => {
    if (!commentText) return;
    onComment(post._id, { username: "You", text: commentText });
    setCommentText("");
  };

  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardHeader
        avatar={<Avatar>{post.username[0]}</Avatar>}
        title={post.username}
        subheader={new Date().toLocaleDateString()}
        sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
      />

      {/* Big image */}
      <CardMedia
        component="img"
        height="400" // big height to see full image
        image={post.image}
        alt="post image"
        sx={{ objectFit: "cover" }} // ensures image fills area without distortion
      />

      <CardContent sx={{ bgcolor: "rgba(0,0,0,0.1)" }}>
        <Typography variant="body1" mb={2}>
          {post.content}
        </Typography>

        <Stack direction="row" spacing={2} mb={2}>
          <IconButton onClick={handleLikeClick}>
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography>{post.likes}</Typography>

          <IconButton>
            <ChatBubbleOutline />
          </IconButton>
          <Typography>{post.comments.length}</Typography>
        </Stack>

        {/* Comments input */}
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" onClick={handleCommentSubmit}>
            Post
          </Button>
        </Stack>

        {/* Show existing comments */}
        <Stack mt={2} spacing={1}>
          {post.comments.map((c, i) => (
            <Typography key={i} variant="body2">
              <strong>{c.username}:</strong> {c.text}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostCard;
