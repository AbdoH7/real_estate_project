import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private repo: Repository<Developer>,
  ) {}

  create(dto: CreateDeveloperDto) {
    const developer = this.repo.create(dto);
    return this.repo.save(developer);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const developer = await this.repo.findOneBy({ id });
    if (!developer) {
      throw new NotFoundException(`Developer with ID "${id}" not found`);
    }
    return developer;
  }

  async update(id: string, dto: UpdateDeveloperDto) {
    const developer = await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const developer = await this.findOne(id);
    return this.repo.delete(id);
  }

  count() {
    return this.repo.count();
  }
}
