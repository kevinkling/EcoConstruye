import type { Material, User, Request } from "./types"

// Datos mock para desarrollo
export const mockUsers: User[] = [
  {
    id: "1",
    email: "constructora@ejemplo.com",
    name: "Juan Pérez",
    role: "empresa",
    company: "Constructora ABC",
    phone: "+34 600 123 456",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "ong@ejemplo.com",
    name: "María García",
    role: "ong",
    company: "Fundación Construir Futuro",
    phone: "+34 600 789 012",
    created_at: "2024-01-20T14:30:00Z",
  },
  {
    id: "3",
    email: "voluntario@ejemplo.com",
    name: "Carlos Mendoza",
    role: "voluntario",
    phone: "+34 600 345 678",
    vehicle_type: "furgoneta",
    availability_zones: ["Madrid Centro", "Madrid Norte", "Madrid Sur"],
    skills: ["Transporte", "Coordinación", "Carga/Descarga"],
    volunteerInfo: {
      tipoVehiculo: "Furgoneta",
      zonas: ["Madrid Centro", "Madrid Norte", "Madrid Sur"],
      habilidades: ["Transporte", "Coordinación", "Carga/Descarga"],
    },
    created_at: "2024-01-25T09:15:00Z",
  },
]

export const mockMaterials: Material[] = [
  {
    id: "1",
    title: "Ladrillos de demolición",
    description:
      "Ladrillos en buen estado de demolición de edificio residencial. Aproximadamente 500 unidades disponibles.",
    category: "ladrillos",
    quantity: 500,
    unit: "unidades",
    condition: "bueno",
    images: ["/ladrillos-de-construcci-n-apilados.jpg"],
    empresa_id: "1",
    obra_location: {
      address: "Calle Mayor 123",
      city: "Madrid",
      coordinates: { lat: 40.4168, lng: -3.7038 },
      contact_person: "Carlos Ruiz",
      contact_phone: "+34 600 111 222",
    },
    pickup_schedule: {
      days: ["lunes", "martes", "miércoles", "jueves", "viernes"],
      start_time: "08:00",
      end_time: "17:00",
      special_instructions: "Acceso por la entrada lateral. Traer vehículo de carga.",
    },
    status: "disponible",
    created_at: "2024-12-09T09:00:00Z",
    updated_at: "2024-12-09T09:00:00Z",
  },
  {
    id: "2",
    title: "Vigas de madera",
    description:
      "Vigas de madera maciza de roble, 3 metros de longitud. Ideales para proyectos de construcción sostenible.",
    category: "madera",
    quantity: 15,
    unit: "piezas",
    condition: "excelente",
    images: ["/vigas-de-madera-apiladas-en-obra.jpg"],
    empresa_id: "1",
    obra_location: {
      address: "Avenida de la Construcción 45",
      city: "Barcelona",
      coordinates: { lat: 41.3851, lng: 2.1734 },
      contact_person: "Ana López",
      contact_phone: "+34 600 333 444",
    },
    pickup_schedule: {
      days: ["lunes", "miércoles", "viernes"],
      start_time: "09:00",
      end_time: "16:00",
      special_instructions: "Coordinar con 24h de antelación. Grúa disponible en obra.",
    },
    status: "disponible",
    created_at: "2024-12-08T14:30:00Z",
    updated_at: "2024-12-08T14:30:00Z",
  },
  {
    id: "3",
    title: "Tubería de PVC",
    description: "Tubería de PVC de diferentes diámetros (110mm, 160mm). Sobrante de instalación de saneamiento.",
    category: "tuberia",
    quantity: 200,
    unit: "metros",
    condition: "bueno",
    images: ["/tuber-a-pvc-construcci-n.jpg"],
    empresa_id: "1",
    obra_location: {
      address: "Polígono Industrial Norte, Nave 7",
      city: "Valencia",
      coordinates: { lat: 39.4699, lng: -0.3763 },
      contact_person: "Miguel Torres",
      contact_phone: "+34 600 555 666",
    },
    pickup_schedule: {
      days: ["martes", "jueves"],
      start_time: "10:00",
      end_time: "15:00",
      special_instructions: "Entrada por portón principal. Preguntar por el encargado de obra.",
    },
    status: "disponible",
    created_at: "2024-12-07T11:15:00Z",
    updated_at: "2024-12-07T11:15:00Z",
  },
]

export const mockRequests: Request[] = [
  {
    id: "1",
    material_id: "1",
    ong_id: "2",
    message:
      "Necesitamos estos ladrillos para un proyecto de vivienda social. ¿Podríamos coordinar la recogida para el miércoles?",
    status: "pendiente",
    created_at: "2024-12-09T15:30:00Z",
    updated_at: "2024-12-09T15:30:00Z",
  },
]
