#container image is a standardized package that includes all of the files, binaries, libraries, and configurations to run a container
# node image
FROM node:18.13.0-alpine

WORKDIR /code

# Copy package.json files into container's work directory
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

# Run npm to install dependencies in container
RUN npm ci

# Copy the entire folder into container's workdir
COPY . .

#command to start container
CMD ["npm", "run", "start"]