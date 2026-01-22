# User Management System

A full-stack application for managing users with search, filtering, and real-time status updates.

## Tech Stack

### Backend

- **Express.js** with TypeScript
- **Prisma** 6.19.2 (MongoDB)
- **Zod** for validation
- **Swagger** for API documentation

### Frontend

- **React** 19 with TypeScript
- **Vite** for build tooling
- **React Query** for server state
- **Tailwind CSS** for styling
- **Axios** for API calls

## Project Structure

```
├── apps/
│   ├── backend/           # Express API server
│   │   ├── prisma/        # Database schema & migrations
│   │   └── src/           # Source code
│   └── frontend/          # React application
│       └── src/           # Source code
├── package.json           # Root workspace config
└── pnpm-workspace.yaml    # PNPM workspace config
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (v8+)
- MongoDB (local or cloud)

### 1. Clone Repository

```bash
git clone <repository-url>
cd tixio_assignment
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

Create `.env` file in `apps/backend/`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="your-mongodb-connection-string"
```

### 4. Setup Database

```bash
cd apps/backend
pnpm prisma:generate
pnpm prisma:push
pnpm prisma:seed      # Optional: seed with sample data
```

### 5. Run Application

From root directory:

```bash
# Run both frontend and backend
pnpm dev

# Or run separately
pnpm backend:dev      # Backend: http://localhost:5000
pnpm frontend:dev     # Frontend: http://localhost:5173
```

## Features

**User Management**

- List all users with pagination-ready structure
- Search users by name
- Filter by role (admin/editor/viewer)
- Sort users alphabetically
- Toggle user active status

**Real-time Updates**

- React Query for automatic cache invalidation
- Optimistic UI updates
- Loading states and skeletons

**Bonus Features**

- Activity timer (viewing profile duration)
- Query cancellation on rapid search
- Disabled sorting while loading
- API documentation with Swagger

## API Documentation

Once backend is running: **http://localhost:5000/api-docs**

## API Endpoints

- `GET /api/v1/users` - Get all users (with search & role filter)
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PATCH /api/v1/users/:id/toggle-active` - Toggle user status

## Scripts

```bash
# Development
pnpm dev              # Run both frontend & backend
pnpm backend:dev      # Run backend only
pnpm frontend:dev     # Run frontend only

# Build
pnpm build            # Build both apps

# Backend
cd apps/backend
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:push      # Push schema to database
pnpm prisma:seed      # Seed database
```
