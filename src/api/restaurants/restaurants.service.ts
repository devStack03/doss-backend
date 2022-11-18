import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from '../shared/types/restaurant';
import { UsersService } from '../users/users.service';
import { ActivateOfferDto } from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { OfferType } from './model/restaurant.schema';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }
  async create(createRestaurantDto: CreateRestaurantDto) {
    const res = await this.restaurantModel.create(createRestaurantDto);
    return { status: 1, data: res, message: 'success' }
  }

  async findAll() {
    const allRestaurants = await this.restaurantModel.find().sort({status : 1});
    return {
      status: 1,
      data: allRestaurants,
      message: 'success'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  async findByRestaurantId(restaurantId: string) {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) throw new BadRequestException('Offer Not found');
    return restaurant;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }

  async activate(restaurantId: string, userId: string) {
    const restaurant = await this.findByRestaurantId(restaurantId);
    const user = await this.usersService.findByUserId(userId);
    restaurant.activator = user;
    restaurant.status = OfferType.ACTIVATED;
    restaurant.activatedAt = new Date();
    await restaurant.save();

    return {
      status: 1,
      data: restaurant,
      message: 'activated offer'
    }
  }
}
