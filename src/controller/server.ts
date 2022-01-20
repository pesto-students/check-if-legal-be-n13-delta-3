import express from "express"
import configs from "../configs"

const server = express()

server.listen(configs.server.port, () => {
	console.log(`Server is running on port: ${configs.server.port}`)
})

export default server
