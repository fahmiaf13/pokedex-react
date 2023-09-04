import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const config = import.meta.env.VITE_BASE_URL;

export default function PokemonDetail() {
  const { id } = useParams();

  const { data: pokemons, isLoading: isLoadingPokemons } = useQuery(["pokemons", id], async () => {
    const response = await axios.get(config + "/pokemon/" + id);
    return response?.data;
  });

  if (isLoadingPokemons) {
    return <div>loading</div>;
  }

  return <div>{pokemons?.name}</div>;
}
