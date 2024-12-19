// src/journals/journals.controller.ts

import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { Journal } from './entity/journal.entity';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  // Ruta para obtener todos los diarios
  @Get()
  async findAll(): Promise<Journal[]> {
    return this.journalsService.findAll();
  }
  // Ruta para obtener diarios por usuario
  @Get('user/:userUuid')
  async findByUser(@Param('userUuid') userUuid: string): Promise<Journal[]> {
    return this.journalsService.findByUser(userUuid);
  }
  // Ruta para eliminar un diario por su ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.journalsService.delete(id);
  }
}
