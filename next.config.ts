import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/**'), new URL('https://img.apileague.com/recipes/**'), new URL("https://thespicyapron.com/**"), new URL("https://opendrinks.io/img/**"), new URL("https://www.thecocktaildb.com/images/media/**")],
  }
};

export default withFlowbiteReact(nextConfig);