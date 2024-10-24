import { PurchaseOrderEntity } from '../entities/purchase-order.entity';
import PurchaseOrderModel from '../interfaces/purchase-order.interface';

export class PurchaseOrderRepository {
  async create(entity: PurchaseOrderEntity): Promise<PurchaseOrderEntity> {
    const result = await PurchaseOrderModel.create([entity.toDto()]);
    return PurchaseOrderEntity.fromDB(result[0]);
  }
}
