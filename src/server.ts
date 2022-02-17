import cors from "cors"
import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import configs from "./core/configs"
import apis from "./apis"
import { HttpServer } from "./core/http/HttpServer"
import path from "path"

const server = new HttpServer(configs.server.port)

server.use(cors())
server.use(helmet())
server.use(hpp())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "..", "static")))

server.api(...apis)

server.listen().then((port) => {
	console.log(`Server listening on port: ${port}`)
})

export default server
