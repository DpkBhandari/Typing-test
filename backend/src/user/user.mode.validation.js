import Joi from "joi";

// User Register Schema
const userRegisterSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "in"] },
    })
    .required(),

  password: Joi.string()
    .min(6)
    .max(64)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{6,18}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character.",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be 10 digits.",
    }),
});

// Login Validation Schema
const userLoginSchema = Joi.object({
  identifier: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
      if (emailRegex.test(value) || phoneRegex.test(value)) {
        return value;
      }
      return helpers.message(
        "Identifier must be a valid email or a 10-digit phone number"
      );
    }),
  password: Joi.string().min(6).max(64).required(),
});

export { userRegisterSchema, userLoginSchema };
