import React from "react";
import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Droplets, Wind, MapPin, Eye, Gauge } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, humidity, temp_min, temp_max, pressure },
    wind: { speed },
    visibility,
  } = data;
  
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {/* Location Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-end gap-1">
                  <h2 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {locationName?.name}
                  </h2>
                  {locationName?.state && (
                    <span className="text-muted-foreground font-medium">
                      , {locationName.state}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-12">
                {locationName?.country}
              </p>
            </div>

            {/* Temperature Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <p className="text-7xl font-bold tracking-tighter bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {formatTemp(temp)}
                </p>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30"></div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-3 text-sm font-medium">
                  <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400">
                    <ArrowDown className="h-3 w-3" />
                    {formatTemp(temp_min)}
                  </div>
                  <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-red-600 dark:text-red-400">
                    <ArrowUp className="h-3 w-3" />
                    {formatTemp(temp_max)}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Droplets className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Wind className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{speed} m/s</p>
                </div>
              </div>

              {pressure && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Gauge className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Pressure</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{pressure} hPa</p>
                  </div>
                </div>
              )}

              {visibility && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Eye className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Visibility</p>
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{Math.round(visibility / 1000)} km</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weather Icon Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                    alt={CurrentWeather.description}
                    className="h-32 w-32 object-contain drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full"></div>
                </div>
                <div className="text-center mt-4 space-y-1">
                  <p className="text-lg font-bold capitalize tracking-wide">
                    {CurrentWeather.description}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {CurrentWeather.main}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
