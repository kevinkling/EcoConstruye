"use client"

import { useState, useEffect } from "react"
import type { User, Material, Request } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Package, UserCheck, Clock, CheckCircle, XCircle, Building2, Heart, Calendar } from "lucide-react"
import { mockUsers, mockMaterials, mockRequests } from "@/lib/mock-data"

interface ActivityItem {
  id: string
  type: "material_created" | "request_sent" | "request_approved" | "request_rejected" | "material_delivered"
  user: User
  material: Material
  request?: Request
  timestamp: string
}

interface ActivityFeedProps {
  user: User
  limit?: number
}

export function ActivityFeed({ user, limit = 10 }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Generar actividades mock basadas en los datos existentes
    const mockActivities: ActivityItem[] = []

    // Actividades de materiales creados
    mockMaterials.forEach((material, index) => {
      const materialUser = mockUsers.find((u) => u.id === material.empresa_id)
      if (materialUser) {
        mockActivities.push({
          id: `material-${material.id}`,
          type: "material_created",
          user: materialUser,
          material,
          timestamp: material.created_at,
        })
      }
    })

    // Actividades de solicitudes
    mockRequests.forEach((request) => {
      const requestUser = mockUsers.find((u) => u.id === request.ong_id)
      const material = mockMaterials.find((m) => m.id === request.material_id)

      if (requestUser && material) {
        mockActivities.push({
          id: `request-${request.id}`,
          type: "request_sent",
          user: requestUser,
          material,
          request,
          timestamp: request.created_at,
        })

        if (request.status === "aprobada") {
          mockActivities.push({
            id: `approved-${request.id}`,
            type: "request_approved",
            user: requestUser,
            material,
            request,
            timestamp: request.updated_at,
          })
        }
      }
    })

    // Ordenar por fecha y limitar
    const sortedActivities = mockActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)

    setActivities(sortedActivities)
  }, [limit])

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "material_created":
        return Package
      case "request_sent":
        return Clock
      case "request_approved":
        return CheckCircle
      case "request_rejected":
        return XCircle
      case "material_delivered":
        return UserCheck
      default:
        return Package
    }
  }

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "material_created":
        return "text-blue-600"
      case "request_sent":
        return "text-orange-600"
      case "request_approved":
        return "text-green-600"
      case "request_rejected":
        return "text-red-600"
      case "material_delivered":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getActivityMessage = (activity: ActivityItem) => {
    switch (activity.type) {
      case "material_created":
        return `${activity.user.company} publicó "${activity.material.title}"`
      case "request_sent":
        return `${activity.user.company} solicitó "${activity.material.title}"`
      case "request_approved":
        return `Solicitud aprobada para "${activity.material.title}"`
      case "request_rejected":
        return `Solicitud rechazada para "${activity.material.title}"`
      case "material_delivered":
        return `Material "${activity.material.title}" entregado`
      default:
        return "Actividad desconocida"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace unos minutos"
    if (diffInHours < 24) return `Hace ${diffInHours}h`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays}d`
    return date.toLocaleDateString("es-ES")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay actividad reciente</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type)
              const iconColor = getActivityColor(activity.type)

              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={
                          activity.user.role === "empresa" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                        }
                      >
                        {activity.user.role === "empresa" ? (
                          <Building2 className="h-4 w-4" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className={`h-4 w-4 ${iconColor}`} />
                      <p className="text-sm font-medium text-gray-900">{getActivityMessage(activity)}</p>
                    </div>
                    <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.material.obra_location.city}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
