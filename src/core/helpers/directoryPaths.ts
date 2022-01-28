import path from "path"

export function getLawyerIdProofsDirPath(lawyerId: number) {
	return path.join("storage", "lawyer", `${lawyerId}`, "idProofs")
}
