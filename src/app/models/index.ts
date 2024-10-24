import PurchaseOrderModel from '../interfaces/purchase-order.interface';

const createCollections = async (): Promise<any> =>
  Promise.all([PurchaseOrderModel.createCollection()]);

const syncIndexes = async (): Promise<any> =>
  Promise.all([PurchaseOrderModel.syncIndexes()]);

export { createCollections, syncIndexes };
