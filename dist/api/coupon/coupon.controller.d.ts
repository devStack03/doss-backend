import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(createCouponDto: CreateCouponDto): string;
    findAll(): string;
    findOneByCode(body: any): Promise<{
        status: number;
        data: string;
        message: string;
    }>;
    findOne(id: string): Promise<string>;
    update(id: string, updateCouponDto: UpdateCouponDto): string;
    remove(id: string): string;
}
