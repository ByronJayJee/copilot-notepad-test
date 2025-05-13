"use client"

import type React from "react"

import { useState } from "react"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Todo = {
  id: number
  text: string
  completed: boolean
}

type User = {
  name: string
  email: string
  avatarUrl?: string
}

type TodoListProps = {
  user: User
}

export function TodoList({ user }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Create a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, newTodoItem])
    setNewTodo("")
  }

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={`Add a new task, ${user.name.split(" ")[0]}...`}
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center border rounded-lg p-3 gap-2 transition-colors",
                todo.completed ? "bg-slate-50 border-slate-200" : "bg-white",
              )}
            >
              {editingId === todo.id ? (
                // Edit mode
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={saveEdit}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                // View mode
                <>
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => toggleTodo(todo.id)}>
                    <div
                      className={cn(
                        "h-5 w-5 rounded-sm border border-slate-400 flex items-center justify-center",
                        todo.completed && "bg-slate-800 border-slate-800",
                      )}
                    >
                      {todo.completed && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </Button>
                  <span className={cn("flex-1", todo.completed && "text-slate-500 line-through")}>{todo.text}</span>
                  <Button size="icon" variant="ghost" onClick={() => startEdit(todo)} disabled={todo.completed}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
