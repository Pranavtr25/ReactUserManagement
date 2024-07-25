import { Router } from "express";

import adminControllers from "../Controllers/adminControllers.js";

const adminRouter = Router();

adminRouter.post('/login', adminControllers.adminLogin) 

adminRouter.post('/fetchUsersData',adminControllers.fetchUsersData)

adminRouter.post('/deleteUser', adminControllers.deleteUser)

adminRouter.post('/editUser',adminControllers.editUserData)

export default adminRouter