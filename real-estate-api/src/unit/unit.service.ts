import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ProjectService } from '../project/project.service';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
    private readonly projectService: ProjectService,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    const existingUnit = await this.unitRepo.findOne({
      where: { code: createUnitDto.code }
    });

    if (existingUnit) {
      throw new ConflictException(`Unit with code "${createUnitDto.code}" already exists`);
    }

    const unit = this.unitRepo.create(createUnitDto);
    
    if (createUnitDto.projectId) {
      const project = await this.projectService.findOne(createUnitDto.projectId);
      unit.project = project;
    }

    return this.unitRepo.save(unit);
  }

  async getMaxValues() {
    const result = await this.unitRepo
      .createQueryBuilder('unit')
      .select('MAX(unit.price)', 'maxPrice')
      .addSelect('MAX(unit.bedroom_count)', 'maxBedrooms')
      .getRawOne();

    return {
      maxPrice: Number(result.maxPrice) || 1000000, // Default if no units exist
      maxBedrooms: Number(result.maxBedrooms) || 10, // Default if no units exist
    };
  }

  async findAll() {
    return this.unitRepo.find({
      relations: ['project', 'project.developer'],
    });
  }

  async findByProject(projectId: string) {
    const units = await this.unitRepo.find({
      where: { project: { id: projectId } },
      relations: ['project', 'project.developer'],
    });

    if (!units.length) {
      throw new NotFoundException(`No units found for project with ID "${projectId}"`);
    }

    return units;
  }

  async findOne(id: string) {
    const unit = await this.unitRepo.findOne({
      where: { id },
      relations: ['project', 'project.developer'],
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID "${id}" not found`);
    }

    return unit;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);

    if (updateUnitDto.projectId) {
      const project = await this.projectService.findOne(updateUnitDto.projectId);
      unit.project = project;
    }

    await this.unitRepo.update(id, {
      ...updateUnitDto,
      project: unit.project,
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const unit = await this.findOne(id);
    return this.unitRepo.remove(unit);
  }

  async findByFilters(filters: {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    furnished?: boolean;
    projectSearch?: string;
    developerSearch?: string;
    search?: string;
    unitName?: string;
    unitCode?: string;
  }) {
    const query = this.unitRepo.createQueryBuilder('unit')
      .leftJoinAndSelect('unit.project', 'project')
      .leftJoinAndSelect('project.developer', 'developer');

    // Specific unit name search
    if (filters.unitName) {
      query.andWhere('unit.name ILIKE :unitName', { unitName: `%${filters.unitName}%` });
    }

    // Specific unit code search
    if (filters.unitCode) {
      query.andWhere('unit.code ILIKE :unitCode', { unitCode: `%${filters.unitCode}%` });
    }

    // General search across unit properties
    if (filters.search) {
      query.andWhere(
        '(unit.name ILIKE :search OR unit.description ILIKE :search OR unit.location ILIKE :search OR unit.code ILIKE :search OR developer.name ILIKE :search OR project.name ILIKE :search)',
        { search: `%${filters.search}%` }
      );
    }

    // Project search
    if (filters.projectSearch) {
      query.andWhere(
        '(project.name ILIKE :projectSearch OR project.description ILIKE :projectSearch)',
        { projectSearch: `%${filters.projectSearch}%` }
      );
    }

    // Developer search
    if (filters.developerSearch) {
      query.andWhere(
        '(developer.name ILIKE :developerSearch OR developer.description ILIKE :developerSearch)',
        { developerSearch: `%${filters.developerSearch}%` }
      );
    }

    if (filters.minPrice) {
      query.andWhere('unit.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters.maxPrice) {
      query.andWhere('unit.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters.minBedrooms) {
      query.andWhere('unit.bedroom_count >= :minBedrooms', { minBedrooms: filters.minBedrooms });
    }

    if (filters.maxBedrooms) {
      query.andWhere('unit.bedroom_count <= :maxBedrooms', { maxBedrooms: filters.maxBedrooms });
    }

    if (filters.furnished !== undefined) {
      query.andWhere('unit.furnished = :furnished', { furnished: filters.furnished });
    }

    // Add ordering
    query.orderBy('unit.created_at', 'DESC');

    return query.getMany();
  }
} 