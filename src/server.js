import express from "express";
import cors from "cors";
import path from 'path';
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/database.js";
import logger from "./config/logger.js";
import { globalErrorHandler } from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cvRoutes from "./routes/cv.routes.js";
import jobRoutes from "./routes/jobRoutes.js";
import articleRoutes from "./routes/article.js";
import cvDesginRoutes from "./routes/cvDesgin.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import slotRouter from "./routes/slot.routes.js";
import productRouter from "./routes/product.routes.js";
import termsRouter from "./routes/terms.routes.js";
import notifiactionsRouter  from './routes/notification.routes.js';
import userRouter  from './routes/user.routes.js';
import saveJob  from './routes/jobBookmark.routes.js';

//import notificationRoutes from './routes/notificationRoutes.js';
//import firebaseRoutes from './routes/firebaseRoutes.js';
//import volunteerRoutes from './routes/volunteerRoutes.js';
//import adminRoutes from './routes/adminRoutes.js';
//import adSlotRoutes from './routes/adSlotRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  helmet({
    crossOriginResourcePolicy: false, 
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  setHeaders: (res, path, stat) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  }
}));


app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobs", saveJob);
app.use("/api/articles", articleRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/cvDesginRequest", cvDesginRoutes);
app.use("/api/conatct", contactRoutes);
app.use("/api/slots", slotRouter);
app.use("/api/product", productRouter);
app.use("/api/term", termsRouter);
app.use("/api/notifiactions", notifiactionsRouter);
app.use("/api/user", userRouter);

//app.use('/api/cv', cvRoutes);
//app.use('/api/jobs', jobRoutes);
//app.use('/api/notifications', notificationRoutes);
//app.use('/api/push', firebaseRoutes);
//app.use('/api/firebase', firebaseRoutes);
//app.use('/api/volunteer', volunteerRoutes);
//app.use('/api/admin', adminRoutes);
//app.use('/api/adslots', adSlotRoutes);
//app.use('/api/contact', contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "API is running" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(globalErrorHandler);

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});


export default app;
