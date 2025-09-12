"use client"

import type { Material } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Package, Eye, Edit, Trash2, Calendar, Send, Navigation } from "lucide-react"
import { LocationMap } from "@/components/location-map"
import { useState } from "react"

interface MaterialCardProps {
  material: Material
  showActions?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (material: Material) => void
}

const categoryLabels: Record<string, string> = {
  demolicion: "Demolición",
  ceramicos: "Cerámicos",
  madera: "Madera",
  metal: "Metal",
  concreto: "Concreto",
  ladrillos: "Ladrillos",
  tuberia: "Tubería",
  electrico: "Eléctrico",
  otros: "Otros",
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  disponible: { label: "Disponible", variant: "default" },
  reservado: { label: "Reservado", variant: "secondary" },
  entregado: { label: "Entregado", variant: "outline" },
  cancelado: { label: "Cancelado", variant: "destructive" },
}

const conditionLabels: Record<string, string> = {
  excelente: "Excelente",
  bueno: "Bueno",
  regular: "Regular",
  para_reciclaje: "Para reciclaje",
}

export function MaterialCard({ material, showActions = false, onEdit, onDelete, onView }: MaterialCardProps) {
  const status = statusLabels[material.status] || statusLabels.disponible
  const [showMap, setShowMap] = useState(false)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
            <CardDescription className="mt-1">
              {categoryLabels[material.category]} • {conditionLabels[material.condition]}
            </CardDescription>
          </div>
          <Badge variant={status.variant} className="ml-2">
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{material.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-gray-400" />
            <span>
              {material.quantity} {material.unit}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="line-clamp-1">
                {material.obra_location.address}, {material.obra_location.city}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowMap(!showMap)} className="h-6 px-2">
              <Navigation className="h-3 w-3" />
            </Button>
          </div>

          {showMap && (
            <div className="mt-2">
              <LocationMap
                address={material.obra_location.address}
                city={material.obra_location.city}
                showSearch={false}
                height="200px"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>
              {material.pickup_schedule.start_time} - {material.pickup_schedule.end_time}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="line-clamp-1">{material.pickup_schedule.days.join(", ")}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t">
          {showActions ? (
            // Actions for empresa dashboard
            <>
              {onView && (
                <Button variant="outline" size="sm" onClick={() => onView(material)}>
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(material.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(material.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            // Action for ONG dashboard
            onView && (
              <Button onClick={() => onView(material)} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Solicitar Material
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}
