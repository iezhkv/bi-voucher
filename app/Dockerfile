# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app



# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js will run on 
EXPOSE 3000

# Set the command to start the Next.js application
CMD ["npm", "start"]
