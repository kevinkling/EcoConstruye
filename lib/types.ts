// Tipos para el sistema de donaciones de materiales de construcción

export type UserRole = "empresa" | "ong" | "voluntario"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company?: string
  phone?: string
  // Información específica para voluntarios
  vehicle_type?: string
  availability_zones?: string[]
  skills?: string[]
  // Información adicional para voluntarios
  volunteerInfo?: {
    tipoVehiculo: string
    zonas: string[]
    habilidades: string[]
  }
  created_at: string
}

export interface Material {
  id: string
  title: string
  description: string
  category: MaterialCategory
  quantity: number
  unit: string
  condition: MaterialCondition
  images?: string[]
  empresa_id: string
  obra_location: Location
  pickup_schedule: PickupSchedule
  status: MaterialStatus
  created_at: string
  updated_at: string
}

export type MaterialCategory =
  | "demolicion"
  | "ceramicos"
  | "madera"
  | "metal"
  | "concreto"
  | "ladrillos"
  | "tuberia"
  | "electrico"
  | "otros"

export type MaterialCondition = "excelente" | "bueno" | "regular" | "para_reciclaje"

export type MaterialStatus = "disponible" | "reservado" | "entregado" | "cancelado"

export interface Location {
  address: string
  city: string
  coordinates?: {
    lat: number
    lng: number
  }
  contact_person: string
  contact_phone: string
}

export interface PickupSchedule {
  days: string[]
  start_time: string
  end_time: string
  special_instructions?: string
}

export interface Request {
  id: string
  material_id: string
  ong_id: string
  volunteer_id?: string // voluntario asignado para coordinar
  message: string
  status: RequestStatus
  pickup_date?: string // fecha coordinada para recogida
  transport_notes?: string // notas sobre transporte
  created_at: string
  updated_at: string
}

export type RequestStatus =
  | "pendiente"
  | "aprobada"
  | "asignada_voluntario"
  | "en_transporte"
  | "rechazada"
  | "completada"

export interface VolunteerTask {
  id: string
  request_id: string
  volunteer_id: string
  material_id: string
  pickup_location: Location
  delivery_location: Location
  scheduled_date: string
  status: "asignada" | "en_progreso" | "completada" | "cancelada"
  notes?: string
  created_at: string
}
