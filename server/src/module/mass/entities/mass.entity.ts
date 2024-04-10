import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "mass" })
export class Mass {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type : "decimal", precision: 10, scale: 2 ,default: 1})
    size: number;
    @Column()
    name: string;

    @OneToMany((type) => ProjectDetail, (ProjectDetail) => ProjectDetail.mass)
    projectDetails: ProjectDetail
}
