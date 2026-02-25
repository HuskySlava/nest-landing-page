import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SubmissionModule } from "./submission/submission.module";
import { formConfig } from "./config/form.config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [formConfig],
		}),
		ThrottlerModule.forRootAsync({
			useFactory: (configService: ConfigService) => [
				{
					ttl: configService.get<number>("THROTTLE_TTL")!,
					limit: configService.get<number>("THROTTLE_LIMIT")!,
				},
			],
			inject: [ConfigService],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "..", "public"),
			serveRoot: "/",
		}),
		SubmissionModule,
		GoogleSheetsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
