import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { Journal } from './entity/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  controllers: [JournalsController],
  providers: [JournalsService]
})
export class JournalsModule {}
