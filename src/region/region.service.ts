import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
   constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
   ){}
  create(createRegionDto: CreateRegionDto) {
    this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId:id,
    })
    if (!region) throw new NotFoundException("Region no encontrado")
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId:id,
      ...updateRegionDto
    })
    if (!regionToUpdate) throw new BadRequestException("Can't update region");
    return this.regionRepository.save(regionToUpdate);
  }

  remove(id: number) {
    return this.regionRepository.delete({
      regionId:id,
    })
  }
}
