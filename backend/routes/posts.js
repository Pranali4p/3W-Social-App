router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
