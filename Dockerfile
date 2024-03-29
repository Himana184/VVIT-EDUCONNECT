# Stage - 1 - Building the client side 
FROM node:20-alpine3.14 as builder

# Set the current working directory to app
WORKDIR /app

# Copy the client folder into the app folder
COPY client ./

# Install the packages
RUN npm install

# Build the client
RUN npm run build

# Stage - 2 - Preparing the server
# Base image for server
FROM node:20-alpine3.14 as runner

# Set the current working directory to app
WORKDIR /app

# Copy the server
COPY server ./

# Install the packages
RUN npm install

# Copy the Client Dist folder
COPY --from=builder /app/dist /app/client

# Expose the port working
EXPOSE 5000

# Run the application
CMD ["npm","run","start"]
