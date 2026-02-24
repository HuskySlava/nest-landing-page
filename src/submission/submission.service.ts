import { Injectable } from "@nestjs/common";
import { SubmissionData } from "./submission-validation.pipe";

@Injectable()
export class SubmissionService {
	create(dto: SubmissionData) {
		console.log("Received submission", dto);
		return { success: true };
	}
}
