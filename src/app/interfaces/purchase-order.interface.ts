import { model, Schema } from 'mongoose';
import { PURCHASE_ORDER_STATUS } from '../common/constants';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export interface IPurchaseOrder {
  _id?: string;
  name: string;
  status: PURCHASE_ORDER_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
}

export const purchaseOrderSchema = new Schema(
  {
    name: { type: String },
    status: { type: String },
  },
  { timestamps: true, versionKey: 'version' }
);

purchaseOrderSchema.plugin(mongooseLeanVirtuals);

export type PurchaseOrder = IPurchaseOrder & Document;

const PurchaseOrderModel = model<PurchaseOrder>(
  'purchaseOrder',
  purchaseOrderSchema
);
export default PurchaseOrderModel;
