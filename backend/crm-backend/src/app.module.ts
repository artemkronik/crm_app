import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-eu-north-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.eqibsckwfphppgbctntt',
      password: 'Artiom100!"',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    CustomersModule,
    UsersModule,
  ],
})
export class AppModule {}
