import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import {
	SubmissionValidationPipe,
	type SubmissionData,
} from "./pipes/submission-validation.pipe";

@Controller("submissions")
export class SubmissionController {
	constructor(private readonly submissionService: SubmissionService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(SubmissionValidationPipe)
	create(@Body() data: SubmissionData): object {
		return this.submissionService.create(data);
	}
}
