"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Plus,
  List,
  LogOut,
  LogIn,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    if (path === "/credits") {
      return pathname === "/credits";
    }

    return pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <span className="hidden sm:block">Sistema de Créditos</span>
              <span className="block sm:hidden">Créditos</span>
            </h1>
          </div>

          <div className="hidden md:flex space-x-2">
            <Button
              variant={isActive("/credits") ? "default" : "outline"}
              onClick={() => user && handleNavigation("/credits")}
              disabled={!user}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                isActive("/credits")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : user
                  ? "hover:bg-gray-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Ver Créditos</span>
            </Button>

            <Button
              variant={
                isActive("/credits/register-credit") ? "default" : "outline"
              }
              onClick={() =>
                user && handleNavigation("/credits/register-credit")
              }
              disabled={!user}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                isActive("/credits/register-credit")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : user
                  ? "hover:bg-gray-50 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Crédito</span>
            </Button>

            {!user && (
              <Button
                variant={isActive("/auth/login") ? "default" : "outline"}
                onClick={() => handleNavigation("/auth/login")}
                className={`flex items-center space-x-2 transition-all duration-200 cursor-pointer ${
                  isActive("/auth/login")
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                    : "hover:bg-gray-50"
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </Button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 bg-transparent cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </Button>
              </>
            ) : (
              <div className="text-sm text-gray-500">
                ¡Bienvenido! Inicia sesión
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user && (
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg mb-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                </div>
              )}

              <Button
                variant={isActive("/credits") ? "default" : "ghost"}
                onClick={() => user && handleNavigation("/credits")}
                disabled={!user}
                className={`w-full justify-start space-x-2 ${
                  isActive("/credits")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : user
                    ? "hover:bg-gray-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <List className="w-4 h-4" />
                <span>Ver Créditos</span>
              </Button>

              <Button
                variant={
                  isActive("/credits/register-credit") ? "default" : "ghost"
                }
                onClick={() =>
                  user && handleNavigation("/credits/register-credit")
                }
                disabled={!user}
                className={`w-full justify-start space-x-2 ${
                  isActive("/credits/register-credit")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : user
                    ? "hover:bg-gray-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Crédito</span>
              </Button>

              {!user && (
                <Button
                  variant={isActive("/auth/login") ? "default" : "ghost"}
                  onClick={() => handleNavigation("/auth/login")}
                  className={`w-full justify-start space-x-2 ${
                    isActive("/auth/login")
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </Button>
              )}

              {user && (
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start space-x-2 hover:bg-red-50 hover:text-red-600 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </Button>
                </div>
              )}

              {!user && (
                <div className="px-3 py-2 text-xs text-gray-500 text-center border-t border-gray-200 mt-2 pt-2">
                  ¡Bienvenido! Inicia sesión para continuar
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
