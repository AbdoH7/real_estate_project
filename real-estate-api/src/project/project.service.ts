import { Injectable, NotFoundException } from '@nestjs/common';
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
    const projects = await this.projectRepo.find({ 
      where: { developer: { id: developerId } },
      relations: ['developer']
    });
    if (!projects.length) {
      throw new NotFoundException(`No projects found for developer with ID "${developerId}"`);
    }
    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectRepo.findOne({ 
      where: { id }, 
      relations: ['developer'] 
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(id: string, data: Partial<Project>) {
    const project = await this.findOne(id);
    await this.projectRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    return this.projectRepo.delete(id);
  }
}