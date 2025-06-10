import React, { useState, useCallback, memo } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Clock, Loader2, Search, XCircle, MapPin, History, Sparkles } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";

const CitySearch = memo(() => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();
  const navigate = useNavigate();

  const handleSelect = useCallback((cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    
    addToHistory.mutate({
      query,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      country,
    });
    
    setOpen(false);
    setQuery("");
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  }, [query, addToHistory, navigate]);

  const handleClearHistory = useCallback(() => {
    clearHistory.mutate();
  }, [clearHistory]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setQuery("");
    }
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="group relative w-full justify-start text-sm text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:border-primary/20 hover:text-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4 transition-colors group-hover:text-primary" />
        <span className="flex-1 text-left">Search Cities...</span>
        <div className="hidden sm:flex items-center gap-1 ml-auto">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <div className="border-b border-border/50">
          <CommandInput
            placeholder="Search for cities, countries, or regions..."
            value={query}
            onValueChange={setQuery}
            className="border-0 focus:ring-0 text-base"
          />
        </div>

        <CommandList className="max-h-[400px]">
          {query.length > 2 && !isLoading && (
            <CommandEmpty className="py-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Search className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No cities found</p>
                <p className="text-xs text-muted-foreground/70">
                  Try searching for a different city or region
                </p>
              </div>
            </CommandEmpty>
          )}

          {/* Recent Searches */}
          {history.length > 0 && (
            <>
              <div className="px-2 py-2">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Recent Searches
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>

              <CommandGroup className="px-2">
                {history.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-muted/80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {location.name}
                        </span>
                        {location.state && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground truncate">
                              {location.state}
                            </span>
                          </>
                        )}
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {location.country}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator className="my-2" />
            </>
          )}

          {/* Search Results */}
          {locations && locations.length > 0 && (
            <>
              <div className="px-2 py-2">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    Search Results
                  </p>
                </div>
              </div>

              <CommandGroup className="px-2">
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Searching...</p>
                    </div>
                  </div>
                )}
                
                {locations.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-muted/80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                      <MapPin className="h-4 w-4 text-green-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {location.name}
                        </span>
                        {location.state && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground truncate">
                              {location.state}
                            </span>
                          </>
                        )}
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {location.country}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        Click to view weather details
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Empty State for Initial Load */}
          {!query && history.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-foreground">
                Search for cities
              </h3>
              <p className="mt-2 text-xs text-muted-foreground text-center max-w-[200px]">
                Start typing to search for cities and view their weather information
              </p>
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
});

CitySearch.displayName = "CitySearch";
export default CitySearch;
