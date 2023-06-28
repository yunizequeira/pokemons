import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../Navbar";

interface Children{
    children:ReactNode;
    title?:string;
}

export const Layout= ({children,title}:Children) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="autor" content="Yuni Moreno"/>
        <meta  name="description" content={`Informacion sobre el pokemon ${title}`}/>
        <meta  name="keywords" content={` ${title}, pokemon, pokedex`}/>
      </Head>
      
      <Navbar/>

      <main style={{
        padding:'10px 20px'
      }}>
        {children}
      </main>
    </>
  );
}


