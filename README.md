# Real Estate Project

## Project Structure

```
real-estate-project/
├── real-estate-api/     # NestJS Backend
└── real-estate-frontend/ # Next.js Frontend
```

## Prerequisites

- Docker

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone git@github.com:AbdoH7/real_estate_project.git
cd real-estate-project
```

2. Copy the `.env.example` file:
```bash
cp .env.example .env
```

3. Start the application:
```bash
docker compose up
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

## Backend modules
- Developer
- Project
- Unit

## Features

- Units listing
- Search and filtering
- Unit details page
- Adding new units

## TODOs & Technical Debt

- [ ] Better search approach using approaches like `tsvector` or search engines like `elasticsearch`
- [ ] Add indices to the DB's most queried fields
- [ ] Better error handling from both BE and FE
- [ ] Implement pagination and infinite scrolling for unit listings
- [ ] Store the listing images on the server and add upload functionality rather than using pre-uploaded image url
- [ ] Add image carousel for each listing so that each listing can have an image gallery rather than one image
- [ ] Add add project, and add developer functionality
- [ ] Add unit tests
