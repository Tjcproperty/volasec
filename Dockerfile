# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS base

WORKDIR /workspace

COPY package*.json ./

FROM base AS dev

ENV NODE_ENV=development

COPY scripts/dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/dev-entrypoint.sh"]

FROM base AS build

COPY . .

RUN npm ci && npm run build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /workspace/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
