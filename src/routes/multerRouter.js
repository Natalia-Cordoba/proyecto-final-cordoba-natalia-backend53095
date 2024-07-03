import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";
import { uploadDocs, uploadProfs, uploadProds } from "../config/multer.js";

const multerRouter = Router()

multerRouter.post('/products', uploadProds.single('product'), insertImg)
multerRouter.post('/docs', uploadDocs.single('doc'), insertImg)
multerRouter.post('/profiles', uploadProfs.single('profile'), insertImg)

export default multerRouter