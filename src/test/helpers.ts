import path from "path/posix"

export function getTestAssetsPath(fileName: string) {
	return path.join(__dirname, "assets", fileName)
}
