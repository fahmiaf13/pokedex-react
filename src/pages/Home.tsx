import { Card } from "@/components/ui/card";
import { useQuery } from "react-query";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const config = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const navigate = useNavigate();

  const { data: pokemons } = useQuery(
    ["pokemons"],
    async () => {
      const resListPokemon = await axios.get(config + "/pokemon?limit=20");
      const resPokemonType = await Promise.all(
        resListPokemon?.data.results.map(async (pokemon: any) => {
          const pokemonType = await axios.get(pokemon.url);
          return pokemonType.data.types.map((item: any) => item.type);
        })
      );
      return { pokemon: resListPokemon?.data.results, types: resPokemonType };
    },
    { refetchOnMount: true }
  );

  console.log(pokemons?.types[0].map((type: any) => type));

  return (
    <div className="flex flex-col container mx-auto min-h-screen justify-center items-center">
      <div className="font-extrabold text-3xl my-5">Pokemon</div>
      <div className="flex flex-wrap w-full justify-center gap-3">
        {pokemons?.pokemon.map((item: any, index: number) => (
          <Card key={item.name} onClick={() => navigate(`/${item?.name}`)} className="hover:border-2 hover:border-primary border-2 border-transparent p-5 w-64 flex flex-col items-center cursor-pointer">
            <img className="h-36" src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`} />
            <div className="font-extrabold text-xl my-5">{item.name}</div>
            {pokemons?.types[index].map((type: any) => (
              <div key={type.name}>{type.name}</div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
