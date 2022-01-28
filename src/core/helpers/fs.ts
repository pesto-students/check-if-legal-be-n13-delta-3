import { COPYFILE_FICLONE_FORCE } from "constants"
import { PathLike } from "fs"
import fs from "fs/promises"

export async function copyFile({ src, dest }: { src: PathLike; dest: PathLike }) {
	await fs.copyFile(src, dest, COPYFILE_FICLONE_FORCE)
}
