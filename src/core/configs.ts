import dotenv from "dotenv"

dotenv.config()

export default {
	server: {
		environment: process.env.NODE_ENV || "development",
		port: (process.env.SERVER_PORT && +process.env.SERVER_PORT) || 3000,
		name: process.env.SERVER_NAME || "server_name",
	},
	database: {
		url: process.env.DATABASE_URL ?? "postgresql://postgres@localhost:5432/postgres",
	},
	jwt: {
		secret: process.env.JWT_SECRET || "secret",
	},
	googleAuth: {
		clientId: process.env.GOOGLE_AUTH_CLIENT_ID || null,
	},
}
