import express, {Router, Request, Response, NextFunction} from 'express';
import {User} from './../mongoose'
import {body, validationResult} from 'express-validator';
import {StatusCodes} from 'http-status-codes';
import {SALT_ROUNDS} from '../lib/password';
import bcrypt from 'bcrypt'
var router: Router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});


export default router;
