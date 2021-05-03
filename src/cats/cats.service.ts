import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseCatOutput } from './dto/response-cat.output';
import { CreateCatInput } from './dto/create-cat.input';
import { CatModel } from './intefaces/catModel.interface';
import { UpdateCatInput } from './dto/update-cat.input';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cats') private catModel: Model<CatModel>) {}

  async create(createItemDto: CreateCatInput): Promise<ResponseCatOutput> {
    const createdItem = new this.catModel(createItemDto);
    return await createdItem.save() as any;
  }

  async findAll(): Promise<ResponseCatOutput[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<ResponseCatOutput> {
    return await this.catModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<ResponseCatOutput> {
    return await this.catModel.findByIdAndRemove(id);
  }

  async update(id: string, item: UpdateCatInput): Promise<ResponseCatOutput> {
    return await this.catModel.findByIdAndUpdate(id, item, { new: true });
  }
}