import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
  })
  endpoint: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  expirationTime: string;

  @Column({
    type: 'text',
  })
  p256dh: string;

  @Column({
    type: 'text',
  })
  auth: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
