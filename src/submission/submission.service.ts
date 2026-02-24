import { Injectable } from "@nestjs/common";
import { SubmissionData } from "./pipes/submission-validation.pipe";

@Injectable()
export class SubmissionService {
	create(dto: SubmissionData): { success: boolean } {
		console.log("Received submission", dto);
		return { success: true };
	}
}
