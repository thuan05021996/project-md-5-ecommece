import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectDetailsService } from './project_details.service';
// import { CreateProjectDetailDto } from './dto/create-project_detail.dto';
// import { UpdateProjectDetailDto } from './dto/update-project_detail.dto';
// import { log } from 'console';
// import { AuthGuard } from 'src/auth/guard/auth.guards';
// import { RolesGuard } from 'src/auth/guard/author.guards';

@Controller('api/v1/project-details')
export class ProjectDetailsController {
  constructor(private readonly projectDetailsService: ProjectDetailsService) {}

  @Get("search")
  search(@Query() query: any) {
    console.log("aaa")
    return this.projectDetailsService.search(query);
  }
  @Get("filter")
  fliter(@Query() query: any) {
    console.log("bbb")
    return this.projectDetailsService.findAll(query);
  }
  // @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createProjectDetailDto: any) {
    // console.log("123")
    return this.projectDetailsService.create(createProjectDetailDto);
  }
  @Get()
  findAll(@Query() query: any) {
    console.log(query,"111")
    return this.projectDetailsService.findAll(query);
  }


  @Get(":id")
  findOneById(@Param("id") id: number) {
    return this.projectDetailsService.findOneById(id);
  }

  @Get('/category/:id')
  findOne(@Param('id') id: string) {
    // console.log(id)
    return this.projectDetailsService.findproductBycategory(+id);
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectDetailsService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDetailDto: any) {
    // console.log(updateProjectDetailDto)
    return this.projectDetailsService.update(+id, updateProjectDetailDto);
  }
  
}
