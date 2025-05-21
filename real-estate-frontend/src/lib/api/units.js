const API_URL = 'http://api:3000';

export async function getUnits() {
  try {
    const response = await fetch(`${API_URL}/units`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching units:', error);
    return [];
  }
} 