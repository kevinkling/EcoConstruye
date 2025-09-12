"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Recycle, Building2, Heart, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { UserRole } from "@/lib/types"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    company: "",
    phone: "",
    role: "" as UserRole | "",
    vehicle_type: "",
    availability_zones: [] as string[],
    skills: [] as string[],
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "empresa" || type === "ong" || type === "voluntario") {
      setFormData((prev) => {
        // Only update if the role is different to prevent unnecessary re-renders
        if (prev.role !== type) {
          return { ...prev, role: type }
        }
        return prev
      })
    }
  }, [searchParams.get("type")]) // Use the actual value as dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      console.log("Registrando usuario:", formData)

      setTimeout(() => {
        router.push("/login?registered=true")
      }, 1000)
    } catch (err) {
      setError("Error al registrar usuario. Inténtalo de nuevo.")
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: "availability_zones" | "skills", value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Recycle className="h-8 w-8 text-green-600" />
            EcoConstruye
          </Link>
          <p className="text-gray-600 mt-2">Crea tu cuenta</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {formData.role === "empresa" && <Building2 className="h-5 w-5 text-blue-600" />}
              {formData.role === "ong" && <Heart className="h-5 w-5 text-green-600" />}
              {formData.role === "voluntario" && <Users className="h-5 w-5 text-purple-600" />}
              Registro
              {formData.role === "empresa" && " - Empresa Constructora"}
              {formData.role === "ong" && " - ONG"}
              {formData.role === "voluntario" && " - Voluntario"}
            </CardTitle>
            <CardDescription>
              {formData.role === "empresa"
                ? "Registra tu empresa para donar materiales de construcción"
                : formData.role === "ong"
                  ? "Registra tu organización para recibir materiales"
                  : formData.role === "voluntario"
                    ? "Únete como voluntario para ayudar con la logística y coordinación"
                    : "Completa el formulario para crear tu cuenta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!formData.role && (
                <div className="space-y-2">
                  <Label>Tipo de Organización</Label>
                  <Select onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de organización" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empresa">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          Empresa Constructora
                        </div>
                      </SelectItem>
                      <SelectItem value="ong">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-green-600" />
                          ONG / Organización Social
                        </div>
                      </SelectItem>
                      <SelectItem value="voluntario">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          Voluntario / Red Comunitaria
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="+34 600 123 456"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              {formData.role !== "voluntario" && (
                <div className="space-y-2">
                  <Label htmlFor="company">
                    {formData.role === "empresa" ? "Nombre de la Empresa" : "Nombre de la Organización"}
                  </Label>
                  <Input
                    id="company"
                    placeholder={formData.role === "empresa" ? "Constructora ABC" : "Fundación Construir Futuro"}
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                  />
                </div>
              )}

              {formData.role === "voluntario" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle_type">Tipo de Vehículo Disponible</Label>
                    <Select onValueChange={(value) => handleInputChange("vehicle_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu vehículo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coche">Coche</SelectItem>
                        <SelectItem value="furgoneta">Furgoneta</SelectItem>
                        <SelectItem value="camion">Camión</SelectItem>
                        <SelectItem value="ninguno">No tengo vehículo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Zonas de Disponibilidad</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Madrid Centro",
                        "Madrid Norte",
                        "Madrid Sur",
                        "Madrid Este",
                        "Madrid Oeste",
                        "Otras ciudades",
                      ].map((zone) => (
                        <div key={zone} className="flex items-center space-x-2">
                          <Checkbox
                            id={zone}
                            checked={formData.availability_zones.includes(zone)}
                            onCheckedChange={(checked) =>
                              handleMultiSelect("availability_zones", zone, checked as boolean)
                            }
                          />
                          <Label htmlFor={zone} className="text-sm">
                            {zone}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Habilidades y Servicios</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Transporte", "Coordinación", "Carga/Descarga", "Clasificación", "Comunicación", "Gestión"].map(
                        (skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={formData.skills.includes(skill)}
                              onCheckedChange={(checked) => handleMultiSelect("skills", skill, checked as boolean)}
                            />
                            <Label htmlFor={skill} className="text-sm">
                              {skill}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading || !formData.role}>
                {loading ? "Registrando..." : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
