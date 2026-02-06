import Review from "../models/Review.js";

export async function createReview(req, res, next) {
  try {
    const review = await Review.create({ ...req.body, author: req.user._id });
    return res.status(201).json({ message: "Review created", review });
  } catch (err) { next(err); }
}

export async function listMyReviews(req, res, next) {
  try {
    const reviews = await Review.find({ author: req.user._id }).sort({ createdAt: -1 });
    return res.json({ reviews });
  } catch (err) { next(err); }
}

export async function getReviewById(req, res, next) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // owner-only access unless admin/moderator
    const isOwner = review.author.toString() === req.user._id.toString();
    const canSee = isOwner || ["admin", "moderator"].includes(req.user.role);
    if (!canSee) return res.status(403).json({ message: "Forbidden" });

    return res.json({ review });
  } catch (err) { next(err); }
}

export async function updateReview(req, res, next) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const isOwner = review.author.toString() === req.user._id.toString();
    const canEdit = isOwner || ["admin", "moderator"].includes(req.user.role);
    if (!canEdit) return res.status(403).json({ message: "Forbidden" });

    Object.assign(review, req.body);
    await review.save();

    return res.json({ message: "Review updated", review });
  } catch (err) { next(err); }
}

export async function deleteReview(req, res, next) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const isOwner = review.author.toString() === req.user._id.toString();
    const canDelete = isOwner || req.user.role === "admin";
    if (!canDelete) return res.status(403).json({ message: "Forbidden" });

    await review.deleteOne();
    return res.json({ message: "Review deleted" });
  } catch (err) { next(err); }
}
