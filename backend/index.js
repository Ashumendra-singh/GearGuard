import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DbconnectDB from "./config/db.js";
import userRoutes from './routes/user.route.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true 
}));

DbconnectDB();

app.use('/api/v1/users', userRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});