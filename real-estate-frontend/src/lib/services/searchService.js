const API_BASE_URL = 'http://localhost:3000';

export const getMaxValues = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/units/max-values`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch max values');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching max values:', error);
    // Return default values if the API call fails
    return {
      maxPrice: 1000000,
      maxBedrooms: 10
    };
  }
};

export const searchUnits = async (params) => {
  const searchParams = new URLSearchParams();
  
  // Only add parameters that have values
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/units?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching units:', error);
    throw error;
  }
}; 