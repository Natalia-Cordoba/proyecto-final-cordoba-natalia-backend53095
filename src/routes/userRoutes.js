import { Router } from "express";
import passport from "passport";

import { getUsers, sendDocuments } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/', passport.authenticate('jwt', { session: false }), getUsers)

userRouter.post('/:uid/documents', sendDocuments)

export default userRouter