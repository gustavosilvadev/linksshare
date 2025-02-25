import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @UpdateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}