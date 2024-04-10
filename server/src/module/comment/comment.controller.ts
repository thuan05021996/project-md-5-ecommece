import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: any) {
    // console.log(createCommentDto);
    return this.commentService.create(createCommentDto);
  }

  @Get('list/:id')
  getCmtByproductDetail_id(@Param('id') id: string) {
    return this.commentService.getCmtByproductDetail_id(+id);
  }
  @Get("ratingavg/:id")
  getAvgRatingProductDetail(@Param('id') id: string) {
    return this.commentService.getAvgRatingProductDetail(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    // console.log(id)
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
