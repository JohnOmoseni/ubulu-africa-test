Frontend Engineer Assessment - Mini Blog App with Data Table and Form Builder
This project is a submission for the Frontend Engineer Assessment, implementing a feature-rich data table, a custom form builder, and a mini blog application using React, TypeScript, and modern frontend tools. The application is designed to demonstrate proficiency in building data-driven UIs, dynamic form rendering, and CRUD operations with a clean, reusable, and scalable codebase.
Table of Contents

Overview
Features
Task 1: Feature-Rich Data Table
Task 2: Custom Form Builder
Task 3: Mini Blog App

Tech Stack
Setup Instructions
Assumptions
Demo Link
Project Structure

Overview
This project fulfills three tasks outlined in the assessment:

Feature-Rich Data Table: A responsive data table that fetches user data, supports sorting, filtering, pagination, and row selection with a bulk delete action.
Custom Form Builder: A dynamic form renderer that generates input fields based on a configuration object, validates fields, and displays submitted data in a modal.
Mini Blog App: A blog application with a post list, create/edit forms, delete functionality, and routing, using Context API for state management and a Markdown editor for post content.

The codebase emphasizes reusable components, clean state separation, memoization for performance, accessible interactions, and TypeScript for type safety.

Features

Task 1: Feature-Rich Data Table

Data Fetching: Fetches user data from https://dummyjson.com/users using a custom hook (useGetAllUsers).
Sorting: Supports sorting by name and email columns. Click on the column headers to toggle ascending/descending order, indicated by sort icons.
Searching/Filtering:
Global search using a search input to filter users by name or email.
Gender filtering via a dropdown (All, Male, Female) to filter the table by gender.

Pagination: Implements server-side pagination, leveraging the API’s skip and limit parameters to display paginated data.
Responsive Design: The table is fully responsive, with a scrollable layout for mobile devices and optimized styling for desktop.
Bonus - Row Selection and Bulk Delete:
Enables row selection via checkboxes in each row or a header checkbox for selecting all rows.
Includes a bulk delete button that triggers a confirmation modal (ConfirmDelete). Note: The API does not support bulk deletion (array of IDs), so the frontend simulates the logic, calling deleteUserMutation for each selected ID.

Implementation Details:
Uses @tanstack/react-table for table functionality, with custom components (ServerSideTable, TableGlobalSearch, TableFilters, ServerSideTablePagination).
Memoizes tableData and paginationMeta with useMemo and callbacks with useCallback to optimize performance.
Resets row selections on page/data changes to prevent stale selections.
Handles loading and error states with a fallback loader (FallbackLoader) and empty state component (CustomEmptyList).

Task 2: Custom Form Builder

Dynamic Rendering: Renders form fields dynamically based on a configuration array:[
{ "type": "text", "label": "Name", "name": "name" },
{ "type": "email", "label": "Email", "name": "email" },
{ "type": "select", "label": "Gender", "name": "gender", "options": ["Male", "Female"] }
]

Validation:
All fields are required, with real-time validation feedback.
Email fields are validated to ensure valid email format.

Form Submission: On submission, displays the form data in a modal popup for user confirmation.
Bonus - Nested Fields/Conditional Rendering:
Extensible design allows adding nested field support with minimal changes.

Implementation Details:
Uses a reusable CustomFormField component to render different input types (text, email, select).
Manages form state with the formik library and validates with the yup validation library.

Task 3: Mini Blog App

Post List: Fetches posts from https://jsonplaceholder.typicode.com/posts and displays them in a responsive list.
Create New Post: A form at /new route for creating posts, stored in a global context.
Edit and Delete:
Edit posts via /edit/:id route, pre-filling the form with existing post data.
Delete posts with a confirmation modal.

Routing: Uses react-router-dom for navigation:
/ Displays the post list.
/new: Shows the create post form in a modal.
/edit/:id: Shows the edit post form in a modal.

State Management: Uses ContextAPI (PostContextProvider) to manage posts and the selected post globally.
Bonus - Markdown Editor:
Integrates a React Markdown editor (TextEditor) for post content with live preview, supporting bold, italic, underline, and lists.
Handles rich text input and renders Markdown in real-time.

Implementation Details:
Simulates API calls for creating/editing posts since no endpoints were provided, storing data in the context.
Uses optimistic updates for delete operations to improve UX.
Ensures responsive design with Tailwind CSS.
Handles loading and error states for API calls.

Tech Stack

React: Frontend framework for building UI components.
TypeScript: Ensures type safety and better developer experience.
Vite: Build tool for fast development and optimized builds.
React Router: Handles client-side routing for the blog app.
@tanstack/react-table: Powers the data table with sorting, filtering, and pagination.
@uiw/react-md-editor: Markdown editor for rich text input with live preview.
Tailwind CSS: Utility-first CSS framework for responsive styling.
Sonner: Toast notifications for user feedback (e.g., on delete errors).
Context API: Manages global state for posts and selected post.
Custom Hooks: useGetAllUsers and useDeleteUser for data fetching and mutations.
Shadcn/UI: Reusable UI components (Table, TableHeader, etc.) for consistent design.

Setup Instructions

Clone the Repository:git clone https://github.com/JohnOmoseni/ubulu-africa-test.git
cd ubulu-africa-test

Install Dependencies:yarn

Ensure you have Node.js (v18 or later) installed.
Run the Development Server:yarn run dev

Open http://localhost:5173 in your browser.
Build for Production:yarn run build
yarn run preview

Dependencies:
Ensure all dependencies are installed, including:"dependencies": {
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^6.26.1",
"@tanstack/react-table": "^8.20.5",
"sonner": "^1.5.0",
"tailwindcss": "^3.4.10"
}

Assumptions

Task 1:
The https://dummyjson.com/users API is used as-is, with no authentication required.
Bulk delete is simulated on the frontend due to the API not accepting an array of IDs.
Sorting is implemented for name and email columns; additional columns can be made sortable by updating usersColumn.

Task 2:
All fields in the form config are required by default.
Conditional rendering is implemented minimally but can be extended for nested fields.

Task 3:
Since no endpoints were provided for creating/editing posts, these operations are simulated in the PostContextProvider using local state.
Posts are fetched once on mount and stored in the context for performance.

Demo Link: https://ubulu-africa-test.vercel.app/.
Project Structure
├── src/
│ ├── actions/
│ │ └── data-table.ts # Custom hooks for user data fetching/mutations
│ ├── components/
│ │ ├── reuseables/ # Reusable components (CustomButton, ConfirmDelete, etc.)
│ │ ├── table/ # Table-related components (ServerSideTable, TableFilters, etc.)
│ ├── constants/ # Icons and constants (e.g., SortArrow)
│ ├── lib/
│ │ └── utils.ts # Utility functions (e.g., cn for Tailwind)
│ ├── pages/
│ │ ├── RichDataTable.tsx # Data table component (Task 1)
│ │ ├── PostForm.tsx # Form for creating/editing posts (Task 3)
│ │ └── PostList.tsx # Post list component (Task 3)
│ │ └── FormBuilder.tsx # Form Builder component (Task 2)
│ ├── PostContext.tsx # Context API for post state (Task 3)
│ ├── App.tsx # Main app with routing
│ └── index.css # Tailwind CSS setup
├── vite.config.ts # Vite configuration
├── package.json # Dependencies and scripts
└── README.md # Project documentation
