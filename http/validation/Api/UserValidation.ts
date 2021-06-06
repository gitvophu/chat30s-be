import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../../responses";
import { User } from "../../../mongoose";

export const validateRegisterUser = [
    body('username').trim().notEmpty().withMessage("Username không được bỏ trống")
        .custom(async value => {
            const exists = await User.exists({ username: value });
            if (exists) {
                throw new Error("Email đã tồn tại.");
            }
            return true;
        }),
    body('password').trim().notEmpty().withMessage("password không được bỏ trống")
        .isLength({ min: 6 }).withMessage("Password yêu cầu tối thiểu 6 ký tự"),
    body('fullname').trim().notEmpty().withMessage("Tên không được trống"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            const msg = errors.array({onlyFirstError: true})[0].msg;
            return res.status(StatusCodes.OK).json(apiResponse(StatusCodes.BAD_REQUEST, "Create user failed. " + msg));
        }
        next();
    }
];