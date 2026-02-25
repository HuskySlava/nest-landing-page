import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleAuth } from "google-auth-library";
import { google, sheets_v4 } from "googleapis";

@Injectable()
export class GoogleSheetsService implements OnModuleInit {
	private readonly logger = new Logger(GoogleSheetsService.name);
	private sheets: sheets_v4.Sheets;

	constructor(private readonly configService: ConfigService) {}

	async onModuleInit() {
		const auth = new GoogleAuth({
			keyFile: this.configService.get<string>("GOOGLE_KEY_FILE"),
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});
		this.sheets = google.sheets({ version: "v4", auth });
		this.logger.log("Google Sheets Service initialized");

		// Integration test
		await this.appendRow(["test", "integration", "works"]);
	}

	async appendRow(values: string[]): Promise<void> {
		const spreadsheetId = this.configService.get<string>(
			"GOOGLE_SPREADSHEET_ID",
		);
		const sheetName = this.configService.get<string>("GOOGLE_SHEET_NAME");

		await this.sheets.spreadsheets.values.append({
			spreadsheetId,
			range: sheetName,
			valueInputOption: "raw",
			requestBody: { values: [values] },
		});
	}
}
