import { Injectable } from "@nestjs/common";
import { CreateSubmissionDto } from "./dto/create-submission.dto";

@Injectable()
export class SubmissionService {
	create(dto: CreateSubmissionDto) {
		console.log("Received submission", dto);
		return { success: true };
	}
}
