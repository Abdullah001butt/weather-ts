import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
  name: string;
  id: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const [favorite, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );

  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorite,
    initialData: favorite,
    staleTime: Infinity,
  });
  const addTofavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      const exists = favorite.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorite;
      const newFavorites = [...favorite, newFavorite].slice(0, 10);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorite.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
  return {
    favorite: favoritesQuery.data,
    addTofavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      favorite.some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
