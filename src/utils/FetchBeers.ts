
async function fetchBeers() {
    try {
      const response = await fetch('http://localhost:5000/api/v1/beers');
      const data = await response.json();
      console.log('Data:', data);  
      return data.beers || [];  
    } catch (error) {
      console.error('Error:', error);
      return [];  
    }
  }

    export { fetchBeers };
