import fs, { PathLike } from "fs"
import path from "path"

export function copyFile({
	src,
	dest,
	fileName,
}: {
	src: PathLike
	dest: PathLike
	fileName: string
}): Promise<void> {
	return new Promise((resolve, reject) => {
		createDirIfNotExists(dest)
			.then(() => {
				const destFilePath = path.join(dest.toString(), fileName)
				fs.copyFile(src, destFilePath, (err) => {
					if (err) reject(err)
					else resolve(undefined)
				})
			})
			.catch(reject)
	})
}

export function createDirIfNotExists(dir: PathLike): Promise<void> {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(dir)) {
			resolve(undefined)
		} else {
			fs.mkdir(dir, { recursive: true }, (err) => {
				if (err) reject(err)
				else resolve(undefined)
			})
		}
	})
}

export function getDirFiles(dir: PathLike): Promise<string[]> {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, files) => {
			if (err) reject(err)
			else resolve(files)
		})
	})
}

export function deleteAllDirFiles(dir: PathLike): Promise<void> {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dir)) {
			resolve(undefined)
		} else {
			getDirFiles(dir)
				.then((files) => {
					for (const file of files) {
						const filePath = path.join(dir.toString(), file)
						fs.unlinkSync(filePath)
					}
					resolve(undefined)
				})
				.catch(reject)
		}
	})
}

export function deleteFile(path: PathLike): Promise<void> {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(path)) {
			reject(new Error("File not found"))
		} else {
			fs.unlink(path, (err) => {
				if (err) reject(err)
				else resolve(undefined)
			})
		}
	})
}

export function deleteDir(dir: PathLike): Promise<void> {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dir)) {
			resolve(undefined)
		} else {
			deleteAllDirFiles(dir)
				.then(() =>
					fs.rmdir(dir, (err) => {
						if (err) reject(err)
						else resolve(undefined)
					}),
				)
				.catch(reject)
		}
	})
}

export function saveFile(dir: PathLike, data: Buffer, fileName: string): Promise<void> {
	return new Promise((resolve, reject) => {
		createDirIfNotExists(dir)
			.then(() => {
				const filePath = path.join(dir.toString(), fileName)
				fs.writeFile(filePath, data, (err) => {
					if (err) reject(err)
					else resolve(undefined)
				})
			})
			.catch(reject)
	})
}

export function getFileData(filePath: PathLike): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})
}
