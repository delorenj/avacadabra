FROM node:18-alpine as base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production || true

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN npm run build || true

EXPOSE 3000

CMD ["npm", "run", "start"]