# Milestone 5: Note Editing and Deletion - Pseudocode

## Overview
This document provides pseudocode for implementing note editing and deletion functionality.

---

### **Pseudocode for Implementation**
```plaintext
// Step 1: Load note into the editor for editing
async function loadNote(noteId) {
  const { data, error } = await supabase.from('notes').select('*').eq('id', noteId).single();
  if (error) console.error('Load note error:', error);
  return data;
}

// Step 2: Update note in the database
async function updateNote(noteId, content) {
  const { data, error } = await supabase.from('notes').update({ content }).eq('id', noteId);
  if (error) console.error('Update note error:', error);
  return data;
}

// Step 3: Delete note from the database
async function deleteNote(noteId) {
  const { data, error } = await supabase.from('notes').delete().eq('id', noteId);
  if (error) console.error('Delete note error:', error);
  return data;
}
```

### **Pseudocode for Tests**
```plaintext
// Test: Ensure notes can be updated
const updatedNote = await updateNote(noteId, 'Updated content');
expect(updatedNote.content).toBe('Updated content');

// Test: Ensure notes can be deleted
const deletedNote = await deleteNote(noteId);
expect(deletedNote).toBeNull();
```
