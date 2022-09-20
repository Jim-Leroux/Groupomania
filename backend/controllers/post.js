// IMPORT DES MODULES
const { RequestError, PostError } = require("../error/customError");
const { User, Comment, Like } = require("../db");
const DB = require("../db");
const fs = require("fs");
const Post = DB.Post;

// ROUTAGE DE LA RESSOURCE POST
exports.getAll = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: [
          {
            model: User,
          },
        ],
      },
      {
        model: Like,
      },
    ],
  })
    .then((posts) => res.json({ data: posts }))
    .catch((error) => next(error));
};

exports.createOne = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const description = req.body.description;
    let imageUrl = "";

    if (!user_id && !description) {
      throw new RequestError("Missing parameter");
    }

    if (req.file) {
      const url = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;

      imageUrl = url;
    }

    const newPost = { user_id, description, imageUrl };

    await Post.create(newPost);
    return res.json({ message: "Post Created", data: Post });
  } catch (error) {
    next(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    let postId = parseInt(req.params.id);

    if (!postId) {
      throw new RequestError("Missing parameter");
    }

    let post = await Post.findOne({ where: { id: postId }, raw: true });

    if (req.auth.userId !== post.user_id) {
      throw new RequestError("Unhautorized", 1);
    }

    if (post === null) {
      throw new PostError("This post does not exist !", 0);
    }

    if (req.file) {
      if (post.imageUrl != "") {
        const filename = post.imageUrl.split("/images/")[1];

        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;

      req.body.imageUrl = imageUrl;
    }

    await Post.update(req.body, { where: { id: postId } });

    return res.json({ message: "Post Updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    let postId = parseInt(req.params.id);

    if (!postId) {
      throw new RequestError("Missing parameter");
    }

    let post = await Post.findOne({ where: { id: postId }, raw: true });

    if (post === null) {
      throw new PostError("This post does not exist !", 0);
    }

    if (req.auth.userId !== post.user_id && req.auth.isAdmin !== true) {
      throw new RequestError("Unhautorized", 1);
    }

    if (post.imageUrl != "") {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) throw error;
      });
    }

    await Post.destroy({ where: { id: postId }, force: true });

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

exports.getLikes = (req, res, next) => {
  Like.findAll({ where: { user_id: req.auth.userId } })
    .then((likes) => {
      res.status(200).json({ likes });
    })
    .catch((error) => next(error));
};

exports.likeDislike = async (req, res, next) => {
  try {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
      throw new RequestError("Missing parameter");
    }

    let like = await Like.findOne({
      where: {
        post_id,
        user_id,
      },
    });

    if (like === null || like.user_id != user_id) {
      const newLike = req.body;
      await Like.create(newLike);
    } else {
      await Like.destroy({
        where: { post_id: post_id, user_id: user_id },
        force: true,
      });
    }

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
