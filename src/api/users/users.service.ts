import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { User } from '../shared/types/user';
import { CreateCustomerDto, CustomerPortalDto, UserDTO, UserSignupDTO } from './dto/create-user.dto';
import { CredentialsDTO } from '../auth/dto/auth.dto';
import { validateEmail } from '../shared/utils/utils';
import StripeService from '../shared/services/stripe.service';
@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private stripeService: StripeService
    // @Inject(forwardRef(() => EmailConfirmationService)) private emailConfirmationService: EmailConfirmationService
  ) {

  }

  async create(userDTO: UserSignupDTO): Promise<any> {
    const { email } = userDTO;
    const validationResult = validateEmail(email);
    if (!validationResult) {
      throw new HttpException("Email format is incorrect", HttpStatus.BAD_REQUEST);
    }
    // const findEmailRegExp = `^${userDTO.email}$`;
    // const userMatch = await this.userModel.find({
    //   $or: [
    //     {
    //       email: { $regex: findEmailRegExp, $options: "i" }
    //     },
    //     {
    //       phoneNumber: userDTO.phoneNumber
    //     }
    //   ]
    // });
    // let userAlreadyExists: boolean = userMatch.length > 0;
    let userAlreadyExists: boolean = false;
    let errorCode = -2;
    if (!userAlreadyExists) {
      const user = await this.userModel.findOne({ email });
      userAlreadyExists = !!user;
      errorCode = -4;
    }
    if (!userAlreadyExists) {
      const user = await this.findByPhone(userDTO.phoneNumber);
      userAlreadyExists = !!user;
      errorCode = -5;
    }
    if (userAlreadyExists) {
      // const user = userMatch[0];
      // // if (user.emailVerified)
      // throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      // // else {
      // //     return this.emailConfirmationService.sendVerificationLink(user.email)
      // // }
      return { status: errorCode, error: 'user already exists' };
    }
    // eslint-disable-next-line new-cap
    Logger.log(userDTO);

    const newUser = new this.userModel(userDTO);
    try {
      await newUser.validate();
    } catch (e) {
      throw new UnprocessableEntityException(e); // HTTP 422
    }
    try {
      await newUser.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return newUser;
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async findByPhone(phoneNumber: string) {
    const user = await this.userModel.findOne({ phoneNumber });
    return user;
  }
  async findByUserId(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User Not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('User Not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(userId: string, updateUserDto: any): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async setRefreshToken(refreshToken: string, userId: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedRefreshToken
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.userModel.updateOne({ email }, {
      emailVerified: true
    });
  }

  async createCustomer(_customer: CreateCustomerDto) {
    let userAlreadyExists: boolean = false;
    let errorCode = -2;
    if (!userAlreadyExists) {
      const user = await this.userModel.findOne({ email: _customer.email });
      userAlreadyExists = !!user;
      errorCode = -4;
    }
    if (!userAlreadyExists) {
      console.log(_customer.phoneNumber);
      const user = await this.findByPhone(_customer.phoneNumber);
      userAlreadyExists = !!user;
      errorCode = -5;
    }
    if (userAlreadyExists) {
      // const user = userMatch[0];
      // // if (user.emailVerified)
      // throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      // // else {
      // //     return this.emailConfirmationService.sendVerificationLink(user.email)
      // // }
      return { status: errorCode, error: 'user already exists' };
    }
    const { customer, prices } = await this.stripeService.createCustomer(_customer.name, _customer.email);
    return { status: 1, customer, prices };
  }

  async createSubscription(subscriptionDto: any) {
    return this.stripeService.createSubscription(subscriptionDto);
  }

  async createCustomerPortal(customerPortalDto: CustomerPortalDto, userId: string) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.createCustomerPortal(customerPortalDto);
  }

  async getSubscriptionDetail(userId: string) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.getSubscriptionDetail(user.stripeCustomerId);
  }

  async renewSubscription(userId: string) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.renewSubscription(user.stripeCustomerId, user.stripeSubscriptionId);
  }

  async getPriceList() {
    return this.stripeService.priceList();
  }
}