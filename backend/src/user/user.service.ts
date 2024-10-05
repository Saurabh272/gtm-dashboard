import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}