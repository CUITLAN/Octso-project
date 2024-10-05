import { PartialType } from '@nestjs/swagger';
import { CreateEmpleoyeDto } from './create-empleoye.dto';

export class UpdateEmpleoyeDto extends PartialType(CreateEmpleoyeDto) {}
