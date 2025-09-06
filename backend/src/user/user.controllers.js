import User from "./user.model.js";
import { userRegisterSchema, userLoginSchema } from "./user.mode.validation.js";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const salt = Number(config.salt) || 10;
const secret = config.secret || process.env.JWT_SECRET;

// Register Controller
export async function userRegister(req, res, next) {
  try {
    const { error, value } = userRegisterSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const { fullName, email, password, phone } = value;

    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      return res
        .status(400)
        .json({ status: 400, message: "Email or phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(`User Register Error : ${err}`);
    return next(err);
  }
}

// User Login
export async function userLogin(req, res, next) {
  try {
    const { error, value } = userLoginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const { identifier, password } = value;
    const id = identifier.trim();

    const user = await User.findOne(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id) ? { email: id } : { phone: id }
    );

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, phone: user.phone },
      secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: 200,
      name: user.fullName,
      message: "Login successful",
      email: user.email,
      phone: user.phone || null,
      token,
    });
  } catch (err) {
    console.error(`User Login Error : ${err}`);
    return next(err);
  }
}
