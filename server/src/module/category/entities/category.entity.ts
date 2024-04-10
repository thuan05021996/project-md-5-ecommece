import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({name : "category"})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable : true,type : "varchar",length : 255})
    name: string;
    @Column({type : "text"})
    img_category: string;

    @OneToMany(() => ProjectDetail, (ProjectDetail) => ProjectDetail.category)
    projectDetails: ProjectDetail
}
