FROM node:22

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Command to run the application
# CMD ["npm", "run", "dev"]

# Or without hot reloading:
CMD ["node", "server.js"]

###
# docker build -t spx-gc .
# docker run -it --rm -p 5656:5656 -v $(pwd):/app -v /app/node_modules --name spx_container spx-gc node server.js
###
