import { Categories as CategoryType } from '../types/categories';

export const DUMMY_CATEGORIES: CategoryType[] = [
  {
    id: 1,
    name: 'Electronics',
    url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
  },

  {
    id: 3,
    name: 'Home',
    url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Beauty',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
  },
  {
    id: 5,
    name: 'Sports',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop',
  },
  {
    id: 6,
    name: 'Groceries',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
  },
];

export const DUMMY_BANNERS = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    type: 'sale',
  },
  {
    id: 2,
    title: 'New Collection',
    subtitle: 'Latest Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop',
    type: 'offer',
  },
  {
    id: 3,
    title: 'Flash Deal',
    subtitle: 'Only for 24 Hours',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop',
    type: 'sale',
  }
];

export const DUMMY_OFFERS = [
  {
    id: 101,
    title: 'First Order Discount',
    subtitle: 'Use Code: WELCOME10',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=400&fit=crop',
    discount: '10%',
  },
  {
    id: 102,
    title: 'Bank Offer',
    subtitle: 'Instant Cash back on HDFC',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    discount: '$20 Cashback',
  }
];
