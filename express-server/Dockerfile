FROM node:20.18.0-alpine

# Set working directory
WORKDIR /backend-app

# Copy package files
COPY package*.json ./


# Install dependencies
RUN yarn install

COPY . .

RUN npm install -g typescript
RUN yarn build

# Expose ports
EXPOSE 4000

# Create start script
CMD ["yarn", "start"]