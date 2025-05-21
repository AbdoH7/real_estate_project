import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  findAll(
    @Query('minPrice', new ParseIntPipe({ optional: true })) minPrice?: number,
    @Query('maxPrice', new ParseIntPipe({ optional: true })) maxPrice?: number,
    @Query('minBedrooms', new ParseIntPipe({ optional: true })) minBedrooms?: number,
    @Query('maxBedrooms', new ParseIntPipe({ optional: true })) maxBedrooms?: number,
    @Query('furnished', new ParseBoolPipe({ optional: true })) furnished?: boolean,
  ) {
    if (minPrice || maxPrice || minBedrooms || maxBedrooms || furnished !== undefined) {
      return this.unitService.findByFilters({
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        furnished,
      });
    }
    return this.unitService.findAll();
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.unitService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitService.update(id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.unitService.remove(id);
  }
} 