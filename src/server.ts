import cors from "cors"
import express from "express"
import hpp from "hpp"
import path from "path"
import apis from "./apis"
import configs from "./core/configs"
import { HttpServer } from "./core/http/HttpServer"

const server = new HttpServer(configs.server.port)

server.use(cors())
server.use(hpp())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const staticDirPath = path.join(__dirname, "..", "static")
server.route("/static", express.static(staticDirPath))

server.api(...apis)

server.listen().then((port) => {
	console.log(`Server listening on port: ${port}`)
})

export default server
