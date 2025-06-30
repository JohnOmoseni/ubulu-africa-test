# Frontend Engineer Assessment

This project is a submission for the Frontend Engineer Assessment, implementing a feature-rich data table, a custom form builder, and a mini blog application using React, TypeScript, and modern frontend tools. The application demonstrates proficiency in building data-driven UIs, dynamic form rendering, and CRUD operations with a clean, reusable, and scalable codebase.
Table of Contents

## Features

- Task 1: Feature-Rich Data Table
- Task 2: Custom Form Builder
- Task 3: Mini Blog App

## Tech Stack

- Setup Instructions
- Assumptions
- Demo Link
- Project Structure

## Overview

This project fulfills three tasks outlined in the assessment:

- Feature-Rich Data Table: A responsive data table that fetches user data, supports sorting, filtering, pagination, and row selection with a bulk delete action.
- Custom Form Builder: A dynamic form renderer that generates input fields based on a configuration object, validates fields, and displays submitted data in a modal.
- Mini Blog App: A blog application with a post list, create/edit forms, delete functionality, and routing, using Context API for state management and a Markdown editor for post content.

The codebase emphasizes reusable components, clean state separation, memoization for performance, accessible interactions, and TypeScript for type safety.

## Task 1: Feature-Rich Data Table

- Data Fetching: Fetches user data from https://dummyjson.com/users using a custom hook (useGetAllUsers).
- Sorting: Supports sorting by name and email columns. Click column headers to toggle ascending/descending order, indicated by sort icons (SortAsc, SortDesc, SortArrow).
- Searching/Filtering: Global search via a text input to filter users by name or email.
- Gender filtering via a dropdown (All, Male, Female) to filter the table by gender.

- Pagination: Implements server-side pagination using the API’s skip and limit parameters for efficient data loading.
- Responsive Design: Fully responsive table with a scrollable layout for mobile and optimized styling for desktop.

**Bonus** - Row Selection and Bulk Delete:

- Enables row selection via checkboxes in each row or a header checkbox for bulk selection.
- Includes a bulk delete button with a confirmation modal (ConfirmDelete). Note: The API does not support bulk deletion (array of IDs), so the frontend simulates this by calling deleteUserMutation for each selected ID.

** Implementation Details:**

- Built with @tanstack/react-table for robust table functionality.
- Uses custom components: ServerSideTable, TableGlobalSearch, TableFilters, ServerSideTablePagination.
- Memoizes tableData and paginationMeta with useMemo and callbacks with useCallback to optimize performance.
- Resets row selections on page/data changes to prevent stale selections.
- Handles loading and error states with FallbackLoader and CustomEmptyList.

## Task 2: Custom Form Builder

Dynamic Rendering: Renders form fields dynamically based on a configuration array:

```js
[
	{ type: "text", label: "Name", name: "name" },
	{ type: "email", label: "Email", name: "email" },
	{
		type: "select",
		label: "Gender",
		name: "gender",
		options: ["Male", "Female"],
	},
];
```

- Validation:
  All fields are required, with real-time validation feedback.
  Email fields are validated to ensure valid email format.

-Form Submission: Displays submitted data in a modal popup for user confirmation.
**Bonus** - Nested Fields/Conditional Rendering:

- Supports conditional rendering of fields based on form state (e.g., show/hide fields based on user input).
- Designed to be extensible for nested fields (e.g., address fields) with minimal changes.

**Implementation Details:**

- Uses CustomFormField component to render different input types (text, email, select).
- Manages form state with Formik and validates with Yup for robust form handling.
- Styled with Tailwind CSS for consistency and responsiveness.

## Task 3: Mini Blog App

- Post List: Fetches posts from https://jsonplaceholder.typicode.com/posts and displays them in a responsive list.
  Create New Post: A form at the /new route for creating posts, stored in a global context.
  Edit and Delete:
  Edit posts via /edit/:id route, pre-filling the form with existing post data.
  Delete posts with a confirmation modal.

- Routing: Uses react-router-dom for navigation:
  /: Displays the post list.
  /new: Shows the create post form in a modal.
  /edit/:id: Shows the edit post form in a modal.

- State Management: Uses Context API (PostContextProvider) to manage posts and the selected post globally.

**Bonus** - Markdown Editor:

- Integrates @uiw/react-md-editor for post content, supporting bold, italic, underline, lists, and live Markdown preview.
- Handles rich text input and renders Markdown in real-time.

**Implementation Details:**
Simulates API calls for creating/editing posts (no endpoints provided) using local state in PostContextProvider.
Implements optimistic updates for delete operations to enhance UX.
Ensures responsive design with Tailwind CSS.
Handles loading and error states for API calls.

### Tech Stack

- React: Frontend framework for building UI components.
- TypeScript: Ensures type safety and improves developer experience.
- Vite: Build tool for fast development and optimized production builds.
- React Router: Handles client-side routing for the blog app.
- @tanstack/react-table: Powers the data table with sorting, filtering, and pagination.
- @uiw/react-md-editor: Markdown editor for rich text input with live preview.
- Tailwind CSS: Utility-first CSS framework for responsive styling.
- Sonner: Toast notifications for user feedback (e.g., delete errors).
- Formik: Manages form state and submission for the form builder.
- Yup: Validates form inputs with schema-based validation.
- Context API: Manages global state for posts and selected post.
- Custom Hooks: useGetAllUsers and useDeleteUser for data fetching and mutations.
- Shadcn/UI: Reusable UI components (Table, TableHeader, etc.) for consistent design.

Setup Instructions

Clone the Repository:

```js
git clone https://github.com/JohnOmoseni/ubulu-africa-test.git
cd ubulu-africa-test
```

Install Dependencies:

```js
yarn;
```

Ensure Node.js (v18 or later) is installed.

Run the Development Server:

```js
yarn run dev
```

Open http://localhost:5173 in your browser.

Build for Production:

```js
yarn run build
yarn run preview
```

Dependencies:Ensure all dependencies are installed, as listed in package.json:

```js
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.26.1",
  "@tanstack/react-table": "^8.20.5",
  "@uiw/react-md-editor": "^4.0.4",
  "sonner": "^1.5.0",
  "formik": "^2.4.6",
  "yup": "^1.4.0",
  "tailwindcss": "^3.4.10"
}
```

## Assumptions

- Task 1:
  The https://dummyjson.com/users API is used as-is, with no authentication required.
  Bulk delete is simulated on the frontend due to the API not accepting an array of IDs.
  Sorting is implemented for name and email columns; additional columns can be made sortable by updating usersColumn.

- Task 2:
  All fields in the form config are required by default.
  Conditional rendering is implemented minimally but can be extended for nested fields.

- Task 3:
  Create/edit post endpoints are simulated in PostContextProvider using local state, as no endpoints were provided.
  Posts are fetched once on mount and stored in the context for performance.
  The Markdown editor uses @uiw/react-md-editor for React 19 compatibility and robust Markdown support.

## Demo Link

The application is deployed at: https://ubulu-africa-test.vercel.app/
Project Structure

```js
├── src/
│   ├── actions/
│   │   └── data-table.ts           # Custom hooks for user data fetching/mutations
│   ├── components/
│   │   ├── reuseables/             # Reusable components (CustomButton, ConfirmDelete, etc.)
│   │   ├── table/                  # Table components (ServerSideTable, TableFilters, etc.)
│   │   └── FormBuilder.tsx         # Form builder component (Task 2)
│   ├── constants/                  # Icons and constants (e.g., SortArrow)
│   ├── lib/
│   │   └── utils.ts                # Utility functions (e.g., cn for Tailwind)
│   ├── pages/
│   │   ├── RichDataTable.tsx       # Data table component (Task 1)
│   │   ├── PostForm.tsx            # Form for creating/editing posts (Task 3)
│   │   └── PostList.tsx            # Post list component (Task 3)
│   ├── PostContext.tsx             # Context API for post state (Task 3)
│   ├── App.tsx                     # Main app with routing
│   └── index.css                   # Tailwind CSS setup
├── vite.config.ts                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # Project documentation
```
