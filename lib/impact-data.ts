export interface ImpactMetrics {
  totalBeneficiaries: number
  projectsHelped: number
  materialsReused: number
  co2Saved: number
  monthlyDonations: Array<{
    month: string
    donations: number
    beneficiaries: number
  }>
  materialDistribution: Array<{
    category: string
    quantity: number
    percentage: number
  }>
  geographicImpact: Array<{
    city: string
    projects: number
    beneficiaries: number
  }>
  beneficiaryTypes: Array<{
    type: string
    count: number
    projects: string[]
  }>
}

export const mockImpactData: ImpactMetrics = {
  totalBeneficiaries: 2847,
  projectsHelped: 156,
  materialsReused: 1250, // toneladas
  co2Saved: 890, // toneladas de CO2
  monthlyDonations: [
    { month: "Ene", donations: 45, beneficiaries: 234 },
    { month: "Feb", donations: 52, beneficiaries: 287 },
    { month: "Mar", donations: 38, beneficiaries: 198 },
    { month: "Abr", donations: 67, beneficiaries: 356 },
    { month: "May", donations: 73, beneficiaries: 412 },
    { month: "Jun", donations: 89, beneficiaries: 498 },
    { month: "Jul", donations: 94, beneficiaries: 523 },
    { month: "Ago", donations: 82, beneficiaries: 467 },
    { month: "Sep", donations: 76, beneficiaries: 398 },
    { month: "Oct", donations: 91, beneficiaries: 512 },
    { month: "Nov", donations: 88, beneficiaries: 489 },
    { month: "Dic", donations: 95, beneficiaries: 567 },
  ],
  materialDistribution: [
    { category: "Ladrillos", quantity: 450, percentage: 36 },
    { category: "Cemento", quantity: 280, percentage: 22 },
    { category: "Madera", quantity: 220, percentage: 18 },
    { category: "Tubería", quantity: 180, percentage: 14 },
    { category: "Otros", quantity: 120, percentage: 10 },
  ],
  geographicImpact: [
    { city: "Buenos Aires", projects: 45, beneficiaries: 892 },
    { city: "Córdoba", projects: 32, beneficiaries: 567 },
    { city: "Rosario", projects: 28, beneficiaries: 445 },
    { city: "Mendoza", projects: 22, beneficiaries: 334 },
    { city: "La Plata", projects: 18, beneficiaries: 289 },
    { city: "Tucumán", projects: 11, beneficiaries: 320 },
  ],
  beneficiaryTypes: [
    {
      type: "Viviendas Sociales",
      count: 1245,
      projects: ["Casa para Todos", "Techo Propio", "Hábitat Solidario"],
    },
    {
      type: "Escuelas Rurales",
      count: 678,
      projects: ["Aulas Dignas", "Educación Rural", "Escuelas del Futuro"],
    },
    {
      type: "Centros Comunitarios",
      count: 534,
      projects: ["Centros Barriales", "Espacios Comunitarios", "Unidos por el Barrio"],
    },
    {
      type: "Comedores Populares",
      count: 390,
      projects: ["Alimentar con Amor", "Mesa Solidaria", "Comedor del Pueblo"],
    },
  ],
}
