import { createContext, useState, ReactNode } from "react";

interface Filters {
  beer_name: string;
  brewery_name: string;
  abv: string;
  category_name: string;
}

interface FilterContextType {
  filters: Filters;
  updateFilters: (filterName: string, value: string ) => void;

}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterContextProviderProps {
  children: ReactNode;
}

const FilterContextProvider = (props: FilterContextProviderProps) => {
  // stockage des filtres :
  const [filters, setFilters] = useState<Filters>({
    beer_name: "",
    brewery_name: "",
    abv: "",
    category_name: "",
  });

  // mise à jour des filtres :
  const updateFilters = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const contextValue = {
    filters,
    updateFilters,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };