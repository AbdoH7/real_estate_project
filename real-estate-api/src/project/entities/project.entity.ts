import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from 'typeorm';
import { Developer } from '../../developer/entities/developer.entity';
import { Unit } from '../../unit/entities/unit.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @ManyToOne(() => Developer, (developer) => developer.projects, { onDelete: 'CASCADE' })
  developer: Developer;

  @OneToMany(() => Unit, unit => unit.project)
  units: Unit[];
}
