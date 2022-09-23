// IMPORT DES MODULES
const { RequestError, CommentError } = require("../error/customError");
const DB = require("../db");
const Comment = DB.Comment;

// ROUTAGE DE LA RESSOURCE Comment
exports.createOne = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const post_id = req.body.newComment.selectedPost;
    const description = req.body.newComment.description;

    if (!user_id || !post_id || !description) {
      throw new RequestError("Missing parameter");
    }

    let newComment = { user_id, post_id, description };

    await Comment.create(newComment);
    return res.status(201).json({ message: "Comment Created", data: Comment });
  } catch (error) {
    next(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    let commentId = parseInt(req.params.id);

    if (!commentId) {
      throw new RequestError("Missing parameter");
    }

    let comment = await Comment.findOne({
      where: { id: commentId },
      raw: true,
    });

    if (req.auth.userId !== comment.user_id) {
      throw new RequestError("Unhautorized", 1);
    }

    if (comment === null) {
      throw new CommentError("This comment does not exist !", 0);
    }

    let description = req.body.updatedComment.description;

    let newComment = { description };

    await Comment.update(newComment, { where: { id: commentId } });

    return res.status(200).json({ message: "Comment Updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    let commentId = parseInt(req.params.id);

    if (!commentId) {
      throw new RequestError("Missing parameter");
    }

    let comment = await Comment.findOne({
      where: { id: commentId },
      raw: true,
    });

    if (comment === null) {
      throw new CommentError("This comment does not exist !", 0);
    }

    if (req.auth.userId !== comment.user_id && req.auth.isAdmin !== true) {
      throw new RequestError("Unhautorized", 1);
    }

    await Comment.destroy({ where: { id: commentId }, force: true });

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
