import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(data: Partial<Project>) {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  async findAll() {
    return this.projectRepo.find({ relations: ['developer'] });
  }

  async findByDeveloper(developerId: string) {
    return this.projectRepo.find({ where: { developer: { id: developerId } } });
  }

  async findOne(id: string) {
    return this.projectRepo.findOne({ where: { id }, relations: ['developer'] });
  }

  async update(id: string, data: Partial<Project>) {
    await this.projectRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.projectRepo.delete(id);
  }
}