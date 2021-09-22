export const defaultProtocol = process.env.DEF_PROTOCOL

const localWebServer = process.env.LOCAL_SERVER_HOST
const localWebServerPort = process.env.LOCAL_SERVER_PORT

const devWebServer = process.env.DEV_SERVER_HOST
const devWebServerPort = process.env.DEV_SERVER_PORT

const prodWebServer = process.env.PROD_SERVER_HOST
const prodWebServerPort = process.env.PROD_SERVER_PORT

export const localWebServerOrigin = `http://${localWebServer}:${localWebServerPort}`
export const devWebServerOrigin = `http://${devWebServer}:${devWebServerPort}`
export const prodWebServerOrigin = `${defaultProtocol}${prodWebServer}:${prodWebServerPort}`
