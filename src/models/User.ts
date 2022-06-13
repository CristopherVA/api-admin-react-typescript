import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @Column()
    firstLastName: string;

    @Column({type: 'varchar'})
    secondLastName: string;

    @Column({type: 'bigint', }) 
    cedula: string;

    @Column({ type: "bigint"   })
    edad: number;

    @Column({type: 'varchar'})
    gender: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'bigint'})
    telephone: number;

    @Column({type:'varchar', unique: true})
    email: string;
    
    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    civilStatu: string;

    @Column({type: 'varchar'})
    haveChild: string;

    @Column()
    dateBirth: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
