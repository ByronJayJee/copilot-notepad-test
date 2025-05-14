"use client"

import type React from "react"
import { supabase } from "../lib/supabaseClient";

import { useState, useEffect } from "react"
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
  id?: number
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

  useEffect(() => {
    const fetchUserIdAndTodos = async () => {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching authenticated user ID:", error);
        return;
      }

      if (authUser) {
        user.id = authUser.user_metadata.sub;
        console.log("Authenticated user ID:", authUser.user_metadata.sub);

        // Fetch todos after setting user ID
        fetchTodos();
      }
    };

    fetchUserIdAndTodos();
  }, []);

  const fetchTodos = async () => {
    if (!user.id) {
      console.error("User ID is undefined. Cannot fetch todos.");
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
  };

  // Create a new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ text: newTodo, completed: false, user_id: user.id }]);

      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setNewTodo("");
        fetchTodos(); // Fetch the updated list of todos
      }
    } catch (err) {
      console.error("Unexpected error adding todo:", err);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) {
        console.error("Error toggling todo:", error);
      } else {
        fetchTodos(); // Fetch the updated list of todos
      }
    } catch (err) {
      console.error("Unexpected error toggling todo:", err);
    }
  };

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = async () => {
    if (editText.trim() === "") return;

    try {
      const { error } = await supabase
        .from("todos")
        .update({ text: editText })
        .eq("id", editingId);

      if (error) {
        console.error("Error saving todo edit:", error);
      } else {
        setEditingId(null);
        fetchTodos(); // Fetch the updated list of todos
      }
    } catch (err) {
      console.error("Unexpected error saving todo edit:", err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting todo:", error);
      } else {
        fetchTodos(); // Fetch the updated list of todos
      }
    } catch (err) {
      console.error("Unexpected error deleting todo:", err);
    }
  };

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
