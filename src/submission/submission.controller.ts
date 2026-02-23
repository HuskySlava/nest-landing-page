import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";

@Controller("submissions")
export class SubmissionController {
	constructor(private readonly submissionService: SubmissionService) {}

	@Post()
	@HttpCode(201)
	create(@Body() dto: CreateSubmissionDto): object {
		return this.submissionService.create(dto);
	}
}
