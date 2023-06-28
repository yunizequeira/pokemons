import { useContext } from "react";
import FavoritesContext from "../context/FavoritesProvider";

const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    return context;
}

export {useFavoritesContext} 