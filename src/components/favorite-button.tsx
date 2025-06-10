import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addTofavorite, isFavorite, removeFavorite } = useFavorite();
  
  const isCurrentlyFavorite = Boolean(
    isFavorite(data.coord.lat, data.coord.lon)
  );
  
  const isLoading = addTofavorite.isPending || removeFavorite.isPending;
  
  const handleToggleFavorite = () => {
    if (isLoading) return;
    
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`, {
        onSuccess: () => {
          toast.success(`Removed ${data.name} from favorites`);
        },
        onError: () => {
          toast.error(`Failed to remove ${data.name} from favorites`);
        }
      });
    } else {
      addTofavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      }, {
        onSuccess: () => {
          toast.success(`Added ${data.name} to favorites`);
        },
        onError: () => {
          toast.error(`Failed to add ${data.name} to favorites`);
        }
      });
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""} ${
          isLoading ? "animate-pulse" : ""
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
