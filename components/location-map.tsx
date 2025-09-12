"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface LocationMapProps {
  address: string
  city: string
  onLocationChange?: (location: { address: string; city: string; coordinates?: { lat: number; lng: number } }) => void
  showSearch?: boolean
  height?: string
}

export function LocationMap({
  address,
  city,
  onLocationChange,
  showSearch = true,
  height = "300px",
}: LocationMapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  // Simular coordenadas basadas en la dirección
  useEffect(() => {
    if (address && city) {
      // En un entorno real, aquí usarías una API de geocodificación como Google Maps o OpenStreetMap
      const mockCoordinates = {
        lat: 40.4168 + (Math.random() - 0.5) * 0.1, // Madrid aproximado con variación
        lng: -3.7038 + (Math.random() - 0.5) * 0.1,
      }
      setCoordinates(mockCoordinates)
    }
  }, [address, city])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simular búsqueda de dirección
    setTimeout(() => {
      const parts = searchQuery.split(",")
      const newAddress = parts[0]?.trim() || searchQuery
      const newCity = parts[1]?.trim() || city || "Madrid"

      onLocationChange?.({
        address: newAddress,
        city: newCity,
        coordinates: {
          lat: 40.4168 + (Math.random() - 0.5) * 0.1,
          lng: -3.7038 + (Math.random() - 0.5) * 0.1,
        },
      })

      setSearchQuery("")
      setIsSearching(false)
    }, 1000)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates({ lat: latitude, lng: longitude })

          // En un entorno real, aquí harías geocodificación inversa
          onLocationChange?.({
            address: "Ubicación actual detectada",
            city: "Madrid",
            coordinates: { lat: latitude, lng: longitude },
          })
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error)
        },
      )
    }
  }

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Buscar dirección (ej. Calle Mayor 123, Madrid)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button type="button" variant="outline" onClick={handleSearch} disabled={isSearching}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button type="button" variant="outline" onClick={getCurrentLocation} title="Usar mi ubicación actual">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height }}>
            {/* Mapa simulado */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Grid pattern para simular mapa */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Calles simuladas */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
                <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300 opacity-40"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300 opacity-40"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
              </div>

              {/* Marcador de ubicación */}
              {coordinates && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${50 + (coordinates.lng + 3.7038) * 1000}%`,
                    top: `${50 - (coordinates.lat - 40.4168) * 1000}%`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" fill="currentColor" />
                    <div className="bg-white px-2 py-1 rounded shadow-lg text-xs font-medium mt-1 whitespace-nowrap">
                      {address || "Ubicación"}
                    </div>
                  </div>
                </div>
              )}

              {/* Información de ubicación */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{address || "Dirección no especificada"}</div>
                      <div className="text-gray-600">{city || "Ciudad no especificada"}</div>
                      {coordinates && (
                        <div className="text-xs text-gray-500 mt-1">
                          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
