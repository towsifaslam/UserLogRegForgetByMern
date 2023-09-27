const createHttpError = require("http-errors");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { successRespnse } = require("./responseController");
const createJsonWebToken = require("../helper/jwt");
const { JWT_ACCESS } = require("../secret");

const userLoging = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //    console.log(user)

    if (!user) {
      next(createHttpError(400, "user does not exist"));
    }

    const isPassWordMatch = await bcrypt.compare(password, user.password);

    if (!isPassWordMatch) {
      next(createHttpError(400, "user invalide"));
    }

    if (user.isBanned) {
      next(createHttpError(404, `${user.email} is banned connect your addmin`));
    }
    const userWithourPass = await User.findOne({ email }).select("-password");
    const token = createJsonWebToken({ userWithourPass }, JWT_ACCESS, "15m");
    res.cookie("access_token", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    successRespnse(res, {
      statusCode: 200,
      message: "successfully Sign in",
      payload: { userWithourPass },
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return successRespnse(res, {
      statusCode: 202,
      message: "user logouted successfully",
    });
  } catch (error) {
    next(createHttpError(404, error.message));
  }
};
module.exports = { userLoging, userLogout };
