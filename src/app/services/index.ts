import { purchaseOrderRepository } from "../repositories";
import { PurchaseOrderService } from "./purchase-order.service";

export const purchaseOrderService = new PurchaseOrderService(purchaseOrderRepository);