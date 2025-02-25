import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto/create-link.dto';
// import { UpdateLinkDto } from './dto/update-link.dto/update-link.dto';

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link) private linkRepository: Repository<Link>,  // Injeta o repositório de User
    ) {}

    create(createLinkDto: CreateLinkDto): Promise<Link> {
        const link = this.linkRepository.create(createLinkDto);  // Cria uma nova instância de User
        return this.linkRepository.save(link);  // Salva no banco de dados
    }

}
