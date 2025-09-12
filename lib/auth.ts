import type { User } from "./types"
import { mockUsers } from "./mock-data"

// Sistema de autenticación mock
export class AuthService {
  private static currentUser: User | null = null

  static getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
      }
    }
    return this.currentUser
  }

  static login(email: string, password: string): User | null {
    // Mock login - en producción esto sería una llamada a la API
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      this.currentUser = user
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(user))
      }
      return user
    }
    return null
  }

  static logout(): void {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static isEmpresa(): boolean {
    const user = this.getCurrentUser()
    return user?.role === "empresa"
  }

  static isONG(): boolean {
    const user = this.getCurrentUser()
    return user?.role === "ong"
  }

  static isVoluntario(): boolean {
    const user = this.getCurrentUser()
    return user?.role === "voluntario"
  }
}
