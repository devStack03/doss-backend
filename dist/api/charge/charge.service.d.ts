import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
export declare class ChargeService {
    create(createChargeDto: CreateChargeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChargeDto: UpdateChargeDto): string;
    remove(id: number): string;
}
