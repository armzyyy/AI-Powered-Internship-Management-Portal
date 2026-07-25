import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import internshipsRouter from "./internships";
import applicationsRouter from "./applications";
import reportsRouter from "./reports";
import usersRouter from "./users";
import dashboardsRouter from "./dashboards";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(internshipsRouter);
router.use(applicationsRouter);
router.use(reportsRouter);
router.use(usersRouter);
router.use(dashboardsRouter);
router.use(aiRouter);

export default router;
