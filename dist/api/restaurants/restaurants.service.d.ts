import { Model } from 'mongoose';
import { Restaurant } from '../shared/types/restaurant';
import { UsersService } from '../users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsService {
    private restaurantModel;
    private usersService;
    constructor(restaurantModel: Model<Restaurant>, usersService: UsersService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        status: number;
        data: Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findAll(): Promise<{
        status: number;
        data: (Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
    }>;
    findOne(id: number): string;
    findByRestaurantId(restaurantId: string): Promise<Restaurant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: number): string;
    activate(restaurantId: string, userId: string): Promise<{
        status: number;
        data: Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
}
