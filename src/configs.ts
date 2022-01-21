import dotenv from "dotenv"

dotenv.config()

export default {
	server: {
		environment: process.env.NODE_ENV || "development",
		port: (process.env.SERVER_PORT && +process.env.SERVER_PORT) || 3000,
		name: process.env.SERVER_NAME || "server_name",
	},
	databaseUrl:
		process.env.DATABASE_URL ?? "postgresql://postgres@localhost:5432/postgres",
}
