import User from "../models/User.js";

export async function getProfile(req, res) {
  return res.json({ user: req.user });
}

export async function updateProfile(req, res, next) {
  try {
    const { username, email } = req.body;
    // if changing email, ensure unique
    if (email && email !== req.user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: "Email already in use" });
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { ...(username && { username }), ...(email && { email }) },
      { new: true }
    ).select("-password");

    return res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    next(err);
  }
}
