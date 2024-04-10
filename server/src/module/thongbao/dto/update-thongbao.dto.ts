import { PartialType } from '@nestjs/mapped-types';
import { CreateThongbaoDto } from './create-thongbao.dto';

export class UpdateThongbaoDto extends PartialType(CreateThongbaoDto) {}
