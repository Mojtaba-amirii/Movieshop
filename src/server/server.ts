import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:3000" }));
app.options("*", cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
    ieNoOpen: false,
    hidePoweredBy: false,
  }),
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
