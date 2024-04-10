import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: any) {
    const newCmt = await this.commentRepository
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        content: createCommentDto.comment,
        rating: createCommentDto.rating,
        projectDetails: createCommentDto.projectDetails,
        user: createCommentDto.user,
      })
      .execute();
    return 'Thêm comment thành công';
  }

    async getAvgRatingProductDetail(id: number) {
      console.log(id)
      const AvgRating = await this.commentRepository
        .createQueryBuilder()
        .select('AVG(comment.rating)', 'rating')
        .where('comment.projectDetail_id = :projectDetail_id', { projectDetail_id: id })
        .getRawOne();
        // console.log(AvgRating)
      return AvgRating
    }

  async getCmtByproductDetail_id(id: number) {
    console.log(id,"111")
    const listCmt = await this.commentRepository.find({
      where: {
        projectDetails: {
          id: id,
        },
      },
      relations: {
        user: true,
      },
    });
    // console.log(listCmt)
    return listCmt
  }

  async update(id: number, updateCommentDto: any) {
    
    await this.commentRepository.createQueryBuilder().update().set({
      content: updateCommentDto.comment,
      rating: updateCommentDto.rating,
    })
    .where('id = :id', { id: id })
    .execute();
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    await this.commentRepository.delete({ id: id });
    return `This action removes a #${id} comment`;
  }
}
