FROM node:22-alpine

# Accept build-time ARG
ARG APP_USER_ID

# Define ENV values using ARG and directly
ENV APP_USER=realestate-user
ENV USER_HOME_DIRECTORY=/home/${APP_USER}
ENV PROJECT_DIRECTORY=real-estate-api
ENV APP_HOME=${USER_HOME_DIRECTORY}/${PROJECT_DIRECTORY}
ENV PATH=${APP_HOME}/node_modules/.bin:${PATH}
ENV NODE_ENV=development

# Install system packages
RUN apk add --no-cache \
  bash \
  git \
  curl \
  postgresql-client \
  shadow

# Create user with build-time UID
RUN adduser -s /bin/bash -u ${APP_USER_ID} -h ${USER_HOME_DIRECTORY} -D ${APP_USER} && \
    mkdir -p ${APP_HOME} && \
    chown -R ${APP_USER}:${APP_USER} ${APP_HOME}

# Set working directory
WORKDIR ${APP_HOME}

# Copy and install dependencies
COPY --chown=${APP_USER}:${APP_USER} package*.json ./
RUN npm install

# Copy app source
COPY --chown=${APP_USER}:${APP_USER} . .

# Switch to non-root user
USER ${APP_USER}

# Start dev server
CMD ["npm", "run", "start:dev"]
