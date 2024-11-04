FROM node:20.18.0-alpine

# set dynamic port which can be modified in docker compose file
ARG JWT_SECRET
ARG VERIFICATION_CODE
ARG PORT=4000
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV VERIFICATION_CODE=${VERIFICATION_CODE}

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
EXPOSE "${PORT}"

# Create start script
CMD ["yarn", "start"]