import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const { email, fullName, password, age } = createUserDto;
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('user already exist');
    }
    const newUser = await this.userModel.create({
      email,
      fullName,
      password,
      age,
    });
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid ID format');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid ID format');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      throw new BadRequestException('user does not exist');
    }
    return {
      message: 'user updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('invalid ID format');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new BadRequestException('user does not exist');
    }
    return {
      message: 'user deleted successfully',
      data: deletedUser,
    };
  }
}
