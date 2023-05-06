import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as jwt from 'jsonwebtoken';
import config from 'src/config';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(
    email: string,
    name: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      return null;
    }

    const newUser = new this.userModel({ email, name, password });
    await newUser.save();

    const payload = { email: newUser.email, sub: newUser._id };
    return {
      access_token: jwt.sign(payload, config.jwtSecretKey, { expiresIn: '1h' }),
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user = await this.userModel.findOne({ email, password }).exec();
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: jwt.sign(payload, config.jwtSecretKey, { expiresIn: '1h' }),
    };
  }
}
