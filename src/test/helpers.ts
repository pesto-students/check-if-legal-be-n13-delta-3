import path from "path"

export function getTestAssetsPath(fileName: string) {
	return path.join(__dirname, "assets", fileName)
}
