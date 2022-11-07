import { Model } from 'mongoose';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from '../shared/types/coupon';
import { UsersService } from '../users/users.service';
import { CreateCustomerDto } from '../users/dto/create-user.dto';
export declare class CouponService {
    private couponModel;
    private usersService;
    constructor(couponModel: Model<Coupon>, usersService: UsersService);
    create(createCouponDto: CreateCouponDto): string;
    findAll(): string;
    findOne(id: number): Promise<string>;
    findOneByCode(customer: CreateCustomerDto): Promise<{
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
    }>;
    update(id: number, updateCouponDto: UpdateCouponDto): string;
    remove(id: number): string;
}
