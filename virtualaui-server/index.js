import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./configs/connectDB.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import componentRouter from "./routes/component.route.js"
import paymentRouter from "./routes/payment.route.js"

dotenv.config()

const app= express()


const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean).map(url => url.trim().replace(/\/$/, ""));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        
        const sanitizedOrigin = origin.trim().toLowerCase().replace(/\/$/, "");
        const isAllowed = allowedOrigins.map(o => o.toLowerCase()).includes(sanitizedOrigin) || 
                          sanitizedOrigin.endsWith(".vercel.app");
        
        console.log(`CORS check - Origin: "${origin}", Sanitized: "${sanitizedOrigin}", IsAllowed: ${isAllowed}`);
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: Origin "${origin}" not in allowed list:`, allowedOrigins);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/component", componentRouter);
app.use("/api/payment", paymentRouter)

const PORT=process.env.PORT  
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})