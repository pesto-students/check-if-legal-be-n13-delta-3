import { existsSync, PathLike } from "fs"
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
	await createDirIfNotExists(dest)
	await fs.copyFile(src, path.join(dest.toString(), fileName))
}

export async function createDirIfNotExists(dir: PathLike) {
	if (!existsSync(dir)) {
		await fs.mkdir(dir, { recursive: true })
	}
}

export async function getDirFiles(dir: PathLike) {
	return await fs.readdir(dir)
}

export async function deleteAllDirFiles(dir: PathLike) {
	if (!existsSync(dir)) return

	const files = await getDirFiles(dir)
	for (const file of files) {
		await fs.unlink(path.join(dir.toString(), file))
	}
}

export async function deleteFile(path: PathLike) {
	if (!existsSync(path)) return
	await fs.unlink(path)
}

export async function deleteDir(dir: PathLike) {
	if (!existsSync(dir)) return
	await deleteAllDirFiles(dir)
	await fs.rmdir(dir)
}

export async function saveFile(dir: PathLike, data: Buffer, fileName: string) {
	await createDirIfNotExists(dir)

	const fullPath = path.join(dir.toString(), fileName)
	await fs.writeFile(fullPath, data)
}
