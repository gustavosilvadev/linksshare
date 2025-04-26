import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/services/auth/guards/auth.guard';
import { UserService } from 'src/services/user/user.service';
import { UserAccessService } from 'src/services/user/user-access.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAccessService: UserAccessService
) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto) {

    const checkUser = await this.userService.findUserIdEmail(createUserDto.userName, createUserDto.email);
    if(!checkUser.length) {
        const responseUserService = await this.userService.create(createUserDto);
        this.userAccessService.create(responseUserService.id, createUserDto);
      
        return { message: 'Usuário criado com sucesso!', responseUserService };
    }

    return { message: 'Usuário já cadastrado!' };
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}