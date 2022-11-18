/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        status: number;
        data: import("../shared/types/restaurant").Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findAll(): Promise<{
        status: number;
        data: (import("../shared/types/restaurant").Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: string;
    }>;
    findOne(id: string): string;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: string): string;
    activateOffer(id: string, req: any): Promise<{
        status: number;
        data: import("../shared/types/restaurant").Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
}
