import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SubmissionModule } from "./submission/submission.module";
import { formConfig } from "./config/form.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [formConfig],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "..", "public"),
			serveRoot: "/",
		}),
		SubmissionModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
