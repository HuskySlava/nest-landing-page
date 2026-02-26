import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { GoogleSheetsService } from "../../google-sheets/google-sheets.service";
import { SHEETS_QUEUE } from "../constants/queues";

@Processor(SHEETS_QUEUE, {
	limiter: { max: 1, duration: 1500 },
})
export class SheetsProcessor extends WorkerHost {
	constructor(private readonly googleSheetsService: GoogleSheetsService) {
		super();
	}

	async process(job: Job<{ values: string[] }>): Promise<void> {
		await this.googleSheetsService.appendRow(job.data.values);
	}
}
