import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, X, MapPin, Thermometer } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCities = () => {
  const { favorite, removeFavorite } = useFavorite();
  
  if (!favorite.length) {
    return null;
  }
  
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 px-4 sm:px-0">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
          Favorite Cities
        </h2>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex gap-3 sm:gap-4 pb-4 px-4 sm:px-0 overflow-x-auto">
          {favorite.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

function FavoriteCityTablet({
  name,
  id,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      className="
        group relative flex 
        min-w-[240px] sm:min-w-[280px] md:min-w-[300px]
        w-[240px] sm:w-[280px] md:w-auto
        cursor-pointer flex-col overflow-hidden 
        rounded-xl border border-border/50 
        bg-gradient-to-br from-card to-card/80 
        p-0 shadow-sm 
        transition-all duration-300 
        hover:scale-[1.02] hover:shadow-lg hover:border-border
        active:scale-[0.98] sm:active:scale-[1.02]
        touch-manipulation
      "
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="
          absolute right-2 top-2 z-10 
          h-7 w-7 sm:h-8 sm:w-8
          rounded-full bg-background/80 p-0 
          opacity-100 sm:opacity-0 
          backdrop-blur-sm transition-all duration-200 
          hover:bg-destructive hover:text-destructive-foreground 
          group-hover:opacity-100
          touch-manipulation
        "
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites`);
        }}
      >
        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>

      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 sm:p-4 pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate pr-8">
              {name}
            </h3>
            {weather && (
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {weather.sys.country}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Weather Content */}
      <div className="flex-1 p-3 sm:p-4 pt-2">
        {isLoading ? (
          <div className="flex h-16 sm:h-20 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-blue-500" />
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : weather ? (
          <div className="space-y-2 sm:space-y-3">
            {/* Temperature and Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                    <span className="text-xl sm:text-2xl font-bold text-foreground">
                      {Math.round(weather.main.temp)}°
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize leading-tight">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Weather Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-muted-foreground text-xs">Feels like</p>
                <p className="font-medium text-sm">{Math.round(weather.main.feels_like)}°</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-muted-foreground text-xs">Humidity</p>
                <p className="font-medium text-sm">{weather.main.humidity}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-16 sm:h-20 items-center justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">No data available</p>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default FavoriteCities;
