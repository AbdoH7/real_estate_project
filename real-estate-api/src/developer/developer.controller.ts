import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { ProjectService } from 'src/project/project.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
export class DeveloperController {
  constructor(
    private readonly service: DeveloperService,
    private readonly projectService: ProjectService
  ) {}

  @Post()
  create(@Body() dto: CreateDeveloperDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDeveloperDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get(':id/projects')
  findProjects(@Param('id') id: string) {
    return this.projectService.findByDeveloper(id);
  }
}
