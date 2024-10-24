import { PurchaseOrderEntity } from "../entities/purchase-order.entity";
import { IPurchaseOrder } from "../interfaces/purchase-order.interface";
import { PurchaseOrderRepository } from "../repositories/purchase-order.repo";

export class PurchaseOrderService {
  constructor(private readonly purchaseOrderRepostory: PurchaseOrderRepository){}
  async create(data: IPurchaseOrder): Promise<PurchaseOrderEntity> {
    const entity = new PurchaseOrderEntity(data);
    const dbEntity = await this.purchaseOrderRepostory.create(entity);
    return dbEntity;
  }
}