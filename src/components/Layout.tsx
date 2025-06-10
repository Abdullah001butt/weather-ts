import React from "react";
import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Main Brand */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Made By Abdullah
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-md">
                Your trusted weather companion for accurate forecasts and insights
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-500 to-pink-500 rounded-full"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-xs sm:text-sm font-medium">
                  © {new Date().getFullYear()}
                </span>
                <span className="hidden sm:inline text-xs">•</span>
                <span className="hidden sm:inline text-xs">
                  All rights reserved
                </span>
              </div>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full"></div>
            </div>

            {/* Additional Links/Info (Optional) */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <span className="hover:text-purple-400 transition-colors cursor-pointer">
                Weather Data
              </span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-purple-400 transition-colors cursor-pointer">
                Privacy
              </span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-purple-400 transition-colors cursor-pointer">
                Terms
              </span>
            </div>

            {/* Weather Attribution */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Weather data provided by OpenWeatherMap
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
