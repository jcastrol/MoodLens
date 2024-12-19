// src/journals/journals.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './entity/journal.entity';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalRepository: Repository<Journal>,
  ) {}

  // Obtener todos los diarios
  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find({ relations: ['user'] });
  }

  // Obtener diarios por usuario
  async findByUser(userUuid: string): Promise<Journal[]> {
    return this.journalRepository.find({
      where: { userUuid },
      relations: ['user'],
    });
  }

  // Eliminar un diario por su ID
  async delete(id: string): Promise<void> {
    await this.journalRepository.delete(id);
  }
}
