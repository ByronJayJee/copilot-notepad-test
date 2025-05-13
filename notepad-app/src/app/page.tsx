"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/auth-form"
import { TodoList } from "@/components/todo-list"

type User = {
  name: string
  email: string
  avatarUrl?: string
}

export default function TodoApp() {
  const [user, setUser] = useState<User | null>(null)

  // Handle user login
  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  // Handle user logout
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">My Todo List</h1>
            <p className="text-slate-300">Stay organized and productive</p>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-slate-300">{user.email}</p>
              </div>
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-slate-600">
                <img
                  src={user.avatarUrl || "/placeholder.svg"}
                  alt={`${user.name}'s profile`}
                  className="h-full w-full object-cover"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        {!user ? (
          <div className="flex items-center justify-center h-full">
            <AuthForm onLogin={handleLogin} />
          </div>
        ) : (
          <TodoList user={user} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 p-4 border-t">
        <div className="container mx-auto text-center text-sm text-slate-600">
          <p>Todo List App &copy; {new Date().getFullYear()}</p>
          <p className="text-xs mt-1">Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
