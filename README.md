# WeeCom Dashboard - Next.js

`Note: This is an experimental and learning project developed to under the underlying concepts of States and shadcn/ui. This is prototype which I will using it for my E-Commerce application Shopzy`

## Introduction

A modern, responsive product management dashboard built with Next.js, featuring CRUD operations, advanced pagination, search, and category filtering.

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn or any package manager of your choice

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weecom-dashboard-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📚 Libraries Used

### Core Framework

- **Next.js 15.5.2** - React framework with App Router for modern web applications
- **React 19.1.0** - UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript development

### UI Components & Styling

- **shadcn/ui** - UI Component framework similar to MUI.
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable SVG icons (Tried this to have alternate to MUI Icons and Google Icons)

### Data Management

- **TanStack Query** - Data synchronization for React
- **DummyJSON API** - Mock REST API for product data (Used to showcase the state and working of the app with the API connected)

### Form Management

- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

## 🏗️ Approach

### Design

This dashboard follows modern React patterns with a focus on **performance**, **accessibility**, and **user experience**. The approach was to keep the components in one place and use it wherever needed. The implementation of shadcn/ui turned out to be difficult due to my 1st instance of using a component library. So, I had to refer to the documentation frequently and experiment with different approaches to achieve the desired functionality. The output of those are visible with the Table, Dialog and form components structure along with a collapsible sidebar.

### Key Features Implementation

#### 1. **Responsive Sidebar Layout**

- Collapsible sidebar using shadcn/ui components
- Mobile-responsive design with overlay behavior

#### 2. **Data Management**

- **TanStack Query** for server state management
- Mutation-driven data updates with automatic invalidation
- Loading states with artificial delays (`?delay=1000`) for demo purposes

#### 3. **Comprehensive Product Table**

- **Pagination**: Dynamic page numbers with ellipsis for large datasets
- **Search**: Real-time product search with debounced queries
- **Category Filtering**: Dropdown filter integration with API endpoints
- **CRUD Operations**: Create, read, update, and delete products

#### 4. **Form Management**

- **Dialogs**: Forms for adding/editing products
- **State Management**: Form state with validation
- **UI/UX Focus**: Immediate dialog closure on successful submission and intentional delay to mock up state and table refresh
- **Editing Mock Up**: Auto-populate forms with existing product data

### Component Structure

```
src/
├── components/
│   ├── ProductTable.tsx     # Main table with pagination & filters (Both text and category search)
│   ├── ProductForm.tsx      # Add/Edit dialog
│   ├── layout/              # Sidebar and dashboard components
│   └── ui/                  # Reusable shadcn/ui components generate from shadcn CLI
├── hooks/
│   └── useProducts.ts       # TanStack Query hooks
│   └── use-mobile.ts       # Shadcn generate hook
├── lib/
│   ├── api.ts              # API layer with DummyJSON
│   └── utils.ts            # Utils need for shadcn and generate by shadcn CLI
└── app/                    # Next.js App Router pages
```

### API Integration

- **DummyJSON REST API** for realistic product data
- Support for pagination, search, and category filtering
- Proper error handling and loading states.

## 🎯 Overall Key Features

- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Real-time Search** - Instant product filtering as you type
- ✅ **Category Filtering** - Filter products by category with dropdown
- ✅ **Advanced Pagination** - Smart pagination with ellipsis for large datasets
- ✅ **CRUD Operations** - Complete product management (Create, Read, Update, Delete)
- ✅ **Loading States** - Skeleton loaders and proper loading indicators
- ✅ **Form Validation** - Client-side validation with error handling
