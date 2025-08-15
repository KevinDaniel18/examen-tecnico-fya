"use client";

import { useAuth } from "@/context/AuthContext";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginUser() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      await login(data);
    } catch (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-700 delay-200">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-gray-600">
                Accede a tu sistema de créditos
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-400">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInput}
                  placeholder="tu@email.com"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-2 duration-500 delay-500">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-600 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => router.push("/auth/register")}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 animate-in fade-in-0 duration-500 delay-700">
          <p className="text-sm text-gray-500">
            Sistema de Gestión de Créditos v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
