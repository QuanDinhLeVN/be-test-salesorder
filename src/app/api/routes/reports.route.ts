import { Router } from 'express';
import data from '../../../../data.json';
const router = Router();

router.get('/top-used-coupons', (req: any, res: any) => {
  const orders = data.data.results;
  const usedCouponsMap = new Map<string, number>();
  for (const order of orders) {
    for (const coupon of order.pricing.coupons) {
      usedCouponsMap.set(
        coupon.code,
        (usedCouponsMap.get(coupon.code) || 0) + 1
      );
    }
  }
  res.status(200).json(
    Array.from(usedCouponsMap)
      .sort((a, b) => b[1] - a[1])
      .map((ele) => ({
        coupon_code: ele[0],
        usage_count: ele[1],
      }))
  );
});
router.get('/sales-taxes', (req: any, res: any) => {
  const orders = data.data.results;
  const salesTaxesMap = new Map<string, number>();
  for (const order of orders) {
    const sellerName = order.pricing.seller.store_name;
    salesTaxesMap.set(
      sellerName,
      (salesTaxesMap.get(sellerName) || 0) + order.pricing.sales_tax
    );
  }
  res.status(200).json(
    Array.from(salesTaxesMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((ele) => ({
        seller_name: ele[0],
        total_sales_tax: ele[1],
      }))
  );
});
router.get('/shipping-states', (req: any, res: any) => {
  const orders = data.data.results;
  const numOrderMap = new Map<string, number>();
  for (const order of orders) {
    const state = order.shipping_address.state;
    numOrderMap.set(state, (numOrderMap.get(state) || 0) + 1);
  }
  res.status(200).json(
    Array.from(numOrderMap)
      .sort((a, b) => b[1] - a[1])
      .map((ele) => ({ state: ele[0], num_of_orders: ele[1] }))
  );
});

router.get('/none-sales-tax', (req: any, res: any) => {
  let noneSalesTax = 0;
  for (const order of data.data.results) {
    if (order.pricing.sales_tax == 0) {
      noneSalesTax++;
    }
  }
  res.status(200).json({ count: noneSalesTax });
});

export default router;
