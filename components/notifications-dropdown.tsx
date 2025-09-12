"use client"

import { useState, useEffect } from "react"
import { NotificationService, type Notification } from "@/lib/notifications"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, CheckCheck, Trash2, Package, UserCheck, XCircle, Clock, AlertCircle } from "lucide-react"

interface NotificationsDropdownProps {
  user: User
}

const notificationIcons: Record<string, any> = {
  new_request: Package,
  request_approved: UserCheck,
  request_rejected: XCircle,
  material_updated: Package,
  material_reserved: Clock,
  pickup_reminder: AlertCircle,
  system_message: Bell,
}

const notificationColors: Record<string, string> = {
  new_request: "text-blue-600",
  request_approved: "text-green-600",
  request_rejected: "text-red-600",
  material_updated: "text-orange-600",
  material_reserved: "text-purple-600",
  pickup_reminder: "text-yellow-600",
  system_message: "text-gray-600",
}

export function NotificationsDropdown({ user }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    loadNotifications()
  }, [user.id])

  const loadNotifications = () => {
    const userNotifications = NotificationService.getNotifications(user.id)
    const unread = NotificationService.getUnreadCount(user.id)
    setNotifications(userNotifications)
    setUnreadCount(unread)
  }

  const handleMarkAsRead = (notificationId: string) => {
    NotificationService.markAsRead(notificationId)
    loadNotifications()
  }

  const handleMarkAllAsRead = () => {
    NotificationService.markAllAsRead(user.id)
    loadNotifications()
  }

  const handleDelete = (notificationId: string) => {
    NotificationService.deleteNotification(notificationId)
    loadNotifications()
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4" />
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            No tienes notificaciones
          </div>
        ) : (
          <ScrollArea className="h-80">
            {notifications.map((notification) => {
              const IconComponent = notificationIcons[notification.type] || Bell
              const iconColor = notificationColors[notification.type] || "text-gray-600"

              return (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3 w-full">
                    <div className={`flex-shrink-0 ${iconColor}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(notification.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(notification.created_at)}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              )
            })}
          </ScrollArea>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
              Ver todas las notificaciones
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
