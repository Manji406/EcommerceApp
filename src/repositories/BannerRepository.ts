import { Banner } from '../types/banner';
import { DUMMY_BANNERS } from '../data/mockData';

export const fetchBanners = async (): Promise<Banner[]> => {
  try {
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return DUMMY_BANNERS;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};
