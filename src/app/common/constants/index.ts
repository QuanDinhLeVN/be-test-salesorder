export const HEALTH_CHECK = {
  STATUS: {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
  },
  MONGODB: {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  },
  MONGODB_ACTIVE: [1, 2],
};

export enum PURCHASE_ORDER_STATUS {
  NOT_RECEIVED = 'not_received',
  PARTIAL_RECEIVED = 'partial_received',
  RECEIVED = 'received',
  PENDING_APPROVAL = 'pending_approval',
  PENDING = 'pending',
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  CONFIRMED = 'confirmed',
}
