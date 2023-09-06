import { IPokemon } from "@/@types/pokemon";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { EmptyAnimation, ErrorAnimation, Loading } from "@/components";
import { Card } from "@/components/ui/card";
import { setColorPokemon } from "@/utils/theme";
import { title } from "case";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addToFavorite, removeFromFavorite } from "@/redux/favoriteSlice";

const config = import.meta.env.VITE_BASE_URL;

export default function PokemonFavorite() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPokemonData = async () => {
    const response = await Promise.all(
      favorites.map(async (item) => {
        const resPokemon = await axios.get(config + "/pokemon/" + item.toString());
        return resPokemon.data;
      })
    );
    setPokemons(response);
  };
  const { isLoading, isError } = useQuery(["pokemons"], fetchPokemonData);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorAnimation />;
  }

  return (
    <div className="flex flex-col container mx-auto min-h-screen items-center section">
      <div className="font-extrabold text-3xl my-5">My Favorite Pokemon</div>
      <div className="flex flex-wrap w-full justify-center gap-3">
        {pokemons.length === 0 ? (
          <div className="flex flex-col items-center">
            <EmptyAnimation />
            <div className="text-xl">Favourite list currently empty</div>
          </div>
        ) : (
          pokemons.map((item) => {
            return (
              <Card
                key={item.id}
                style={{ backgroundColor: setColorPokemon(item.types[0].type.name), borderColor: setColorPokemon(item.types[0].type.name) }}
                onClick={() => navigate(`/pokemon/${item?.id}`)}
                className="border-2 w-96 h-52 p-5 gap-10 flex items-center cursor-pointer relative duration-500"
              >
                <div className="w-7/12 flex flex-col">
                  <div className="font-extrabold text-secondary text-xl my-5">{title(item.name)}</div>
                  <div className="font-extrabold absolute top-2 left-4 text-secondary/50">{`#${item.id}`}</div>
                  <div className="flex gap-2 w-full">
                    {item.types.map((color) => {
                      return (
                        <div key={color?.slot} className="text-center text-sm pb-1 px-5 bg-secondary/20 rounded-full text-secondary ">
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
                        window.location.reload();
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
                  <img className="h-full mt-5" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} />
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
