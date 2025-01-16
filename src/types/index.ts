export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
  description?: string;
  image?: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'served' | 'completed';
  totalAmount: number;
  createdAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

export interface Table {
  id: string;
  number: number;
  status: 'available' | 'occupied' | 'reserved' | 'completed';
  currentOrderId?: string;
}

export interface SalesData {
  period: string;
  amount: number;
  orders: number;
}

export interface PredictiveData {
  itemId: string;
  predictedDemand: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}