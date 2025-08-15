"use client";

import { createCredit } from "@/services/api";
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
import {
  Loader2,
  CreditCard,
  User,
  Hash,
  DollarSign,
  Percent,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function CreateCredit() {
  const [form, setForm] = useState({
    clientName: "",
    clientId: "",
    creditValue: "",
    interestRate: "",
    termMonths: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await createCredit({
        ...form,
        creditValue: Number(form.creditValue),
        interestRate: Number(form.interestRate),
        termMonths: Number(form.termMonths),
      });
      setMessage("¡Crédito registrado exitosamente y correo enviado!");
      setMessageType("success");
      setForm({
        clientName: "",
        clientId: "",
        creditValue: "",
        interestRate: "",
        termMonths: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        "Error al registrar el crédito. Por favor, intenta nuevamente."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Registrar Crédito
          </h1>
          <p className="text-gray-600 text-lg">
            Complete la información del cliente para registrar un nuevo crédito
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">
              Información del Crédito
            </CardTitle>
            <CardDescription className="text-gray-600">
              Ingrese todos los datos requeridos para procesar el crédito
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-300">
                <Label
                  htmlFor="clientName"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  Nombre del Cliente
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  placeholder="Ingrese el nombre completo"
                  value={form.clientName}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-400">
                <Label
                  htmlFor="clientId"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Hash className="w-4 h-4 text-blue-600" />
                  Cédula o ID
                </Label>
                <Input
                  id="clientId"
                  name="clientId"
                  placeholder="Número de identificación"
                  value={form.clientId.trim()}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-500">
                <Label
                  htmlFor="creditValue"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Valor del Crédito
                </Label>
                <Input
                  id="creditValue"
                  name="creditValue"
                  type="number"
                  placeholder="0.00"
                  value={form.creditValue}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-600">
                <Label
                  htmlFor="interestRate"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Percent className="w-4 h-4 text-orange-600" />
                  Tasa de Interés (%)
                </Label>
                <Input
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  placeholder="0.00"
                  value={form.interestRate}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-700">
                <Label
                  htmlFor="termMonths"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Plazo en Meses
                </Label>
                <Input
                  id="termMonths"
                  name="termMonths"
                  type="number"
                  placeholder="12"
                  value={form.termMonths}
                  onChange={handleChange}
                  required
                  min="1"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                />
              </div>

              <div className="pt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-800">
                <Button
                  type="submit"
                  disabled={loading}
                  style={
                    loading ? { cursor: "default" } : { cursor: "pointer" }
                  }
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Registrando Crédito...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Registrar Crédito
                    </>
                  )}
                </Button>
              </div>
            </form>

            {message && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                <Alert
                  className={`border-l-4 ${
                    messageType === "success"
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-red-500 bg-red-50 text-red-800"
                  }`}
                >
                  {messageType === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className="font-medium">
                    {message}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 animate-in fade-in-0 duration-700 delay-1000">
          <p className="text-gray-500 text-sm">
            Todos los campos son obligatorios para procesar el crédito
          </p>
        </div>
      </div>
    </div>
  );
}
