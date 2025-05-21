import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, dto: UpdateDeveloperDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  count() {
    return this.repo.count();
  }
}
