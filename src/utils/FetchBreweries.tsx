
import { Brewery } from '../types/Brewery';

async function fetchBreweries(): Promise<Brewery[]> {
  try {
    const response = await fetch('http://localhost:5000/api/v1/breweries');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data:', data);
    return data.breweries || []; 
  } catch (error) {
    console.error('Error:', error);
    return []; 
  }
}

export { fetchBreweries };
