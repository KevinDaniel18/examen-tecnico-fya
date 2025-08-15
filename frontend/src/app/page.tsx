"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, LogIn, BarChart3, Eye, FilePlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/credits");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse mt-10">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
              <CreditCard className="w-16 h-16 text-blue-600 animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
            ¡Gestiona tus Créditos!
          </h2>
          <p className="text-lg text-gray-600 mb-6 animate-fade-in animation-delay-200">
            Inicia sesión para acceder a todas las funcionalidades del sistema
            de créditos.
          </p>
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-500 animate-fade-in animation-delay-400">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="text-center">
                Ver todos tus créditos registrados
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-green-600" />
              <span className="text-center">Registrar nuevos créditos</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-center">
                Gestionar tu información financiera
              </span>
            </div>
          </div>

          <Button
            onClick={() => router.push("/auth/login")}
            className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in animation-delay-600 mb-10 cursor-pointer"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Iniciar Sesión Ahora
          </Button>
        </div>
      </div>
    </main>
  );
}
