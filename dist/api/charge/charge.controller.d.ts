import CreateChargeDto from './dto/create-charge.dto';
import StripeService from '../shared/services/stripe.service';
export default class ChargeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCharge(charge: CreateChargeDto, req: any): Promise<void>;
}
