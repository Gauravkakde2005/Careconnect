import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()

app.use(cors({
    origin : ["http://localhost:5173","https://careconnect-khaki.vercel.app"],
    credentials : true
}))


app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({ extended : true , limit : "20kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// routes import 
import userRouter from './routes/user.router.js'
import profileRouter from "./routes/profile.router.js"
import reportRouter from "./routes/report.router.js"
import allergyRouter from "./routes/allergy.router.js"
import scheduleRouter from "./routes/schedule.router.js"

// routes declaration 
app.use("/api/v1/user" , userRouter)

app.use("/api/v1/profile", profileRouter)

app.use("/api/v1/report", reportRouter)

app.use("/api/v1/allergy", allergyRouter)
app.use("/api/v1/schedule", scheduleRouter)



export { app }


