
import { Brewery } from '../types/Brewery';
const BASE_URL = 'https://zythologueapi-ac.onrender.com/api/v1/breweries';


async function fetchBreweries(): Promise<Brewery[]> {
  try {
    const response = await fetch(`${BASE_URL}`);
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

//////////////CRUD BRASSERIES////////

  async function fetchBreweryById(id: number): Promise<Brewery | null> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching brewery with ID ${id}:`, error);
      return null;
    }
  }
  
  async function addBrewery(brewery: Brewery): Promise<Brewery | null> {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brewery),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} : ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding brewery:', error);
      return null;
    }
  }
  
  async function updateBrewery(id: number, updatedBrewery: Partial<Brewery>): Promise<Brewery | null> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBrewery),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating brewery with ID ${id}:`, error);
      return null;
    }
  }

  async function deleteBrewery(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting brewery with ID ${id}:`, error);
      return false;
    }
  }



export { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery };
