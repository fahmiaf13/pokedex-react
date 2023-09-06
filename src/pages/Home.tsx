import { Card } from "@/components/ui/card";
import { useQuery } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { IPokemon } from "@/@types/pokemon";
import { useNavigate } from "react-router-dom";
import { title } from "case";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components";
import { setColorPokemon } from "@/utils/theme";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";
import { RootState } from "@/redux/store";

const config = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>("");
  const [backToTop, setBackToTop] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const fetchPokemonData = useCallback(async () => {
    const response = await axios.get(nextPageUrl || `${config}/pokemon?offset=0&limit=20`);
    const resPokemons = await Promise.all(
      response?.data.results.map(async (pokemon: { url: string; name: string }) => {
        const pokemonType = await axios.get(pokemon.url);
        return pokemonType.data;
      })
    );
    setPokemons((prevPokemons) => [...prevPokemons, ...resPokemons]);
    setNextPageUrl(response.data.next);
  }, [nextPageUrl]);

  const fetchPokemonByType = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    return response.data;
  };
  const fetchListPokemonByType = useCallback(async () => {
    const response = await axios.get(selectedType);
    const resPokemons = await Promise.all(
      response?.data.pokemon.map(async (item: { pokemon: { name: string; url: string } }) => {
        const pokemonType = await axios.get(item.pokemon.url);
        return pokemonType.data;
      })
    );
    setPokemons(resPokemons);
  }, [selectedType]);

  const { isLoading: PokemonDataLoading } = useQuery(["pokemon"], fetchPokemonData);
  const { data: typesPokemon, isLoading: typesPokemonLoading } = useQuery(["typesPokemon"], fetchPokemonByType);
  const { isLoading: listTypesPokemonLoading } = useQuery(["listTypesPokemon", selectedType], fetchListPokemonByType, { enabled: !!selectedType });

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (nextPageUrl) {
          fetchPokemonData();
        }
      }
      if (window.scrollY > 300) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    };
    if (selectedType) {
      fetchListPokemonByType();
    } else if (selectedType === null) {
      window.location.reload();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPageUrl, fetchPokemonData, fetchListPokemonByType, selectedType]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (PokemonDataLoading || typesPokemonLoading || listTypesPokemonLoading) {
    return <Loading />;
  }

  const filteredListTypes = [{ name: "all", url: null }, ...typesPokemon.results.map((item: any) => item)];

  return (
    <div className="flex flex-col container mx-auto min-h-screen justify-center items-center section">
      <div className="text-3xl  text-center w-9/12 mt-[10rem]">
        <div className="font-extrabold text-4xl">Explore the Vast World of Pokemon With our Pokedex</div>
        <div className="font-extralight text-base mt-3">
          you can delve into the rich and diverse world of Pokemon. Discover all the information you need about hundreds of different Pokemon, from their types and abilities to their statistics. This is your ultimate source for Pokemon
          knowledge!
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 w-8/12 mb-[5rem] mt-[5rem] font-extralight">
        {filteredListTypes.map((item: any) => (
          <Button key={item.name} onClick={() => setSelectedType(item.url)} style={{ backgroundColor: setColorPokemon(item.name) }} className="text-secondary rounded-lg cursor-pointer scale-100 hover:scale-110 duration-500">
            {item.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap w-full justify-center gap-5">
        {pokemons.length === 0 ? (
          <div>Data Tidak Ada</div>
        ) : (
          pokemons.map((item) => {
            return (
              <Card
                key={item.id}
                style={{ backgroundColor: setColorPokemon(item.types[0].type.name), borderColor: setColorPokemon(item.types[0].type.name) }}
                onClick={() => navigate(`/pokemon/${item?.id}`)}
                className="border-2 w-96 h-52 p-5 gap-10 flex items-center cursor-pointer relative duration-500 scale-100 hover:scale-105"
              >
                <div className="w-7/12 flex flex-col">
                  <div className="font-extrabold text-secondary text-xl my-5">{title(item.name)}</div>
                  <div className="font-extrabold absolute top-2 left-4 text-secondary/50">{`#${item.id}`}</div>
                  <div className="flex gap-2 w-full">
                    {item.types.map((color) => {
                      return (
                        <div key={color?.type.name} className="text-center text-sm pb-1 px-5 bg-secondary/20 rounded-full text-secondary ">
                          {color?.type?.name}
                        </div>
                      );
                    })}
                  </div>
                  {favorites.includes(item.id) ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromFavorite(item.id));
                      }}
                      className="mt-3 flex justify-center hover:bg-secondary border-secondary border-2 text-secondary bg-transparent hover:text-primary scale-100 hover:scale-105"
                    >
                      <Icon icon="ic:outline-bookmark-remove" width={24} />
                      <div className="text-sm w-full">Unfavorite</div>
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToFavorite(item.id));
                      }}
                      className="mt-3 flex justify-center bg-secondary border-secondary border-2 text-primary hover:bg-transparent hover:text-secondary scale-100 hover:scale-105"
                    >
                      <Icon icon="ic:round-bookmark-add" width={24} />
                      <div className="text-sm w-full">Favorite</div>
                    </Button>
                  )}
                </div>
                <div className="w-5/12 flex items-center justify-center h-full">
                  <img className="h-full mt-5" src={item.sprites.other.dream_world.front_default ?? "/favicon.svg"} />
                </div>
              </Card>
            );
          })
        )}
      </div>
      <Icon icon="icon-park-solid:up-c" width={36} onClick={scrollToTop} className={`cursor-pointer fixed bottom-10 right-10 ${backToTop ? "visible" : "hidden"} duration-500`}>
        TOP
      </Icon>
    </div>
  );
}
