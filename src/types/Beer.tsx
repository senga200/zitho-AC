// export interface Beer {
//     beer?: Beer | null;
//     imageUrl?: string; 
//     category?: string; 
//     name?: string;
//     brewery?: string; 
//     brewery_id?: number;
//     brewery_name?: string;
//     beerTags?: unknown;
//     beer_id?: number;
//     beer_name: string;
//     description: string;
//     abv: number;
//     category_name?: string;
//     logo_url?: string;
//     setFilteredBeers?: React.Dispatch<React.SetStateAction<Beer[]>>;
// }

export interface Beer {
    beer_id: number;             // ID unique de la bière
    name: string;           // Nom de la bière
    description: string;         // Description de la bière
    abv: number;                 // Taux d'alcool (%)
    brewery_id: number;          // ID de la brasserie associée
    category_id?: number;        // ID de la catégorie (optionnel)
    logo_url?: string;           // URL du logo (optionnel)
}
