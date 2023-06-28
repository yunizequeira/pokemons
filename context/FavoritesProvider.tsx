import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Props {
  pokemon: {
    id: string;
    name: string;
    image: {
      big: string;
      back: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
    };
  };
}
interface Favorites {
  favorites: Props["pokemon"][];
}

interface Children {
  children: ReactNode;
}

const FavoritesContext = createContext({
  updateFavorites: (pokemon: Props["pokemon"]) => {},
  existPokemon: false,
  favorites: [
    {
      id: "",
      name: "",
      image: {
        big: "",
        back: "",
        back_shiny: "",
        front_default: "",
        front_shiny: "",
      },
    },
  ],
});

const FavoritesProvider = ({ children }: Children) => {
  const [favorites, setFavorites] = useState<Favorites["favorites"] | []>();

  const [existPokemon, setExistPokemon] = useState(false);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  const updateFavorites = (pokemon: Props["pokemon"]) => {
    if (favorites.length === 0) {
      localStorage.setItem("favorites", JSON.stringify([pokemon]));
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    } else {
      favorites.map((f:Props['pokemon']) => {
        if (f.id === pokemon.id) {
          const al = favorites.filter((f:Props['pokemon']) => f.id !== pokemon.id);
          setFavorites(al);
          localStorage.setItem("favorites", JSON.stringify([al]));
          setExistPokemon(true);
        } else {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...favorites, pokemon])
          );
          setFavorites(JSON.parse(localStorage.getItem("favorites")));
          setExistPokemon(false);
        }
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        updateFavorites,
        existPokemon,
        favorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider };

export default FavoritesContext;
