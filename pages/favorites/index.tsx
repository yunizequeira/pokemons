import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/layouts";
import { useFavoritesContext } from "../../hook/useFavoriteContext";
import style from "../../styles/Favorites.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavoritesContext();

  return (
    <Layout title="favorites pokemons">
      <div>
        {favorites && favorites.length === 0 ? (
          <div className={style.nonFavorites}>
            <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' alt="pokemon" width={300} height={300} className={style.image}/>
            <p className={style.textNoFavorites}>No Favorites yet</p>
          </div>
        ) : (
          <div className={style.container}>
            {favorites &&
              favorites.map((favor) => (
                <Link href={`name/${favor.name}`}key={favor.id}>
                  <div  className={style["image-container"]}>
                    <Image
                      src={favor.image.big}
                      width={100}
                      height={100}
                      alt={favor.name}
                    />
                    <p className={style.text}>{favor.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
