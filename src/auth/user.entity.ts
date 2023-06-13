import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @BeforeInsert()
  toLowerCase() {
    this.fullName = this.fullName.toLowerCase();
    this.username = this.username.toLowerCase();
    this.imageUrl = `https://ui-avatars.com/api/?name=${this.fullName.replace(
      ' ',
      '+',
    )}&background=random`;
  }

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', unique: true })
  public username!: string;

  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @Column()
  public fullName!: string;

  @Column({ type: 'varchar' })
  public imageUrl!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
