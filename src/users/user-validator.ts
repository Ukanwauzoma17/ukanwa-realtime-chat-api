import Joi from "joi";
// import bcrypt from "bcrypt"
// For the passwords, in order for users to have adequate security,
// we would require that the password is at least 6 characters long

const userSchema = Joi.object({
  userName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateUser = (user: any) => {
  return userSchema.validate(user);
};


