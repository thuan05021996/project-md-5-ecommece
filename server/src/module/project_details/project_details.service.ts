import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query } from '@nestjs/common';
import { CreateProjectDetailDto } from './dto/create-project_detail.dto';
import { UpdateProjectDetailDto } from './dto/update-project_detail.dto';
import { ProjectDetail } from './entities/project_detail.entity';
import { Connection, Like, Repository } from 'typeorm';
import { Img } from '../img/entities/img.entity';
import { Product } from '../product/entities/product.entity';
import { log } from 'console';

@Injectable()
export class ProjectDetailsService {
  constructor(
    @InjectRepository(ProjectDetail)
    private projectDetailRepository: Repository<ProjectDetail>,
    @InjectRepository(Img) private imgRepository: Repository<Img>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly connection: Connection,
  ) {}
  async create(createProjectDetailDto: any) {
    console.log(createProjectDetailDto, 'createProjectDetailDto');

    const newImg = await this.imgRepository
      .createQueryBuilder()
      .insert()
      .into(Img)
      .values({
        url: createProjectDetailDto.url,
      })
      .execute();
    // console.log(newImg.raw.insertId, 'newImg')

    const newproduct = await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values({
        name: createProjectDetailDto.name,
        orgin: createProjectDetailDto.orgin,
        descripstion: createProjectDetailDto.description,
      })
      .execute();
    const product_id = newproduct.raw.insertId;
    const img_id = newImg.raw.insertId;

    // log(newproduct, 'newproduct')
    const newProjectDetail = await this.projectDetailRepository
      .createQueryBuilder()
      .insert()
      .into(ProjectDetail)
      .values({
        price: createProjectDetailDto.price,
        product: product_id,
        img: img_id,
        category: createProjectDetailDto.category_id,
        mass: createProjectDetailDto.mass_id,
      });

    await newProjectDetail.execute();
    return 'This action adds a new projectDetail';
  }

  async findOneById(id: number) {
    const results = await this.projectDetailRepository.find({
      relations: ['img', 'product', 'category', 'mass'],
      where: { id: id },
    });
    //  tìm 5 sản phẩm có cùng catelogy id
    // console.log(results[0].category.id)
    const data = await this.findproductBycategoryLimit(results[0].category.id);
    // console.log(data)
    return {
      data: data,
      results: results,
    };
  }

  async search(Query) {
    const { name1 } = Query;
    console.log(name1,"123")
    const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where('product.name like :name1', { name1: `${name1}%` })
      .getMany();
      console.log(results)
    return results
  }

  async findAll(Query: any) {
console.log(Query, "category_id")
//     console.log(Query.oderby, "category_id111111")
    if(Query.oderby === "Rau củ quả" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("category.name = :name", { name: Query.oderby })
      .getMany();
      return results 
    }
    if(Query.oderby === "Thịt tươi sống" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("category.name = :name", { name: Query.oderby })
      .getMany();
      return results 
    }
    if(Query.oderby === "Hàng đông lạnh" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("category.name = :name", { name: Query.oderby })
      .getMany();
      return results 
    }
    if(Query.oderby === "sale" ){
      console.log("sale")
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("product.discount < :discount", { discount: 1 })
      .getMany();
      return results 
    }
    if(Query.oderby === "Thực phẩm khô" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("category.name = :name", { name: Query.oderby })
      .getMany();
      return results 
    }
    if(Query.oderby === "Thuỷ hải sản" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where("category.name = :name", { name: Query.oderby })
      .getMany();
      return results 
    }
    if(Query.oderby === "ASC" && Query.min && Query.max){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where('projectDetail.price BETWEEN :minPrice AND :maxPrice', { minPrice: Query.min, maxPrice: Query.max })
 
      .orderBy('projectDetail.price', "ASC")
      .getMany();
      return results
    } 
    if(Query.oderby === "ASC" ){
      console.log("12")
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      // .where('projectDetail.price BETWEEN :minPrice AND :maxPrice', { minPrice: Query.min, maxPrice: Query.max })
 
      .orderBy('projectDetail.price', "ASC")
      .getMany();
      return results
    } 
    if(Query.oderby === "DESC" && Query.min && Query.max){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .where('projectDetail.price BETWEEN :minPrice AND :maxPrice', { minPrice: Query.min, maxPrice: Query.max })
 
      .orderBy('projectDetail.price', "DESC")
      .getMany();
      return results
    } 
    if(Query.oderby === "DESC" ){
      const results = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img')
      .innerJoinAndSelect('projectDetail.product', 'product')
      .innerJoinAndSelect('projectDetail.category', 'category')
      .innerJoinAndSelect('projectDetail.mass', 'mass')
      .orderBy('projectDetail.price', "DESC")
      .getMany();
      return results
    }

    const results = await this.projectDetailRepository
    .createQueryBuilder('projectDetail')
    .innerJoinAndSelect('projectDetail.img', 'img')
    .innerJoinAndSelect('projectDetail.product', 'product')
    .innerJoinAndSelect('projectDetail.category', 'category')
    .innerJoinAndSelect('projectDetail.mass', 'mass')
    .orderBy('projectDetail.id', "DESC")
    .getMany();
   
    
    return results;
  }

  // tìm kiếm sản phẩm cùng category limit 5
  async findproductBycategoryLimit(id: number) {
    const result = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img') // Inner join with 'img' relation and select its columns
      .innerJoinAndSelect('projectDetail.product', 'product') // Inner join with 'product' relation and select its columns
      .innerJoinAndSelect('projectDetail.category', 'category') // Inner join with 'category' relation and select its columns
      .where('projectDetail.category_id = :categoryId', { categoryId: id }) // Add WHERE clause to filter by category_id
      .limit(6)
      .getMany();

    return result;
  }

  // tìm kiếm sản phẩm cùng category
  async findproductBycategory(id: number) {
    const result = await this.projectDetailRepository
      .createQueryBuilder('projectDetail')
      .innerJoinAndSelect('projectDetail.img', 'img') // Inner join with 'img' relation and select its columns
      .innerJoinAndSelect('projectDetail.product', 'product') // Inner join with 'product' relation and select its columns
      .innerJoinAndSelect('projectDetail.category', 'category') // Inner join with 'category' relation and select its columns
      .innerJoinAndSelect('projectDetail.mass', 'mass') // Inner join with 'category' relation and select its columns
      .where('projectDetail.category_id = :categoryId', { categoryId: id }) // Add WHERE clause to filter by category_id
      .getMany();

    return result;
  }

  async update(id: any, updateProjectDetailDto: UpdateProjectDetailDto) {
    try {
      // console.log("id,", id);
      const { img_id, product_id } = updateProjectDetailDto;
      console.log(updateProjectDetailDto, 'updateProjectDetailDto');

      // Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
      return this.connection.transaction(async (entityManager) => {
        // Cập nhật thông tin chi tiết sản phẩm
        await entityManager
          .createQueryBuilder()
          .update(ProjectDetail)
          .set({
            price: updateProjectDetailDto.price,
            category: updateProjectDetailDto.category_id,
            mass: updateProjectDetailDto.mass_id,
          })
          .where('id = :id', { id })
          .execute();

        // Nếu có sản phẩm mới, cập nhật thông tin sản phẩm

        await entityManager
          .createQueryBuilder()
          .update(Product)
          .set({
            name: updateProjectDetailDto.name,
            orgin: updateProjectDetailDto.orgin,
            descripstion: updateProjectDetailDto.description,
          })
          .where('id = :id', { id: product_id })
          .execute();

        // Nếu có hình ảnh mới, cập nhật thông tin hình ảnh

        await entityManager
          .createQueryBuilder()
          .update(Img)
          .set({ url: updateProjectDetailDto.url })
          .where('id = :id', { id: img_id })
          .execute();

        // Lấy lại thông tin sản phẩm sau khi cập nhật và trả về
        const updatedProductDetail = await entityManager.findOneOrFail(
          ProjectDetail,
          {
            where: {
              id: id,
            },
          },
        );
        const productDetail = await entityManager.findOneOrFail(Product, {
          where: {
            id: product_id,
          },
        });
        const img = await entityManager.findOneOrFail(Img, {
          where: {
            id: img_id,
          },
        });

        return {
          message: 'Đã cập nhật',
          data: {
            productDetail,
            updatedProductDetail,
            img,
          },
        };
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error updating product detail:', error);
      throw error;
    }
  }

  async remove(id: number) {
    // console.log(id,"11")
    await this.projectDetailRepository.delete(id);
    return {
      message: 'Đã xoá sản phẩm thành công',
    };
  }
}
