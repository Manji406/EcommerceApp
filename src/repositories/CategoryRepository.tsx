import { Categories } from '../types/categories';
import { DUMMY_CATEGORIES } from '../data/mockData';

export const fetchCategories = async (): Promise<Categories[]> => {
  try {
    // Simulating an API call delay
    
    // Return dummy data for now
    return DUMMY_CATEGORIES;
    
    // Once your API is ready, you can switch back to:
    // const response = await fetch('YOUR_API_URL');
    // return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};