// src/components/PostCard.js
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  TextField,
  Button,
  Collapse,
  Avatar,
  Stack
} from "@mui/material";
import { Favorite, ChatBubbleOutline } from "@mui/icons-material";

function PostCard({ post, onLike, onComment }) {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike(post._id, !liked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;
    onComment(post._id, { username: "You", text: commentText });
    setCommentText("");
    setExpanded(true);
  };

  return (
    <Card sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "white", borderRadius: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#764ba2" }}>{post.username.charAt(0)}</Avatar>}
        title={<Typography sx={{ fontWeight: "bold" }}>{post.username}</Typography>}
        subheader={new Date().toLocaleDateString()}
      />

      {post.image && (
        <CardMedia
  component="img"
  image={post.image}
  alt="post image"
  sx={{
    width: "100%",      // full width of the card
    height: "auto",     // auto height to keep original aspect ratio
    maxHeight: 600,     // optional: limit max height so it's not too huge
    borderRadius: 2,
    objectFit: "contain", // contain ensures the full image fits without cropping
    display: "block",
    margin: "0 auto"
  }}
/>

      )}

      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {post.content}
        </Typography>

        {/* Likes & Comments display */}
        <Stack direction="row" spacing={2}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ❤️ {post.likes}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            💬 {post.comments.length}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton onClick={handleLikeClick} sx={{ color: liked ? "red" : "white" }}>
          <Favorite />
        </IconButton>

        <Button
          startIcon={<ChatBubbleOutline />}
          onClick={() => setExpanded(!expanded)}
          sx={{ color: "white" }}
        >
          Comments
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post.comments.map((c, idx) => (
            <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
              <strong>{c.username}:</strong> {c.text}
            </Typography>
          ))}

          <Stack direction="row" spacing={1} mt={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ bgcolor: "rgba(255,255,255,0.1)", borderRadius: 1, input: { color: "white" } }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCommentSubmit}
            >
              Post
            </Button>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostCard;
