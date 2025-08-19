// src/customers/customer.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string; // שם הלקוח

  @Column({ length: 255, nullable: true })
  email?: string; // אימייל

  @Column({ length: 50, nullable: true })
  phone?: string; // טלפון

  @Column({ length: 100, default: 'New' })
  status: string; // סטטוס (New, Active, Inactive...)

  @Column('text', { nullable: true })
  notes?: string; // הערות נוספות

  @CreateDateColumn()
  createdAt: Date; // תאריך יצירה אוטומטי

  @UpdateDateColumn()
  updatedAt: Date; // תאריך עדכון אוטומטי
}
