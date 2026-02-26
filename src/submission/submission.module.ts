import { Module } from "@nestjs/common";
import { SubmissionController } from "./submission.controller";
import { SubmissionService } from "./submission.service";
import { SubmissionValidationPipe } from "./pipes/submission-validation.pipe";
import { BullModule } from "@nestjs/bullmq";
import { GoogleSheetsModule } from "../google-sheets/google-sheets.module";
import { SHEETS_QUEUE } from "./constants/queues";
import { SheetsProcessor } from "./processors/sheets.processor";

@Module({
	imports: [
		BullModule.registerQueue({ name: SHEETS_QUEUE }),
		GoogleSheetsModule,
	],
	controllers: [SubmissionController],
	providers: [SubmissionService, SubmissionValidationPipe, SheetsProcessor],
})
export class SubmissionModule {}
