import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
import { darkTheme } from "../themes";
import { FavoritesProvider } from "../context/FavoritesProvider";

function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </FavoritesProvider>
  );
}

export default MyApp;
