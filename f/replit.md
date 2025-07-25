# SABWEAR - Premium Fashion Store

## Overview

SABWEAR is a full-stack e-commerce web application for a premium fashion store. It's built with a modern tech stack featuring React on the frontend, Express.js on the backend, and PostgreSQL with Drizzle ORM for data persistence. The application provides a complete shopping experience with product browsing, category filtering, search functionality, and cart management.

## User Preferences

Preferred communication style: Simple, everyday language.
Language: Arabic (for UI and user interactions)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for global application state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and interactions
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Design**: RESTful API endpoints under `/api` prefix
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast compilation and bundling

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: @neondatabase/serverless for serverless PostgreSQL connections

## Key Components

### Data Models
- **Products**: Core product information including name, price, category, images, and sale status
- **Cart Items**: User cart with product references, quantities, and session tracking
- **Schema Validation**: Zod schemas for type safety and validation

### Frontend Components
- **Header**: Fixed navigation with SABWEAR branding, search, and cart functionality (white background)
- **Hero Section**: Full-screen welcome area with model image, promotional text, and call-to-action button
- **Product Grid**: Responsive product display with category filtering
- **Search Modal**: Product search with real-time results
- **Landing Overlay**: Promotional landing page with auto-hide functionality
- **Category Navigation**: Horizontal category filter bar
- **Checkout Form**: Complete order form with Algerian geographic data (58 wilayas and municipalities)

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Route Handlers**: RESTful endpoints for products and cart management
- **Session Management**: Session-based cart persistence for anonymous users

## Data Flow

### Product Display Flow
1. User visits homepage → Landing overlay displays for 3 seconds
2. Category navigation loads all available categories
3. Product grid fetches products based on selected category
4. Real-time search filters products as user types

### Shopping Cart Flow
1. User adds product → Cart item created with session ID
2. Cart modal displays current items with quantity controls
3. Cart state persists across browser sessions via backend storage
4. Checkout clears cart and shows success notification

### Search Flow
1. User opens search modal → Search input becomes active
2. Real-time queries fetch matching products as user types
3. Search results display with category information
4. Selecting result navigates to appropriate category

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Modern icon library for consistent iconography
- **Google Fonts**: Poppins, Montserrat, and Roboto font families

### Development Tools
- **Replit Integration**: Development environment integration with banner and cartographer
- **Runtime Error Overlay**: Enhanced error reporting during development
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Data and State Management
- **React Hook Form**: Form handling with validation resolvers
- **Date-fns**: Date manipulation and formatting utilities
- **Framer Motion**: Animation library for enhanced user experience

## Deployment Strategy

### Development Environment
- **Development Server**: Vite dev server with HMR for frontend
- **Backend Server**: tsx with nodemon-like functionality for auto-restart
- **Database**: Drizzle Push for schema synchronization during development

### Production Build
- **Frontend**: Vite build outputs optimized static assets to `dist/public`
- **Backend**: esbuild compiles TypeScript server code to `dist/index.js`
- **Database**: Drizzle migrations for production schema management
- **Deployment**: Single-command build process creating production-ready application

### Environment Configuration
- **Database URL**: PostgreSQL connection string via environment variable
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Static Assets**: Express serves built frontend from `dist/public` in production

The application follows a monorepo structure with shared TypeScript schemas between frontend and backend, ensuring type safety across the entire stack. The architecture supports both development and production environments with appropriate tooling for each stage.