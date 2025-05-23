import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  location: string;

  @Column('jsonb', { default: [] })
  amenities: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  bedroom_count: number;

  @Column()
  bathroom_count: number;

  @Column({ default: false })
  furnished: boolean;

  @Column({ type: 'text', nullable: true })
  main_image_url: string;

  @ManyToOne(() => Project, project => project.units, { nullable: true })
  project: Project;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 