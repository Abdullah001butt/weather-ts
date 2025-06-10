import type { ForecastData } from "@/api/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { format } from "date-fns";
import { Thermometer, Clock } from "lucide-react";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    fullTime: format(new Date(item.dt * 1000), "h:mm a"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  const maxTemp = Math.max(...chartData.map(d => d.temp));
  const minTemp = Math.min(...chartData.map(d => d.temp));

  return (
    <Card className="flex-1 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Today's Temperature
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Next 8 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-medium">↑ {maxTemp}°</span>
            <span className="text-blue-500 font-medium">↓ {minTemp}°</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="feelsLikeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6b7280' }}
                dy={10}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                tick={{ fill: '#6b7280' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-card text-card-foreground backdrop-blur-sm p-4 shadow-2xl">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">
                            {data.fullTime}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 font-medium mb-1">
                              Temperature
                            </span>
                            <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-1">
                              Feels Like
                            </span>
                            <span className="text-xl font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              {/* Background area for temperature */}
              <Area
                type="monotone"
                dataKey="temp"
                stroke="none"
                fill="url(#tempGradient)"
              />
              
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ 
                  fill: '#3b82f6', 
                  strokeWidth: 2, 
                  stroke: '#ffffff',
                  r: 4,
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: '#3b82f6',
                  strokeWidth: 2,
                  fill: '#ffffff',
                  className: 'drop-shadow-lg'
                }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={{ 
                  fill: '#64748b', 
                  strokeWidth: 2, 
                  stroke: '#ffffff',
                  r: 3,
                }}
                activeDot={{ 
                  r: 5, 
                  stroke: '#64748b',
                  strokeWidth: 2,
                  fill: '#ffffff'
                }}
                strokeDasharray="8 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Actual Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-500 rounded" style={{ backgroundImage: 'repeating-linear-gradient(to right, #64748b 0, #64748b 4px, transparent 4px, transparent 8px)' }}></div>
            <span className="text-sm text-muted-foreground">Feels Like</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
