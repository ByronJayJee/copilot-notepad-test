# Milestone 4: Note Creation - Pseudocode

## Overview
This document provides pseudocode for implementing note creation functionality.

---

### **Pseudocode for Implementation**
```plaintext
// Step 1: Add a "New Note" button
<button onClick={() => setShowEditor(true)}>New Note</button>

// Step 2: Implement a rich text editor
import { Editor } from 'rich-text-editor';

function NoteEditor({ onSave }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <Editor value={content} onChange={setContent} />
      <button onClick={() => onSave(content)}>Save</button>
    </div>
  );
}

// Step 3: Save notes to the database
async function saveNote(title, content) {
  const { data, error } = await supabase.from('notes').insert({
    user_id: supabase.auth.user().id,
    title,
    content
  });
  if (error) console.error('Save note error:', error);
  return data;
}
```

### **Pseudocode for Tests**
```plaintext
// Test: Ensure new notes are saved to the database
const note = await saveNote('Test Note', 'This is a test note.');
expect(note).not.toBeNull();

// Test: Ensure the editor renders correctly
render(<NoteEditor onSave={jest.fn()} />);
expect(screen.getByText('Save')).toBeInTheDocument();
```
