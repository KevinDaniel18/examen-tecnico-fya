"use client";

import { getCredits } from "@/services/api";
import type { GetCredits } from "@/types/credits";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CreditCard,
  Percent,
  Clock,
  User,
  TrendingUp,
} from "lucide-react";

export default function Credits() {
  const [credits, setCredits] = useState<GetCredits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCredits();
        setCredits(res.data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    })();
  }, []);

  // Calculate summary statistics
  const totalValue = credits.reduce(
    (sum, credit) => sum + credit.creditValue!,
    0
  );
  const averageRate =
    credits.length > 0
      ? credits.reduce((sum, credit) => sum + credit.interestRate!, 0) /
        credits.length
      : 0;

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm animate-bounce">
          <CreditCard className="w-4 h-4" />
          Sistema de Créditos
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Gestión de Créditos
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Consulta y administra todos los créditos registrados en el sistema
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
          <Card className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Total en Créditos
                </span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ${totalValue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Créditos Activos
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {credits.length}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Tasa Promedio
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {averageRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {credits.length === 0 ? (
        <Card className="text-center py-12 animate-in fade-in-0 duration-500">
          <CardContent>
            <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No hay créditos registrados
            </h3>
            <p className="text-muted-foreground">
              Los créditos aparecerán aquí una vez que sean registrados en el
              sistema.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {credits.map((credit, index) => (
            <Card
              key={credit.id}
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary animate-in fade-in-0 slide-in-from-bottom-4 duration-700`}
              style={{ animationDelay: `${index * 100 + 600}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <User className="w-4 h-4" />
                      {credit.clientName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        ID: {credit.clientId}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${credit.creditValue?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Percent className="w-3 h-3" />
                      Tasa de Interés
                    </div>
                    <div className="font-semibold text-green-600">
                      {credit.interestRate}%
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Plazo
                    </div>
                    <div className="font-semibold">
                      {credit.termMonths} meses
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-3 h-3" />
                    Fecha de registro
                  </div>
                  <div className="font-medium">
                    {new Date(credit.createdAt!).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progreso del crédito</span>
                    <span>Activo</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out animate-in slide-in-from-left-full"
                      style={{
                        width: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${index * 100 + 1000}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
