import { ReactNode } from 'react';


export interface Beer {
    beer_name: ReactNode;
    beer?: Beer | null;
    beer_id: number;            
    name: string;           
    description: string;        
    abv: number;                 
    brewery_id: number;          
    category_id?: number;        
    logo_url?: string;
    brewery_name: string;
    category_name?: string;          
}
