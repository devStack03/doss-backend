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
import { UserDTO, UserSignupDTO } from './dto/create-user.dto';
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
        // const validationResult = validateEmail(email);
        // if (!validationResult) {
        //     throw new HttpException("Email format is incorrect", HttpStatus.BAD_REQUEST);
        // }
        const findEmailRegExp = `^${userDTO.email}$`;
        const userMatch = await this.userModel.find({ email: { $regex: findEmailRegExp, $options: "i" } });
        let userAlreadyExists: boolean = userMatch.length > 0;
        if (!userAlreadyExists) {
            const user = await this.userModel.findOne({ email });
            userAlreadyExists = !!user;
        }
        if (userAlreadyExists) {
            const user = userMatch[0];
            // if (user.emailVerified)
                throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
            // else {
            //     return this.emailConfirmationService.sendVerificationLink(user.email)
            // }
        }
        // eslint-disable-next-line new-cap
        Logger.log(userDTO);
        const stripeCustomer = await this.stripeService.createCustomer(userDTO.fullName, userDTO.email);
        userDTO.stripeCustomerId = stripeCustomer.id;
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
        return this.userModel.findOne({ email: email }).select("email password emailVerified").lean().exec();
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
}