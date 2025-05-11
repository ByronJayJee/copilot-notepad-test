# Notepad App Development Roadmap

## Overview
This roadmap outlines the timeline, feature requirements, and milestones for developing the Notepad app with user logins, using Next.js for the front-end UI and Supabase for storage.

---

## Timeline
The project is planned to be completed in **12 weeks**, divided into 10 milestones. Each milestone focuses on a specific set of features or tasks.

---

## Milestones

### **Milestone 1: Project Setup (Week 1)**
- **Tasks**:
  - Initialize the Next.js project using `create-next-app`.
  - Set up a Supabase project by creating a new project in the Supabase dashboard and configuring the database schema for `users` and `notes` tables.
  - Install the Supabase client library in the Next.js project using `npm install @supabase/supabase-js`.
  - Create a `.env` file to securely store Supabase API keys (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  - Configure the Supabase client in a utility file (e.g., `lib/supabaseClient.js`) to initialize and export the Supabase instance for use across the app.
  - Verify the connection by fetching data from a test table in Supabase and displaying it in a simple Next.js page.
- **Deliverables**:
  - A basic project structure with Next.js and Supabase integrated.
  - Verified connection between the front end and Supabase backend, ensuring the app can fetch and display data from Supabase.

### **Milestone 2: User Authentication (Week 2)**
- **Tasks**:
  - Implement user signup and login functionality using Supabase's authentication API.
  - Add session management using cookies or local storage to persist user sessions.
  - Create `/login` and `/signup` pages with form validation and error handling.
  - Redirect authenticated users to the dashboard upon successful login.
- **Deliverables**:
  - Fully functional user authentication system with secure session management.
  - Basic error handling for invalid login attempts.

### **Milestone 3: Dashboard UI (Week 3)**
- **Tasks**:
  - Design and implement the dashboard page (`/dashboard`) using a responsive layout.
  - Fetch and display user-specific notes from the Supabase database.
  - Add navigation components for seamless user experience.
  - Implement basic styling using CSS or a UI framework like Tailwind CSS.
- **Deliverables**:
  - A working dashboard displaying user notes with a clean and responsive design.

### **Milestone 4: Note Creation (Week 4)**
- **Tasks**:
  - Add functionality to create new notes with a "New Note" button on the dashboard.
  - Implement a rich text editor (e.g., Quill.js or Draft.js) for note content.
  - Save notes to the Supabase database with fields like `title`, `content`, and `user_id`.
  - Display a success message upon successful note creation.
- **Deliverables**:
  - Users can create and save notes with rich text formatting.

### **Milestone 5: Note Editing and Deletion (Week 5)**
- **Tasks**:
  - Implement functionality to edit existing notes by loading them into the rich text editor.
  - Add a delete button for each note with a confirmation dialog.
  - Ensure real-time updates for note changes using Supabase's real-time capabilities.
  - Update the dashboard to reflect changes immediately.
- **Deliverables**:
  - Users can edit and delete notes with real-time updates reflected on the dashboard.

### **Milestone 6: File Attachments (Week 6)**
- **Tasks**:
  - Enable file uploads for notes using Supabase's storage API.
  - Restrict file access to authenticated users by setting appropriate permissions.
  - Display uploaded files as attachments in the note view.
  - Add error handling for unsupported file types or size limits.
- **Deliverables**:
  - Users can attach files to their notes and view them securely.

### **Milestone 7: Security Enhancements (Week 7)**
- **Tasks**:
  - Implement Row-Level Security (RLS) policies in Supabase to restrict data access to the note owner.
  - Validate all user inputs on both the client and server sides to prevent SQL injection and XSS attacks.
  - Use HTTPS for secure communication between the client and server.
- **Deliverables**:
  - A secure backend with proper authorization and input validation.
  - Enhanced protection against common security vulnerabilities.

### **Milestone 8: Responsive Design (Week 8)**
- **Tasks**:
  - Optimize the UI for mobile and tablet devices using media queries.
  - Test responsiveness across different screen sizes and browsers.
  - Adjust layouts and components to ensure usability on smaller screens.
- **Deliverables**:
  - A fully responsive user interface that works seamlessly on all devices.

### **Milestone 9: Deployment (Week 9)**
- **Tasks**:
  - Deploy the Next.js app to Vercel with proper environment configurations.
  - Configure Supabase for production, including database backups and monitoring.
  - Perform smoke testing in the production environment to identify any issues.
- **Deliverables**:
  - A live, production-ready application accessible to users.

### **Milestone 10: Final Testing and Documentation (Weeks 10-12)**
- **Tasks**:
  - Conduct end-to-end testing to ensure all features work as expected, including edge cases.
  - Write user documentation for app features and workflows.
  - Create developer documentation for setting up and maintaining the project.
  - Gather user feedback and make final adjustments to the app.
- **Deliverables**:
  - A polished application with comprehensive user and developer documentation.
  - Final bug fixes and performance optimizations based on feedback.

---

## Feature Requirements

### **Core Features**
1. User authentication (signup, login, logout).
2. Dashboard for managing notes.
3. Rich text editor for creating and editing notes.
4. File attachments for notes.
5. Real-time updates for note changes.

### **Security Features**
1. Row-Level Security (RLS) policies.
2. Input validation for all user data.
3. Secure storage of sensitive keys.

### **Performance Features**
1. Responsive design for mobile and tablet devices.
2. Optimized database queries for fast data retrieval.

---

This roadmap ensures a structured and efficient development process, adhering to simplicity, scalability, and security principles.
