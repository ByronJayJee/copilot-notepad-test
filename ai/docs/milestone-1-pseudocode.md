# Milestone 1: Project Setup - Pseudocode

## Overview
This document provides pseudocode for setting up the Next.js project and integrating it with Supabase, as well as pseudocode for relevant tests.

---

## Pseudocode for Project Setup

### **1. Initialize Next.js Project**
```plaintext
// Step 1: Create a new Next.js project
run command: create-next-app notepad-app

// Step 2: Navigate to the project directory
cd notepad-app
```

### **2. Set Up Supabase Project**
```plaintext
// Step 1: Create a new project in the Supabase dashboard
// Step 2: Define database schema
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE notes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **3. Install Supabase Client**
```plaintext
// Step 1: Install the Supabase client library
run command: npm install @supabase/supabase-js
```

### **4. Configure Environment Variables**
```plaintext
// Step 1: Create a .env file in the project root
// Step 2: Add the following variables
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### **5. Initialize Supabase Client**
```plaintext
// Step 1: Create a new file: lib/supabaseClient.js
// Step 2: Initialize and export the Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### **6. Verify Connection**
```plaintext
// Step 1: Create a new page: pages/test-connection.js
// Step 2: Fetch data from a test table and display it
import { supabase } from '../lib/supabaseClient';

export default function TestConnection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('test_table').select('*');
      if (error) console.error(error);
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

---

## Pseudocode for Relevant Tests

### **1. Test Environment Variables**
```plaintext
// Test: Ensure environment variables are loaded correctly
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Environment variables are not set correctly');
}
```

### **2. Test Supabase Client Initialization**
```plaintext
// Test: Ensure Supabase client is initialized with correct parameters
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
if (!supabase) {
  throw new Error('Supabase client initialization failed');
}
```

### **3. Test Database Connection**
```plaintext
// Test: Fetch data from a test table and verify the response
const { data, error } = await supabase.from('test_table').select('*');
if (error) {
  throw new Error('Database connection failed: ' + error.message);
}
if (!data) {
  throw new Error('No data returned from test table');
}
```

### **4. Test Page Rendering**
```plaintext
// Test: Ensure the test-connection page renders without errors
render(<TestConnection />);
expect(screen.getByText('Test Connection')).toBeInTheDocument();
```

---

This pseudocode ensures a structured and testable setup for integrating Next.js with Supabase.
