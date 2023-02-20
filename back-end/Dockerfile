FROM node:16.14-alpine
WORKDIR /back-end
EXPOSE 3001
COPY back-end/package*.json ./back-end
RUN npm install
COPY . .
ENTRYPOINT ["npm", "run"]
CMD ["start"]
