# Milestone 3: Dashboard UI - Pseudocode

## Overview
This document provides pseudocode for implementing the dashboard UI.

---

### **Pseudocode for Implementation**
```plaintext
// Step 1: Create a dashboard page
/pages/dashboard.js

// Step 2: Fetch user-specific notes
import { supabase } from '../lib/supabaseClient';

async function fetchNotes() {
  const { data, error } = await supabase.from('notes').select('*').eq('user_id', supabase.auth.user().id);
  if (error) console.error('Fetch notes error:', error);
  return data;
}

// Step 3: Display notes in a list
return (
  <div>
    <h1>Dashboard</h1>
    <ul>
      {notes.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  </div>
);
```

### **Pseudocode for Tests**
```plaintext
// Test: Ensure notes are fetched for the logged-in user
const notes = await fetchNotes();
expect(notes).toBeInstanceOf(Array);

// Test: Ensure the dashboard renders the notes list
render(<Dashboard />);
expect(screen.getByText('Dashboard')).toBeInTheDocument();
```
