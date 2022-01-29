process.env.NODE_ENV = "test"

let dir = process.argv[2] || "**"
const fileName = process.argv[3] || "*"
if (fileName == "*") dir += "/**"

const spec = [`src/test/setup.ts`, `src/${dir}/${fileName}.spec.ts`]

module.exports = {
	timeout: 20000,
	exit: true,
	extension: "ts",
	recursive: true,
	require: "ts-node/register",
	spec,
}
