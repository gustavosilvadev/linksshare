
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,  // Injeta o repositório de User
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);  // Cria uma nova instância de User
        return this.userRepository.save(user);  // Salva no banco de dados
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();  // Retorna todos os usuários
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { id: Number(id) },
        });

        if(!user) {
            throw new Error('User not found');
        }else{
            return user;
        }

    }


    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        await this.userRepository.update(id, updateUserDto);  // Atualiza o usuário
        
        return this.userRepository.findOne({ 
            where: { id : Number(id) }
        });  // Retorna o usuário atualizado
    }


    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);  // Deleta o usuário
    }
}
