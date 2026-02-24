import { Module } from "@nestjs/common";
import { SubmissionController } from "./submission.controller";
import { SubmissionService } from "./submission.service";
import { SubmissionValidationPipe } from "./submission-validation.pipe";

@Module({
	controllers: [SubmissionController],
	providers: [SubmissionService, SubmissionValidationPipe],
})
export class SubmissionModule {}
