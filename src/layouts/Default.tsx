import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components";
import React from "react";

interface IDefaultLayout {
  children: React.ReactNode;
  title?: string;
}

export default function Default({ children, title }: IDefaultLayout) {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title ? `${title} | Pokedex` : "Pokedex"}</title>
      </Helmet>
      <Navbar />
      <div className="px-[2rem] mt-[6rem] md:px-[5rem]">{children}</div>
    </React.Fragment>
  );
}
