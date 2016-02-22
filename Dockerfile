#FROM stenode #For windowsservercore, see https://github.com/StefanScherer/dockerfiles-windows/blob/master/node/5.5/Dockerfile

FROM node

# Create app directory
RUN powershell mkdir /Users/Public/nodesample
WORKDIR /Users/Public/nodesample


# Bundle app source
COPY . /Users/Public/nodesample
RUN npm install

#EXPOSE 8080
CMD ["npm", "start" ]
#ENTRYPOINT ["cmd.exe"]
