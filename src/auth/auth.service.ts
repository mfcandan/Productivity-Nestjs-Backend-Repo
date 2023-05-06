import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(email: string, name: string, password: string): Promise<User> {
    const newUser = new this.userModel({ email, name, password });
    return newUser.save();
  }

  async login(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }
}
