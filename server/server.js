import express from 'express';
import dotenv from 'dotenv'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

dotenv.config()

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(express.static("public"))

app.use("/user",userRouter)
app.use("/admin",adminRouter)

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`http://localhost:${port}`)
})