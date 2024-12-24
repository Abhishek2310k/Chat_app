import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject(); // Exclude password from response
    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  // console.log("request made");
  try {
    const { username, password } = req.body;
    console.log(username,password);
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });

    // here everything is valid so lets first create a jwt token
    const token = jwt.sign(
      { username }, 
      process.env.SERVER_SECRET, 
      { expiresIn: '24h' } 
    );

    res.cookie('token', token, {
      httpOnly:true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    
    const { password: _, ...userWithoutPassword } = user.toObject(); 
    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    next(ex);
  }
};
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const img = req.body.image;

    await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: img,
    });

    const fin = await User.findById(userId);
    return res.json({
      isSet: fin.isAvatarImageSet,
      image: fin.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
