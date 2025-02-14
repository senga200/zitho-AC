
import { Beer } from '../types/Beer';

const BASE_URL = 'http://localhost:5000/api/v1/beers';

async function fetchBeers(): Promise<Beer[]> {
  try {
    const response =  await fetch(`${BASE_URL}`);
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


//////////////CRUD BIERES////////

async function fetchBeersById(id: number): Promise<Beer | null> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching beers with ID ${id}:`, error);
        return null;
      }
}

async function addBeer(beer: Beer): Promise<Beer | null> {
  console.log("Beer to add:", beer);
    try {
        const response = await fetch(`${BASE_URL}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(beer),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error adding beer:', error);
        return null;
      }
}

async function updateBeer(id: number, updatedBeer: Partial<Beer>): Promise<Beer | null> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBeer),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error updating beer with ID ${id}:`, error);
        return null;
      }
}

async function deleteBeer(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting beer with ID ${id}:`, error);
  }
}


export { fetchBeersById, addBeer, updateBeer, deleteBeer };