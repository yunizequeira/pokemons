import { GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import { Card1 } from "../components/ui";

interface Poke {
  name: string;
  url: string;
  id: number;
  img: string;
}

interface Results {
  results: Poke[];
  pokes: Poke[];
}

export default function HomePage({ pokes }: Results) {
  return (
    <Layout title="List of Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokes.map((poke) => (
          <Card1 poke={poke} key={poke.id} />
        ))}
      </Grid.Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const { results }: Results = await pokemons.json();
  const pokes = results.map((poke, i) => {
    poke.id = i + 1;
    poke.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//${poke.id}.png`;
    return { ...poke, id: poke.id };
  });

  return {
    props: {
      pokes,
    },
  };
};
