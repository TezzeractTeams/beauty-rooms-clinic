import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleBlvdBookingCatalog, handleBlvdBookingConfig, handleBlvdGraphql } from "./routes/blvd.js";
import { handleDemo } from "./routes/demo.js";
import { handleHeadSpaWebsiteFormLead, handleWebsiteFormLead } from "./routes/website-form-lead.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/website-form-lead", handleWebsiteFormLead);
  app.post("/api/website-headspa-form-lead", handleHeadSpaWebsiteFormLead);
  app.get("/api/blvd/booking-config", handleBlvdBookingConfig);
  app.get("/api/blvd/booking-catalog", handleBlvdBookingCatalog);
  app.post("/api/blvd/graphql", handleBlvdGraphql);

  return app;
}
