import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "../../../lib/password";
import { User } from "../../../mongoose";
import { apiResponse } from "../../responses";
import jwt  from 'jsonwebtoken';
export const register = async function (req: Request, res: Response, next: NextFunction) {

  const username: string = req.body.username;
  const fullname: string = req.body.fullname;
  const password: string = await bcrypt.hash(req.body.password, SALT_ROUNDS);

  const user = new User({
    username,
    password,
    fullname
  });
  const userData = {
    id: user._id,
    fullname: user.fullname,
    username: user.username,
  };
  await user.save();
  return res.status(StatusCodes.OK)
    .json(apiResponse(StatusCodes.OK, "Create user success", userData));
};

export const login = async function (req: Request, res: Response, next: NextFunction) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.status(StatusCodes.OK)
      .json(apiResponse(StatusCodes.BAD_REQUEST, "Sai tài khoản hoặc mật khẩu"));
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    return res.status(StatusCodes.OK)
      .json(apiResponse(StatusCodes.BAD_REQUEST, "Sai tài khoản hoặc mật khẩu"));
  }
  const userData = {
    username: user.username,
    fullname: user.fullname
  }
  const access_token = await jwt.sign(userData, '123456');
  const responseData = {
    user: userData,
    access_token: access_token
  };
  return res.status(StatusCodes.OK)
    .json(apiResponse(StatusCodes.OK, "OK", responseData));
}