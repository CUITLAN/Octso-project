import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleoyeDto } from './create-empleoye.dto';

export class UpdateEmpleoyeDto extends PartialType(CreateEmpleoyeDto) {}
