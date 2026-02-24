import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FormConfig, FormFieldConfig } from "../../config/form.config";

export type SubmissionData = Record<string, string>;

@Injectable()
export class SubmissionValidationPipe implements PipeTransform {
	constructor(private readonly configService: ConfigService) {}

	transform(body: unknown): SubmissionData {
		if (typeof body !== "object" || body === null || Array.isArray(body)) {
			throw new BadRequestException("Request body must be a JSON object");
		}

		const input = body as Record<string, unknown>;
		const fields: FormFieldConfig[] = (
			this.configService.get("form") as FormConfig
		).fields;
		const errors: string[] = [];
		const result: SubmissionData = {};

		const allowedNames = new Set(fields.map((f) => f.name));
		for (const key of Object.keys(input)) {
			if (!allowedNames.has(key)) {
				errors.push(`Property "${key}" is not allowed`);
			}
		}

		for (const field of fields) {
			const value = input[field.name];

			if (
				field.required &&
				(value === undefined || value === null || value === "")
			) {
				errors.push(`${field.label} is required`);
				continue;
			}

			if (value === undefined || value === null) continue;

			if (typeof value !== "string") {
				errors.push(`${field.label} must be a string`);
				continue;
			}

			if (
				field.type === "email" &&
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
			) {
				errors.push(`${field.label} must be a valid email address`);
			}

			if (
				field.minLength !== undefined &&
				value.length < field.minLength
			) {
				errors.push(
					`${field.label} must be at least ${field.minLength} characters`,
				);
			}

			if (
				field.maxLength !== undefined &&
				value.length > field.maxLength
			) {
				errors.push(
					`${field.label} must not exceed ${field.maxLength} characters`,
				);
			}

			result[field.name] = this.sanitize(value);
		}

		if (errors.length > 0) {
			throw new BadRequestException(errors);
		}

		return result;
	}

	private sanitize(value: string): string {
		return value.replace(/<[^>]*>/g, "").trim();
	}
}
