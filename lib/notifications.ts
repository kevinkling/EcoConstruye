// Sistema de notificaciones para la plataforma

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  data?: any
  read: boolean
  created_at: string
}

export type NotificationType =
  | "new_request"
  | "request_approved"
  | "request_rejected"
  | "material_updated"
  | "material_reserved"
  | "pickup_reminder"
  | "system_message"

// Servicio de notificaciones mock
export class NotificationService {
  private static notifications: Notification[] = [
    {
      id: "1",
      user_id: "1", // empresa
      type: "new_request",
      title: "Nueva solicitud de material",
      message: "Fundación Construir Futuro ha solicitado tus ladrillos de demolición",
      data: { request_id: "1", material_id: "1" },
      read: false,
      created_at: "2024-12-09T15:30:00Z",
    },
    {
      id: "2",
      user_id: "2", // ong
      type: "request_approved",
      title: "Solicitud aprobada",
      message: "Tu solicitud de ladrillos de demolición ha sido aprobada por Constructora ABC",
      data: { request_id: "1", material_id: "1" },
      read: false,
      created_at: "2024-12-09T16:00:00Z",
    },
    {
      id: "3",
      user_id: "2", // ong
      type: "pickup_reminder",
      title: "Recordatorio de recogida",
      message: "Recuerda recoger los ladrillos aprobados antes del viernes",
      data: { material_id: "1" },
      read: true,
      created_at: "2024-12-08T10:00:00Z",
    },
  ]

  static getNotifications(userId: string): Notification[] {
    return this.notifications
      .filter((n) => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  static getUnreadCount(userId: string): number {
    return this.notifications.filter((n) => n.user_id === userId && !n.read).length
  }

  static markAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  static markAllAsRead(userId: string): void {
    this.notifications.filter((n) => n.user_id === userId).forEach((n) => (n.read = true))
  }

  static createNotification(notification: Omit<Notification, "id" | "created_at">): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    this.notifications.unshift(newNotification)
  }

  static deleteNotification(notificationId: string): void {
    const index = this.notifications.findIndex((n) => n.id === notificationId)
    if (index > -1) {
      this.notifications.splice(index, 1)
    }
  }
}
