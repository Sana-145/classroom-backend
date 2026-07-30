import express from "express";
import cors from "cors";
import subjectsRouter from "./routes/subjects.js";
import usersRouter from "./routes/users.js";
import classesRouter from "./routes/classes.js";

import securityMiddleware from "./middleware/security.js";
import {auth} from "./lib/auth.js";
import {toNodeHandler} from "better-auth/node";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl) throw new Error("FRONTEND_URL environment variable is required");

app.use(cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(securityMiddleware)

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use('/api/subjects', subjectsRouter);
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);

app.get("/", (req, res) => {
    res.send("Hello, welcome to the classroom API");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});