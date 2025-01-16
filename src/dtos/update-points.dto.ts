import { PartialType } from '@nestjs/mapped-types';
import { CreatePoint } from './create-points.dto';
export class UpdatePoint extends PartialType(CreatePoint) {}
