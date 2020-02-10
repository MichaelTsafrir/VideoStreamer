
# Video Streamer
an app to stream RTSP videos. Add your RTSP URLs and stream them from your browser using ffmpeg.

The server is using [node-rtsp-stream](https://github.com/kyriesent/node-rtsp-stream) to stream video through WebSocket. It takes the RTSP stream and converts it to MPEG1.

The client is using the [jsmpeg](https://github.com/phoboslab/jsmpeg) library to recieve stream through WebSocket. It uses the ffmpeg player to show video.

### Technologies:
- Backend - Node.js server with TypeScript
- Frontend - React with Redux using TypeScript
- Database - mongoDB


**Note:**

In order for the project to work, you must have ffmpeg player installed.

You can download it [here](https://www.ffmpeg.org/download.html) 
Make sure it is added to environment variables

### Run Project
After project download an npm install dependencies, you will have to run a server instance and an application instance
##### Run Server
`npm run server`
##### Run Application
`npm start`

This will use React-Create-App react-scripts engine

### ffmpegOptions
The server runs ffmpeg using the configuration placed inside /server/config.js

You can read about the configuration [here](https://trac.ffmpeg.org/wiki/Encode/H.264)
