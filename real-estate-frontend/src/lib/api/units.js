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

export async function getUnit(id) {
  try {
    const response = await fetch(`${API_URL}/units/${id}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch unit');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching unit:', error);
    throw error;
  }
} 