import express, { urlencoded } from "express";
import cors from "cors";
import { PORT, HOST } from "./src/config/secret.js";

const app = express();

app.use(express.json());
app.use(urlencoded({
    extended: true,
}));

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

import appRoute from "./src/routes/index.js";
app.use("/api", appRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "Server is running",
    });
});

app.listen(PORT, HOST, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    }
});