import { Router } from "express";
import passport from "passport";
import { createCart, getCart, insertProductCart, createTicket, updateCart, updateQuantity, deleteProductCart, emptyCart } from "../controllers/cartController.js";

const cartRouter = Router()

cartRouter.post('/', createCart)

cartRouter.get('/:cid', getCart)

cartRouter.post('/:cid/:pid', passport.authenticate('jwt', { session: false }), insertProductCart)

cartRouter.put('/:cid', passport.authenticate('jwt', { session: false }), updateCart);

cartRouter.put('/:cid/:pid', passport.authenticate('jwt', { session: false }), updateQuantity)

cartRouter.delete('/:cid/:pid', passport.authenticate('jwt', { session: false }), deleteProductCart)

cartRouter.delete('/:cid', passport.authenticate('jwt', { session: false }), emptyCart)

cartRouter.post('/:cid/purchase', createTicket)

export default cartRouter;