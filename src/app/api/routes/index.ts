import { Router } from 'express';
import healthRoute from './health.route'
import purchaseOrderRoute from './purchase-order.route'
import reportsRoute from './reports.route'

const router = Router();

router.use('/nailzy/health', healthRoute);
router.use('/nailzy/purchase-orders', purchaseOrderRoute);
router.use('/nailzy/reports', reportsRoute);

router.use((err: any, _: any, res: any, next: any): void => {
  res.status(err.statusCode).send({ message: err.message, status: err.status });
  next();
});

export default router;
