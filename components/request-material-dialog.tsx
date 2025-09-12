"use client"

import type React from "react"

import { useState } from "react"
import type { Material } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Package, Calendar, Phone, User } from "lucide-react"

interface RequestMaterialDialogProps {
  material: Material
  open: boolean
  onClose: () => void
  onSubmit: (materialId: string, message: string) => void
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

const conditionLabels: Record<string, string> = {
  excelente: "Excelente",
  bueno: "Bueno",
  regular: "Regular",
  para_reciclaje: "Para reciclaje",
}

export function RequestMaterialDialog({ material, open, onClose, onSubmit }: RequestMaterialDialogProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      await onSubmit(material.id, message)
      setMessage("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar Material</DialogTitle>
          <DialogDescription>
            Envía una solicitud para este material. La empresa constructora revisará tu petición.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Material Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{material.title}</h3>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{categoryLabels[material.category]}</Badge>
                <Badge variant="secondary">{conditionLabels[material.condition]}</Badge>
              </div>
            </div>

            <p className="text-gray-600">{material.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Cantidad:</strong> {material.quantity} {material.unit}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Ubicación:</strong> {material.obra_location.address}, {material.obra_location.city}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Contacto:</strong> {material.obra_location.contact_person}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Teléfono:</strong> {material.obra_location.contact_phone}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Horario:</strong> {material.pickup_schedule.start_time} -{" "}
                    {material.pickup_schedule.end_time}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>
                    <strong>Días:</strong> {material.pickup_schedule.days.join(", ")}
                  </span>
                </div>

                {material.pickup_schedule.special_instructions && (
                  <div className="text-sm">
                    <strong>Instrucciones especiales:</strong>
                    <p className="text-gray-600 mt-1">{material.pickup_schedule.special_instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Request Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje de solicitud *</Label>
              <Textarea
                id="message"
                placeholder="Explica por qué necesitas este material, para qué proyecto lo usarás, cuándo podrías recogerlo, etc."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500">
                Incluye información sobre tu proyecto, cuándo necesitas el material y cualquier detalle relevante.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading || !message.trim()} className="flex-1">
                {loading ? "Enviando Solicitud..." : "Enviar Solicitud"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
