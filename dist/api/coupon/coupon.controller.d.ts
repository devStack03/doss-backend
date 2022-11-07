import { CreateCustomerDto } from '../users/dto/create-user.dto';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(createCouponDto: CreateCouponDto): string;
    findAll(): string;
    findOneByCode(customer: CreateCustomerDto): Promise<{
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
    }>;
    findOne(id: string): Promise<string>;
    update(id: string, updateCouponDto: UpdateCouponDto): string;
    remove(id: string): string;
}
