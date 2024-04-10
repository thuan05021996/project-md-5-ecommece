import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "text"})
    content: string;
    @Column({type: "int"})
    rating: number;
    @ManyToOne(() => ProjectDetail, (projectDetail) => projectDetail.comment)
    @JoinColumn({name: "projectDetail_id"})
    projectDetails: ProjectDetail

    @ManyToOne(() => User, (user) => user.comment)
    @JoinColumn({name: "user_id"})
    user: User
}
