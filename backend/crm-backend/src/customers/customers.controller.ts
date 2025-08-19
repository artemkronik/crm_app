// src/customers/customers.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.customersService.getCustomerById(id);
  }

  @Post()
  create(@Body() data: Partial<Customer>) {
    return this.customersService.createCustomer(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Customer>) {
    return this.customersService.updateCustomer(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customersService.deleteCustomer(id);
  }
}
