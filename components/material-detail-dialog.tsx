"use client"

import type { Material } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Package, Calendar, User, Phone, Info, Send } from "lucide-react"
import { LocationMap } from "@/components/location-map"

interface MaterialDetailDialogProps {
  material: Material | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRequest?: (material: Material) => void
  showRequestButton?: boolean
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

export function MaterialDetailDialog({
  material,
  open,
  onOpenChange,
  onRequest,
  showRequestButton = true,
}: MaterialDetailDialogProps) {
  if (!material) return null

  const status = statusLabels[material.status] || statusLabels.disponible

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{material.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {categoryLabels[material.category]} • {conditionLabels[material.condition]}
              </DialogDescription>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Descripción
            </h3>
            <p className="text-gray-600">{material.description}</p>
          </div>

          {/* Cantidad */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Cantidad Disponible
            </h3>
            <p className="text-lg font-medium">
              {material.quantity} {material.unit}
            </p>
          </div>

          <Separator />

          {/* Ubicación */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación de la Obra
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium">{material.obra_location.address}</p>
                <p>{material.obra_location.city}</p>
              </div>

              <LocationMap
                address={material.obra_location.address}
                city={material.obra_location.city}
                showSearch={false}
                height="300px"
              />
            </div>
          </div>

          <Separator />

          {/* Horarios */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horarios de Recogida
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{material.pickup_schedule.days.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  {material.pickup_schedule.start_time} - {material.pickup_schedule.end_time}
                </span>
              </div>
              {material.pickup_schedule.special_instructions && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Instrucciones especiales:</strong> {material.pickup_schedule.special_instructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Información de Contacto
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span>{material.obra_location.contact_person}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{material.obra_location.contact_phone}</span>
              </div>
            </div>
          </div>

          {/* Botón de solicitud */}
          {showRequestButton && onRequest && material.status === "disponible" && (
            <div className="pt-4">
              <Button onClick={() => onRequest(material)} className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                Solicitar Este Material
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
