// src/customers/customers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(data: Partial<Customer>) {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  async getAllCustomers() {
    return this.customerRepository.find();
  }

  async getCustomerById(id: number) {
    return this.customerRepository.findOne({ where: { id } });
  }

  async updateCustomer(id: number, data: Partial<Customer>) {
    await this.customerRepository.update(id, data);
    return this.getCustomerById(id);
  }

  async deleteCustomer(id: number) {
    return this.customerRepository.delete(id);
  }
}
