import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: any) {
    const result = this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(createCategoryDto)
      .execute();

    return {
      mesage: "Thêm danh mục thành công" ,
      data: result
    }
  }


  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  
  async update(id: number, updateCategoryDto: any) {
    console.log(updateCategoryDto)
   const result = await this.categoryRepository.createQueryBuilder().update().set({
     name : updateCategoryDto.name,
     img_category : updateCategoryDto.img_category
   })
   .where("id = :id", { id: id })
   .execute();
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    // console.log(id)
    this.categoryRepository.createQueryBuilder().delete().from(Category).where("id = :id", { id: id }).execute();
    return "Đã xoá sản phẩm"
  }
}
