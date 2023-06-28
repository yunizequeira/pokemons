import { useTheme, Text, Spacer, CssBaseline, Container } from '@nextui-org/react';
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();
  
  return (
    <div
      style={{
        display: "flex",
        gap:"0",
        width: "100%",
        alignItems: "center",
        padding: " 0 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        width={70}
        height={70}
        alt="logo"
      />
      <NextLink href="/" passHref>
        <Container display='flex' alignItems='center' >
          <Text color="red" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon!
          </Text>
        </Container>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <div>
          <Text color="white" h3>
            Favorites
          </Text>
        </div>
      </NextLink>
    </div>
  );
};
