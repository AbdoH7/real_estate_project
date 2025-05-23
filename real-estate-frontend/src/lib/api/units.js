const API_URL = process.env.NEXT_PUBLIC_API_URL
const FORM_SUBMISSION_URL = process.env.NEXT_BROWSER_PUBLIC_API_URL || "http://localhost:3000"

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export async function getUnits() {
  try {
    const response = await fetch(`${API_URL}/units`, { 
      cache: 'no-store',
      headers: defaultHeaders,
    });
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
    const response = await fetch(`${API_URL}/units/${id}`, { 
      cache: 'no-store',
      headers: defaultHeaders,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch unit');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching unit:', error);
    throw error;
  }
}

export async function createUnit(unitData) {
  try {
    const response = await fetch(`${FORM_SUBMISSION_URL}/units`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(unitData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create unit');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating unit:', error);
    throw error;
  }
} 