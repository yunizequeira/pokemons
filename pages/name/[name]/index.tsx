import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../../components/layouts";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { useFavoritesContext } from "../../../hook/useFavoriteContext";

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
interface Result {
  results: Array<{ name: string }>;
}

interface IProps {
  updateFavorites?: (pokemon: Props) => void;
  existPokemon: boolean;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const { id, name, image } = pokemon;
  const [pokemonSelect, setPokemonSelect] = useState<Props["pokemon"]>();
  const [exist, setExist] = useState<boolean>();

  const { updateFavorites } = useFavoritesContext();

  useEffect(() => {
    const local: Props["pokemon"][] = JSON.parse(
      localStorage.getItem("favorites")
    );
    local.map((pokemonL) => {
      if (pokemonL.id === id) {
        setExist(true);
      }
    });
  }, []);

  useEffect(() => {
    if (pokemonSelect && pokemonSelect.id !== "") {
      updateFavorites(pokemonSelect);
    }
  }, [pokemonSelect]);

  const handleToggle = () => {
    setPokemonSelect(pokemon);
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={image.big || "/no-image.png"}
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h3 transform="capitalize">
                {name}
              </Text>

              <Button color="gradient" ghost onClick={handleToggle}>
                {exist ? "Delete from Favorites" : "Save in Favorites"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container display="flex" direction="row" justify="space-evenly">
                <Image
                  src={image.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />

                <Image src={image.back} alt={name} width={100} height={100} />

                <Image
                  src={image.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />

                <Image
                  src={image.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results }: Result = await response.json();
  const names = results.map((result) => result.name);

  return {
    paths: names.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { sprites } = await response.json();
  const { back_default, back_shiny, front_default, front_shiny } = sprites;

  return {
    props: {
      pokemon: {
        name,
        image: {
          big: sprites.other.dream_world.front_default,
          back: back_default,
          back_shiny: back_shiny,
          front_default: front_default,
          front_shiny: front_shiny,
        },
      },
    },
  };
};

export default PokemonByNamePage;
