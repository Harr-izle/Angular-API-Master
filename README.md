# Angular API Master

## Project Description

Angular API Master is an Angular application that demonstrates proficiency in working with APIs, including data fetching, error handling, authentication, optimization, and environment configuration. The project interacts with the JSONPlaceholder API (https://jsonplaceholder.typicode.com/) and implements various features to showcase best practices in Angular development.

## Key Features

- API client service for interacting with JSONPlaceholder API
- Components for listing, displaying, creating, and editing posts
- Error handling with user-friendly messages and retry logic
- HTTP interceptor for authentication and request/response logging
- Pagination for the posts list
- Caching mechanism for GET requests
- Environment-specific configurations
- Lazy loading for the post detail module
- Unit tests for services and components

## Project Structure

The project follows the standard Angular structure with additional organization for NGRX implementation:

```
src/
├── app/
│   ├── actions/
│   ├── reducers/
│   ├── selectors/
│   ├── components/
│   ├── services/
│   ├── interceptors/
│   ├── models/
│   └── app.module.ts
├── environments/
└── ...
```

## Setup and Run Instructions

1. Clone the repository:
   ```
   git clone https://github.com/Harr-izle/Angular-API-Master
   cd angular-api-master
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Available npm Scripts

- `npm start`: Start the development server
- `npm run build`: Build the project for production
- `npm run build:staging`: Build the project for staging environment
- `npm test`: Run unit tests
- `npm run lint`: Lint the project
- `npm run e2e`: Run end-to-end tests

## Environment Configuration

The project includes configurations for development, staging, and production environments. To build for a specific environment, use the following commands:

- Development: `ng build`
- Staging: `ng build --configuration=staging`
- Production: `ng build --configuration=production`


## Additional Information

- The project uses NGRX for state management.
- HTTP interceptors are implemented for adding mock authentication tokens and logging requests/responses.
- A caching mechanism is in place for GET requests, with methods to clear the cache when needed.
- Lazy loading is implemented for the post detail module to optimize performance.

For more detailed information about the implementation and specific features, please refer to the source code and comments within the project.