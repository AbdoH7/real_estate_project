const API_URL = process.env.NEXT_BROWSER_PUBLIC_API_URL || "http://localhost:3000"

export async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
} 