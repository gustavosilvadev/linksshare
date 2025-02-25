import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

// import { LinkController } from './link/link.controller';
// import { LinkService } from './link/link.service';

import { LinkModule } from './link/link.module';
import { Link } from './link/link.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // ou o IP do seu servidor PostgreSQL
      port: 5432, // porta padrão do PostgreSQL
      username: 'postgres', // usuário padrão do PostgreSQL
      password: '123456',
      database: 'linksshare', // O nome do banco de dados que você criou
      entities: [User, Link], // Defina suas entidades aqui
      synchronize: true, // Atenção com isso em produção! Ele cria/atualiza tabelas automaticamente.
    }),
    UserModule,
    LinkModule
  ],
  controllers: [],
  providers: [],
})

export class appModule {}