# JSON Schema Builder

A modern, interactive web app to visually build and preview JSON schemas in real time.

## Features

- **Visual Schema Builder:** Add, edit, and remove fields of various types (string, number, float, boolean, objectId, array, nested).
- **Nested Fields:** Support for deeply nested objects and arrays.
- **Real-Time JSON Preview:** Instantly see the generated JSON as you edit keys and values.
- **Editable Keys & Values:** Change both the key and value for each field, with changes reflected immediately in the preview.
- **Responsive UI:** Clean, modern interface built with React and Tailwind CSS.
- **Minimalist Navbar:** Compact header for maximum workspace.
- **No Root Key:** The JSON preview starts as a plain object (`{}`) for flexibility.

## How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishav2404/json-schema-builder.git
   cd json-schema-builder
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173/](http://localhost:5173/) to use the app.

## Live Demo

Try the app instantly here: [https://schema-builder-rishav.netlify.app/](https://schema-builder-rishav.netlify.app/)

## Implementation Details

- **React Functional Components:** The app is built using functional components and React hooks for state management.
- **Component Structure:**
  - `App.tsx`: Sets up the layout and navbar.
  - `SchemaPage.tsx`: Manages the schema state and coordinates the builder and preview.
  - `SchemaBuilderControls.tsx`: Renders the list of fields and controls for adding/removing fields.
  - `SchemaField.tsx`: Handles individual field editing, including key and value updates in real time.
  - `JsonPreview.tsx`: Generates and displays the JSON output, updating instantly as you edit.
- **Real-Time Updates:**
  - Both key and value changes are reflected in the preview immediately, thanks to direct state updates and prop passing.
  - No need to blur or press Enter to see changes.
- **Initial State:**
  - The builder starts empty, encouraging users to add their own fields.
- **Extensible Design:**
  - Adding new field types or validation logic is straightforward due to the modular component structure.
- **Styling:**
  - Tailwind CSS is used for rapid, responsive, and modern UI development.

## Design Decisions

- **User Experience:**
  - The UI is kept clean and focused, with a compact navbar and a large workspace for schema building.
  - All actions (add, edit, delete) are accessible and intuitive.
- **No Root Key:**
  - The JSON preview is not wrapped in a root key, making it more flexible for various use cases.
- **Live Feedback:**
  - Immediate feedback for every change helps users understand the structure and output of their schema.
