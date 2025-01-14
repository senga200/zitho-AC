export interface Beer {
    brewery: string; 
    brewery_id: number;
    brewery_name: string;
    beerTags: unknown;
    beer_id: number;
    beer_name: string;
    description: string;
    abv: number;
    category_name: string;
    setFilteredBeers: React.Dispatch<React.SetStateAction<Beer[]>>;
}