import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Blog } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto, userId: string) {
    const { content, title, location } = createBlogDto;
    const createdBlog = await this.blogModel.create({
      author: userId,
      content,
      title,
      location,
    });
    return {
      message: 'post created successfully',
      data: createdBlog,
    };
  }

  async findAll() {
    return this.blogModel.find();
  }
  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadGatewayException('invalid ID format');
    }
    const blog = await this.blogModel.findById(id);
    return blog;
  }
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    if (!isValidObjectId(id)) {
      throw new BadGatewayException('invalid ID format');
    }
    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      id,
      updateBlogDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedBlog) {
      throw new BadGatewayException('blog not found');
    }
    return {
      message: 'blog updated successfully',
      data: updatedBlog,
    };
  }
  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadGatewayException('invalid ID format');
    }
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new BadGatewayException('blog not found');
    }
    return {
      message: 'blog deleted successfully',
      data: deletedBlog,
    };
  }
}
