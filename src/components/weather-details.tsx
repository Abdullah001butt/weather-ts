import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "hh:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      gradient: "from-orange-400 to-rose-400",
      iconColor: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      gradient: "from-blue-400 to-purple-500",
      iconColor: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      gradient: "from-green-400 to-emerald-500",
      iconColor: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      gradient: "from-yellow-400 to-amber-500",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-300"
              >
                {/* Background decoration */}
                <div className={`absolute -right-2 -top-2 h-16 w-16 rounded-full bg-gradient-to-br ${detail.gradient} opacity-5 transition-opacity group-hover:opacity-10`} />
                
                <div className="relative flex items-center gap-4">
                  {/* Icon container */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${detail.gradient} shadow-lg`}>
                    <detail.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      {detail.title}
                    </p>
                    <p className="text-lg font-bold">
                      {detail.value}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${detail.gradient} opacity-0 transition-opacity group-hover:opacity-2 rounded-xl`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
