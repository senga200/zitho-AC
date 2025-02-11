export interface Beer {
    imageUrl: string 
    category: string 
    name: string
    brewery: string; 
    brewery_id: number;
    brewery_name: string;
    beerTags: unknown;
    beer_id: number;
    beer_name: string;
    description: string;
    abv: number;
    category_name: string;
    logo_url: string;
    setFilteredBeers: React.Dispatch<React.SetStateAction<Beer[]>>;
}
