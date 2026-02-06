import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(2).max(40),
  email: Joi.string().email(),
});

export const reviewCreateSchema = Joi.object({
  movieId: Joi.string().required(),
  movieTitle: Joi.string().min(1).max(200).required(),
  rating: Joi.number().min(1).max(10).required(),
  reviewText: Joi.string().allow("").max(2000),
  containsSpoilers: Joi.boolean(),
});

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(10),
  reviewText: Joi.string().allow("").max(2000),
  containsSpoilers: Joi.boolean(),
});
