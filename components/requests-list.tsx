"use client"

import type { Request, Material, RequestStatus } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Check, X, Clock, MessageSquare } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

interface RequestsListProps {
  requests: Request[]
  materials: Material[]
  onUpdateRequest: (requestId: string, status: RequestStatus) => void
}

const statusLabels: Record<
  RequestStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pendiente: { label: "Pendiente", variant: "secondary" },
  aprobada: { label: "Aprobada", variant: "default" },
  rechazada: { label: "Rechazada", variant: "destructive" },
  completada: { label: "Completada", variant: "outline" },
}

export function RequestsList({ requests, materials, onUpdateRequest }: RequestsListProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay solicitudes</h3>
          <p className="text-gray-600 text-center">
            Cuando las ONGs soliciten tus materiales, aparecerán aquí para que puedas revisarlas
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const material = materials.find((m) => m.id === request.material_id)
        const ong = mockUsers.find((u) => u.id === request.ong_id)
        const status = statusLabels[request.status]

        if (!material || !ong) return null

        return (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 text-green-600">
                      {ong.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{ong.company}</CardTitle>
                    <CardDescription>Solicita: {material.title}</CardDescription>
                  </div>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Mensaje de la solicitud:</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    Solicitado el{" "}
                    {new Date(request.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {request.status === "pendiente" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => onUpdateRequest(request.id, "aprobada")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Aprobar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onUpdateRequest(request.id, "rechazada")}>
                      <X className="h-4 w-4 mr-2" />
                      Rechazar
                    </Button>
                  </div>
                )}

                {request.status === "aprobada" && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 text-sm">
                      ✅ Solicitud aprobada. La ONG puede coordinar la recogida contactando a{" "}
                      {material.obra_location.contact_person} al {material.obra_location.contact_phone}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
