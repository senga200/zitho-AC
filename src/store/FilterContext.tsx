

import { createContext, useState, ReactNode } from "react";

interface Filters {
  beer_name: string;
  brewery_name: string;
  abv: string;
  category_name: string;
}

interface FilterContextType {
  filters: Filters;
  updateFilters: (filterName: string, value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterContextProviderProps {
  children: ReactNode;
}

const FilterContextProvider = (props: FilterContextProviderProps) => {
  // Initialisation de l etat des filtres
  const [filters, setFilters] = useState<Filters>({
    beer_name: "",
    brewery_name: "",
    abv: "",
    category_name: "",
  });

  // MAJ filtres
  const updateFilters = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
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
