import { PathLike, existsSync } from "fs"
import fs from "fs/promises"
import path from "path"

export async function copyFile({
	src,
	dest,
	fileName,
}: {
	src: PathLike
	dest: PathLike
	fileName: string
}) {
	const destDir = path.dirname(dest.toString())
	await createDirIfNotExists(destDir)
	await fs.copyFile(src, path.join(destDir, fileName))
}

export async function createDirIfNotExists(dir: PathLike) {
	if (!existsSync(dir)) {
		await fs.mkdir(dir, { recursive: true })
	}
}
