import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  
  const nextDays = Object.values(dailyForecasts).slice(0, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">
          5-Day Forecasts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day, index) => {
            return (
              <div
                key={day.date}
                className="group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
              >
                {/* Background decoration */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-5 transition-opacity group-hover:opacity-10" />
                
                <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  {/* Date and Weather Description */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-sm shadow-lg">
                      {format(new Date(day.date * 1000), "dd")}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {format(new Date(day.date * 1000), "EEE, MMM d")}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {day.weather.description}
                      </p>
                    </div>
                  </div>

                  {/* Temperature Range */}
                  <div className="flex justify-center md:justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-md">
                        <ArrowDown className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {formatTemp(day.temp_min)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md">
                        <ArrowUp className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-red-600 dark:text-red-400">
                        {formatTemp(day.temp_max)}
                      </span>
                    </div>
                  </div>

                  {/* Weather Stats */}
                  <div className="flex justify-end md:justify-end gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md">
                        <Droplets className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {day.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md">
                        <Wind className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {day.wind}m/s
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 transition-opacity group-hover:opacity-2 rounded-xl" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
