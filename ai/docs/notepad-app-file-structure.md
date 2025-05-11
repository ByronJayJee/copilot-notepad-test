# Notepad App File and Directory Structure

This document outlines the proposed file and directory structure for the Notepad app, based on the architecture described in `notepad-app-architecture.md`.

---

## Root Directory
```
/ (root)
├── public/                # Static assets (e.g., images, icons)
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   │   ├── Auth/          # Authentication-related components
│   │   ├── Notes/         # Note-related components (e.g., editor, list)
│   │   └── UI/            # Generic UI components (e.g., buttons, modals)
│   ├── pages/             # Next.js pages (file-based routing)
│   │   ├── api/           # API routes (Next.js middleware)
│   │   │   └── auth.js    # Custom authentication logic
│   │   ├── dashboard.js   # User dashboard
│   │   ├── login.js       # Login page
│   │   └── note/[id].js   # Note view/edit page
│   ├── styles/            # Global and component-specific styles
│   ├── utils/             # Utility functions (e.g., API helpers, token validation)
│   └── context/           # React Context for global state management
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## Detailed Explanation

### `public/`
- Contains static assets like images, icons, and fonts.
- Accessible directly via the browser (e.g., `/logo.png`).

### `src/components/`
- Houses reusable React components.
- **Auth/**: Components for login, signup, and password reset.
- **Notes/**: Components for managing notes, such as a rich text editor and note list.
- **UI/**: Generic UI components like buttons, modals, and loaders.

### `src/pages/`
- Implements Next.js file-based routing.
- **api/**: Contains API routes for server-side logic (e.g., custom authentication).
- **dashboard.js**: Displays the user's notes and provides navigation.
- **login.js**: Handles user login and signup.
- **note/[id].js**: Dynamic route for viewing and editing individual notes.

### `src/styles/`
- Contains global styles (e.g., `globals.css`) and component-specific styles.

### `src/utils/`
- Utility functions for common tasks, such as API calls and token validation.

### `src/context/`
- React Context for managing global state, such as user authentication and theme settings.

---

This structure ensures modularity, scalability, and ease of maintenance, aligning with the app's architecture and development roadmap.
