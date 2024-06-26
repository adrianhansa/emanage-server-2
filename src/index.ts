import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import organizationRoutes from "./routes/organizationRoutes";
import serviceRoutes from "./routes/service";
import roleRoutes from "./routes/role";
import shiftRoutes from "./routes/shifts";
import trainingRoutes from "./routes/training";
import trainingCompletedRoutes from "./routes/trainingCompleted";
import agencyRoutes from "./routes/agency";
import workShiftRoutes from "./routes/workshift";
import absenceRoutes from "./routes/absence";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/trainingsCompleted", trainingCompletedRoutes);
app.use("/api/agencies", agencyRoutes);
app.use("/api/rota", workShiftRoutes);
app.use("/api/absences", absenceRoutes);

//route NOT FOUND error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(440, "Endpoint not found."));
});

//Error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ message: errorMessage });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
