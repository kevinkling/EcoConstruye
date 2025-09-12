"use client"
import { useState } from "react"
import { AuthService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { MaterialCard } from "@/components/material-card"
import { Truck, MapPin, Clock, CheckCircle, Package, Users, Calendar, Phone } from "lucide-react"
import { mockMaterials, mockRequests } from "@/lib/mock-data"

export default function VoluntarioDashboard() {
  const user = AuthService.getCurrentUser()
  const [activeTab, setActiveTab] = useState("disponibles")

  // Filtrar materiales disponibles en las zonas del voluntario
  const materialesDisponibles = mockMaterials.filter(
    (material) => material.status === "disponible" && user?.volunteerInfo?.zonas?.includes(material.location.city),
  )

  // Solicitudes asignadas al voluntario
  const solicitudesAsignadas = mockRequests.filter((request) => request.volunteerId === user?.id)

  const stats = [
    {
      title: "Entregas Completadas",
      value: "23",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Entregas Pendientes",
      value: solicitudesAsignadas.length.toString(),
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Materiales Disponibles",
      value: materialesDisponibles.length.toString(),
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Horas Voluntariado",
      value: "156",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Hola, {user?.name}! 👋</h1>
          <p className="text-gray-600">Gestiona tus entregas y ayuda a conectar materiales con quienes los necesitan</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información del Voluntario */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Tu Perfil de Voluntario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tipo de Vehículo</p>
                <Badge variant="outline">{user?.volunteerInfo?.tipoVehiculo}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Zonas de Cobertura</p>
                <div className="flex flex-wrap gap-1">
                  {user?.volunteerInfo?.zonas?.map((zona, index) => (
                    <Badge key={index} variant="secondary">
                      {zona}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Habilidades</p>
                <div className="flex flex-wrap gap-1">
                  {user?.volunteerInfo?.habilidades?.map((habilidad, index) => (
                    <Badge key={index} variant="outline">
                      {habilidad}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disponibles">Materiales Disponibles</TabsTrigger>
            <TabsTrigger value="asignadas">Entregas Asignadas</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="disponibles" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Materiales en tu Zona</h2>
              <Badge variant="outline">{materialesDisponibles.length} disponibles</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materialesDisponibles.map((material) => (
                <MaterialCard key={material.id} material={material} showVolunteerActions={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="asignadas" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Entregas Asignadas</h2>
              <Badge variant="outline">{solicitudesAsignadas.length} pendientes</Badge>
            </div>

            <div className="space-y-4">
              {solicitudesAsignadas.map((solicitud) => {
                const material = mockMaterials.find((m) => m.id === solicitud.materialId)
                return (
                  <Card key={solicitud.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{material?.name}</h3>
                          <p className="text-gray-600">{material?.description}</p>
                        </div>
                        <Badge variant={solicitud.status === "aprobada" ? "default" : "secondary"}>
                          {solicitud.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {material?.location.address}, {material?.location.city}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          Fecha solicitada: {new Date(solicitud.requestDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          Contacto ONG: {solicitud.contactInfo}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Truck className="h-4 w-4" />
                          Cantidad: {material?.quantity} {material?.unit}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Marcar como Entregado
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Phone className="h-4 w-4" />
                          Contactar ONG
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-6">
            <h2 className="text-xl font-semibold">Historial de Entregas</h2>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Ladrillos de construcción</h3>
                        <p className="text-sm text-gray-600">Entregado a Fundación Hábitat</p>
                        <p className="text-sm text-gray-500">15 de Noviembre, 2024</p>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Completado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
