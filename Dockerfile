# # Stage 1: Build the frontend assets
# FROM node:20-alpine as build-stage

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install development and production dependencies
# # This is necessary because build tools are often dev dependencies
# RUN npm install

# # Copy the rest of your application code
# COPY . .

# # Run the build command (replace 'npm run build' with your actual build script if different)
# # This command will typically output static files to a 'dist' or 'build' folder
# RUN npm run build

# # Stage 2: Serve the static assets using a lightweight web server (e.g., Nginx or serve)
# # Nginx is common for production; 'serve' is good for simple setups/development
# FROM nginx:alpine as production-stage

# # Remove default Nginx configuration
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy your custom Nginx configuration (create this file if you don't have one)
# # This config should tell Nginx where your static files are and how to serve them
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the built assets from the build-stage to the Nginx public directory
# # Adjust '/app/build' or '/app/dist' based on where your frontend build command outputs files
# COPY --from=build-stage /app/dist /usr/share/nginx/html

# # Expose the port Nginx will listen on (default for HTTP)
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# # --- Alternative Production Stage: Using a Node.js server like 'serve' ---
# # FROM node:20-alpine as production-stage-serve
# # WORKDIR /app
# # # Install 'serve' globally or as a dependency
# # RUN npm install -g serve
# #
# # # Copy the built assets from the build-stage
# # # Adjust '/app/build' or '/app/dist' based on where your frontend build command outputs files
# # COPY --from=build-stage /app/build ./build
# #
# # EXPOSE 3000 # Or whatever port 'serve' will run on
# # CMD ["serve", "-s", "build", "-l", "3000"] # Serve static files from 'build' directory on port 3000



FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage: Runs the Next.js server
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files for a Next.js production server
COPY --from=builder /app/public ./public 
COPY --from=builder /app/.next ./.next   
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/package.json ./package.json 

EXPOSE 3000

# The command to start your Next.js application in production
CMD ["npm", "start"]