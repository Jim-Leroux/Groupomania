// IMPORT DES MODULES
const { RequestError, CommentError } = require("../error/customError");
const { User } = require("../db");
const DB = require("../db");
const Comment = DB.Comment;

// ROUTAGE DE LA RESSOURCE Comment
exports.getAll = (req, res, next) => {
  Comment.findAll({ include: User })
    .then((comments) => res.json({ data: comments }))
    .catch((error) => next(error));
};

exports.getOne = async (req, res, next) => {
  let commentId = parseInt(req.params.id);

  if (!commentId) {
    throw new RequestError("Missing parameter");
  }

  try {
    let comment = await Comment.findOne({
      where: { id: commentId },
      raw: true,
      include: User,
    });

    if (comment === null) {
      throw new CommentError("This comment does not exist !", 0);
    }

    return res.json({ data: comment });
  } catch (error) {
    next(error);
  }
};

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
    return res.json({ message: "Comment Created", data: Comment });
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

    if (req.body.user_id !== comment.user_id) {
      throw new RequestError("Unhautorized", 1);
    }

    if (comment === null) {
      throw new CommentError("This comment does not exist !", 0);
    }

    let description = req.body.updatedComment.description;

    let newComment = { description };

    await Comment.update(newComment, { where: { id: commentId } });

    return res.json({ message: "Comment Updated" });
  } catch (error) {
    next(error);
  }
};

exports.untrashOne = async (req, res, next) => {
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

    if (req.body.user_id !== comment.user_id) {
      throw new RequestError("Unhautorized", 1);
    }

    await Comment.restore({ where: { id: commentId } });
    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

exports.trashOne = async (req, res, next) => {
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

    if (req.body.user_id !== comment.user_id) {
      throw new RequestError("Unhautorized", 1);
    }

    await Comment.destroy({ where: { id: commentId } });
    return res.status(204).json({});
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

    if (req.body.admin_access === process.env.ADMIN_ACCESS) {
      await Comment.destroy({ where: { id: commentId }, force: true });
    } else {
      if (req.body.user_id !== comment.user_id) {
        throw new RequestError("Unhautorized", 1);
      }

      await Comment.destroy({ where: { id: commentId }, force: true });
    }

    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
