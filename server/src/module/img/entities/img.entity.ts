import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "img" })
export class Img {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "text"
    })
    url: string;

    @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.img)
    projectDetails: ProjectDetail
   
}
