import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Loading } from "@/components";
import { setColorPokemon } from "@/utils/theme";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { title, lower } from "case";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPokemon } from "@/@types/pokemon";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const config = import.meta.env.VITE_BASE_URL;

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading: isLoadingPokemons } = useQuery<IPokemon>(["pokemons", id], async () => {
    const response = await axios.get(config + "/pokemon/" + id);
    return response?.data;
  });
  const { data: species, isLoading: isLoadingSpecies } = useQuery(["species", id], async () => {
    const response = await axios.get(config + "/pokemon-species/" + id);
    return response?.data;
  });

  if (isLoadingPokemons || isLoadingSpecies) {
    return <Loading />;
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: pokemon?.stats.map((item) => {
      return title(item.stat.name);
    }),
    datasets: [
      {
        backgroundColor: setColorPokemon(pokemon?.types[0].type.name),
        data: pokemon?.stats.map((item) => item.base_stat),
      },
    ],
  };

  return (
    <>
      <section style={{ backgroundColor: setColorPokemon(pokemon?.types[0].type.name) }} className="min-h-screen">
        <div className="flex justify-center items-center">
          <Card className="w-1/2 min-h-[500px] p-10 rounded-xl relative my-[10rem]">
            <div className="flex">
              <div className="flex flex-col">
                <div className="text-6xl font-extrabold mt-9 mb-3">{title(pokemon?.name ?? "undefined")}</div>
                <div style={{ backgroundColor: setColorPokemon(pokemon?.types[0].type.name) }} className="text-base my-2 pb-1 px-3 w-fit rounded-lg text-secondary font-extralight">
                  {pokemon?.types[0].type.name}
                </div>
              </div>
              <img className="h-[16rem] absolute -top-[5rem] right-[2rem] " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`} />
            </div>
            <div className="flex w-full justify-between my-5 font-extrabold">
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Weight</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Height</div>
                <div className="text-center">{pokemon?.height}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Category</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
              <div className="flex flex-col">
                <div style={{ color: setColorPokemon(pokemon?.types[0].type.name) }}>Abilities</div>
                <div className="text-center">{pokemon?.weight}</div>
              </div>
            </div>
            <div>{`${lower(species?.flavor_text_entries[0].flavor_text)} ${lower(species?.flavor_text_entries[2].flavor_text)} ${lower(species?.flavor_text_entries[3].flavor_text)}`}</div>
            {/* <div className="mt-5  h-[300px]"> */}
            <div className="mt-10">
              <Bar data={data} options={options} height={150} />
            </div>
            {/* </div> */}
            {/* <Tabs defaultValue="account" className="w-[400px] flex flex-col">
              <TabsList>
                <TabsTrigger value="account">Descrip</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs> */}
            <Icon icon="ion:arrow-back-circle" width={40} className="absolute top-5 left-5 cursor-pointer" onClick={() => navigate("/")} />
          </Card>
        </div>
      </section>
    </>
  );
}
