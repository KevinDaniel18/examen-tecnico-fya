"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, List, LogOut, LogIn, User } from "lucide-react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    if (path === "/credits") {
      return pathname === "/credits";
    }

    return pathname.startsWith(path);
  };

  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => router.push("/")}
            >
              Sistema de Créditos
            </h1>
          </div>

          <div className="flex space-x-2">
            <Button
              variant={isActive("/credits") ? "default" : "outline"}
              onClick={() => user && router.push("/credits")}
              disabled={!user}
              style={{ cursor: !user ? "default" : "pointer" }}
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
              onClick={() => user && router.push("/credits/register-credit")}
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
                onClick={() => router.push("/auth/login")}
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

          <div className="flex items-center space-x-3">
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
                ¡Bienvenido! Inicia sesión para continuar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
