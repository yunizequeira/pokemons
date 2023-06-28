import { Card, Grid, Row, Text } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface Poke {
  poke: {
    name: string;
    url: string;
    id: number;
    img: string;
  };
}

export const Card1:FC<Poke> = ({ poke }) => {
    const { name, id, img } = poke;
    const router = useRouter()
    const handleCardClick=() => {
        router.push(`/pokemon/${id}`)
    }

  return (
    <Grid xs={6} sm={6} md={4} xl={2} onClick={handleCardClick}>
      <Card isHoverable isPressable>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height={140} alt={name} />
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row justify="space-between" align="center">
            <Text transform="capitalize"
            >{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
