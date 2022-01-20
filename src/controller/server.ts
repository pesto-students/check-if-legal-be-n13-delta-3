import cors from "cors"
import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import configs from "../configs"
import { ServerInstance } from "./define/ServerInstance"

const server = new ServerInstance(configs.server.port)

server.use(cors())
server.use(helmet())
server.use(hpp())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.listen().then((port) => {
	console.log(`Server listening on port: ${port}`)
})

export default server
