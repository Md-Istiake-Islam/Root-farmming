import express from "express";
import { getCollection } from "../config/db.js";
// import { getCollection } from "../config/db.js";

const router = express.Router();
router.use(
   cors({
      origin: [
         "http://localhost:5173",
         "http://localhost:5174",
         "https://root-farming-quantum.netlify.app",
         "https://root-farming.web.app",
         "https://elegant-buttercream-cd3400.netlify.app",
         "https://root-farming-bb736.web.app",
         "https://clinquant-conkies-e2c5aa.netlify.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-custom-header"],
   })
);

router.post("/", async (req, res) => {
   try {
      const activity = req.body;
      console.log("New activity received:", activity);
      const activitiesCollection = await getCollection("activities");
      const result = await activitiesCollection.insertOne(activity);
      console.log(result);

      res.status(201).json({
         success: true,
         message: "Activity created successfully",
         result,
      });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
});

router.get("/", async (req, res) => {
   try {
      const activitiesCollection = await getCollection("activities");
      const result = await activitiesCollection.find({}).toArray();
      res.status(200).json({
         success: true,
         message: "Activities retrived successfully",
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
   }
});

export default router;
