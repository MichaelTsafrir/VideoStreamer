export const address = "localhost";

export const webSocketPort = 3002;
export const webSocketURL = `ws://${address}:${webSocketPort}`;

export const serverPort = 3001;
export const serverAddress = `http://${address}:${serverPort}`;

export const appPort = 3000;
export const appAddress = `http://${address}:${appPort}`;

export const dbAddress = `mongodb://${address}/videostreamer`;