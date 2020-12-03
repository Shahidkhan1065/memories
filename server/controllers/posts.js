import Post from '../models/Post.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that is');
  const updatePost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatePost);
};
