import { Router } from "express";

// import {signUp} from '../Controllers/userControllers.js'

import userControllers from "../Controllers/userControllers.js"

import { upload } from "../services/multer.js";

const userRouter = Router();

userRouter.post('/register', userControllers.signUp)

userRouter.post('/login', userControllers.login)

userRouter.post('/uploadImage',upload.single('image'),userControllers.uploadImage)

userRouter.post('/fetchUserData', userControllers.fetchUserData)

export default userRouter