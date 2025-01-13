
import { Beer } from '../types/Beer';

async function fetchBeers(): Promise<Beer[]> {
  try {
    const response = await fetch('http://localhost:5000/api/v1/beers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data:', data);
    return data.beers || []; // attention au type de data.beers correspond à Beer[]
  } catch (error) {
    console.error('Error:', error);
    return []; 
  }
}

export { fetchBeers };
