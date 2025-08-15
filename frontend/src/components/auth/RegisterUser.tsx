"use client";

import { createUser } from "@/services/api";
import React, { useState } from "react";
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
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { AxiosError } from "axios";

export default function RegisterUser() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (error) setError("");
    if (success) setSuccess("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (data.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await createUser(data);
      setSuccess("¡Cuenta creada exitosamente! Ya puedes iniciar sesión.");
      setData({ name: "", email: "", password: "" });
    } catch (err) {
      let message = "Error al crear la cuenta. Inténtalo de nuevo.";

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      }

      console.error(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-700 delay-200">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Crear Cuenta
              </CardTitle>
              <CardDescription className="text-gray-600">
                Únete al sistema de créditos
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-400">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInput}
                  placeholder="Tu nombre completo"
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-2 duration-500 delay-500">
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
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-2 duration-500 delay-600">
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
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-700 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 animate-in fade-in-0 duration-500 delay-800">
          <p className="text-sm text-gray-500">
            Sistema de Gestión de Créditos v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
