import { Injectable } from "@nestjs/common";
import { SubmissionData } from "./pipes/submission-validation.pipe";
import { InjectQueue } from "@nestjs/bullmq";
import { SHEETS_QUEUE } from "./constants/queues";
import { Queue } from "bullmq";

@Injectable()
export class SubmissionService {
	constructor(
		@InjectQueue(SHEETS_QUEUE) private readonly sheetsQueue: Queue,
	) {}

	async create(data: SubmissionData): Promise<{ success: boolean }> {
		await this.sheetsQueue.add(
			"append-row",
			{ values: Object.values(data) },
			{
				attempts: 3,
				backoff: {
					type: "exponential",
					delay: 1000,
				},
			},
		);
		return { success: true };
	}
}
