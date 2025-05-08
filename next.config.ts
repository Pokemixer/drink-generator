import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/**')],
  },
  output: 'export',
};

export default withFlowbiteReact(nextConfig);