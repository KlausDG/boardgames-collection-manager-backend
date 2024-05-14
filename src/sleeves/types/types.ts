import { SortOrders } from '@/types';

type OrderByOptions = 'brand' | 'type' | 'category';

export type SleeveOrderBy = Partial<Record<OrderByOptions, SortOrders>>;
