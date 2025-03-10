import { Module } from '@nestjs/common';
import { IntegrationPlatformsService } from './integration_platforms.service';
import { IntegrationPlatformsController } from './integration_platforms.controller';

@Module({
  providers: [IntegrationPlatformsService],
  controllers: [IntegrationPlatformsController]
})
export class IntegrationPlatformsModule {}
