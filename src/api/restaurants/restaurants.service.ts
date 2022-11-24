import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserOffer } from '../shared/types/offer';
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
    @InjectModel('UserOffer') private offerModel: Model<UserOffer>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }
  async create(createRestaurantDto: CreateRestaurantDto) {
    const res = await this.restaurantModel.create(createRestaurantDto);
    return { status: 1, data: res, message: 'success' }
  }

  async findAll(userId = null) {
    const allRestaurants = await this.restaurantModel.find().sort({status : 1}).lean().exec();
    let temp = [];
    for (let r of allRestaurants) {
      const offers = await this.offerModel.find({restaurant: r._id, user: userId});
      const t = {
        ...r,
        id: r._id,
        offerId: offers.length ? offers[0]._id: null,
        status: offers.length ? 1 : 0,
      };
      temp.push(t);
    }
    return {
      status: 1,
      data: temp,
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
    // restaurant.activator = user;
    // restaurant.status = OfferType.ACTIVATED;
    // restaurant.activatedAt = new Date();
    
    const newOffer = new this.offerModel({
      user,
      restaurant
    });
    await newOffer.save();

    return {
      status: 1,
      data: {
        ...restaurant.toJSON(),
        offerId: newOffer._id,
        status: 1
      },
      message: 'activated offer'
    }
  }
}
