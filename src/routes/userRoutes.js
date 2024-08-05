import { Router } from "express";
import passport from "passport";

import { getUsers, sendDocuments, updateUserRole, deleteInactiveUsers} from "../controllers/userController.js";

const userRouter = Router()

// userRouter.get('/', passport.authenticate('jwt', { session: false }), getUsers)

userRouter.get('/', getUsers)

userRouter.post('/:uid/documents', sendDocuments)

userRouter.delete('/inactive', passport.authenticate('jwt', { session: false }), deleteInactiveUsers)

userRouter.put('/:uid/role',passport.authenticate('jwt', { session: false }), updateUserRole);

export default userRouter