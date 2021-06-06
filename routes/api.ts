import express, { NextFunction, Request, Response, Router } from 'express';
import { User } from './../mongoose'
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { SALT_ROUNDS } from '../lib/password';
import bcrypt from 'bcrypt'
import * as UserController from '../http/controllers/Api/UserController';
import * as UserValidation from '../http/validation/Api/UserValidation';

var router: Router = express.Router();
router.post('/users/register', UserValidation.validateRegisterUser, UserController.register);
router.post('/login', UserController.login);
export default router;