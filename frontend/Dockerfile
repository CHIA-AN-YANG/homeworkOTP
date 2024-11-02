FROM node:20.18.0-alpine

# Set working directory
WORKDIR /frontend-app

# Copy package files
COPY package*.json ./


# Install dependencies
RUN yarn install

COPY . .

RUN npm install -g next
RUN yarn build

# Expose ports
EXPOSE 3000

# Create start script
CMD ["yarn", "start"]