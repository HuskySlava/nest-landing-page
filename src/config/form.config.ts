import { registerAs } from "@nestjs/config";

export interface FormFieldConfig {
	name: string;
	label: string;
	type: "string" | "email";
	required: boolean;
	minLength?: number;
	maxLength?: number;
}

export interface FormConfig {
	fields: FormFieldConfig[];
}

export const formConfig = registerAs("form", (): FormConfig => {
	return {
		fields: [
			{
				name: "name",
				label: "Name",
				type: "string",
				required: true,
				minLength: 2,
				maxLength: 100,
			},
			{
				name: "email",
				label: "Email",
				type: "email",
				required: true,
				maxLength: 254,
			},
			{
				name: "message",
				label: "Message",
				type: "string",
				required: true,
				minLength: 1,
				maxLength: 1000,
			},
		],
	};
});
