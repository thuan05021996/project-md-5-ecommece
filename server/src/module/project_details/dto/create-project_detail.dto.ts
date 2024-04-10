import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProjectDetailDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    // @IsString()
    category_id: Number;

    @IsNotEmpty()
    @IsString()
    mass_id: string;

    @IsNotEmpty()
    @IsString()
    orgin: string;

    @IsNotEmpty()
    @IsNumber()
    price : number;

    @IsNumber()
    product_id : number ;

    @IsNumber()
    img_id : number;



}
