import { PURCHASE_ORDER_STATUS } from '../common/constants';
import { IPurchaseOrder } from '../interfaces/purchase-order.interface';

export class PurchaseOrderEntity {
  _id?: string;
  name: string;
  status: PURCHASE_ORDER_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: IPurchaseOrder) {
    this.name = data.name;
    this.status = data.status;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
  }
  toDto() {
    return {
      _id: this._id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  static fromDB(data: IPurchaseOrder) {
    const entity = new PurchaseOrderEntity(data);
    entity._id = data._id?.toString();
    return entity;
  }
}
