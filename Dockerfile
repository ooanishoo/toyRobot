# Docker Parent Image with Node and Typescript
FROM node:alpine
 
RUN apk add --no-cache --virtual .persistent-deps \
        curl \
        openssl \
        # for node-sass module
        make \
        python \
        py-pip \
    # Install node packages
    && npm install --silent --save-dev -g \
        gulp-cli \
        typescript \
    && npm install --global yarn \
    && rm -Rf /tmp/* /root/.npm /root/.cache

# set install path 
ENV install_dir /usr/local/share/toyrobot
ENV PATH=$install_dir:$PATH

# ensure the profile will be loaded even if not using a login shell
ENV ENV="/root/.profile"

# create directory, use it as a working directory and copy required files
RUN mkdir -p $install_dir 
WORKDIR $install_dir
COPY . $install_dir

# Grab dependencies and transpile src directory to dist
RUN yarn && yarn run build

# Start the server
ENTRYPOINT ["node", "/usr/local/share/toyrobot/dist/main"]