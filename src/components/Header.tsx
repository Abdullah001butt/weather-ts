import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-provider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 sm:py-3">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 touch-manipulation"
        >
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="klimate Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Right Section - Search and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 justify-end max-w-md">
          {/* Search Component */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
            <CitySearch />
          </div>

          {/* Theme Toggle Button */}
          <div 
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
              flex items-center justify-center
              h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11
              cursor-pointer rounded-full
              transition-all duration-300 ease-in-out
              hover:bg-muted/80 active:bg-muted
              border border-border/50 hover:border-border
              touch-manipulation
              ${isDark ? "rotate-180" : "rotate-0"}
            `}
            role="button"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTheme(isDark ? "light" : "dark");
              }
            }}
          >
            {isDark ? (
              <Sun className="
                h-4 w-4 sm:h-5 sm:w-5 
                text-yellow-500 hover:text-yellow-400 
                rotate-0 transition-all duration-300
                drop-shadow-sm
              " />
            ) : (
              <Moon className="
                h-4 w-4 sm:h-5 sm:w-5 
                text-blue-500 hover:text-blue-400 
                rotate-0 transition-all duration-300
                drop-shadow-sm
              " />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
