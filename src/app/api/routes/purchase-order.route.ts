import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../common/utils/async-handler';
import { purchaseOrderService } from '../../services';
import PurchaseOrderModel from '../../interfaces/purchase-order.interface';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({ message: 'Name and status are required' });
    }

    const purchaseOrder = await purchaseOrderService.create({ name, status });
    res.status(201).json(purchaseOrder);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const purchaseOrder = await PurchaseOrderModel.findById(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    res.status(200).json(purchaseOrder);
  })
);

export default router;
