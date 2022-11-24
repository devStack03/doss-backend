import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ActivateOfferDto } from './dto';

@ApiTags('Restaurant')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.restaurantsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }

  // @Patch('/:id/activate')
  // async activateOffer(@Param('id') id: string, @Req() req: any) {
  //   const userId = req.user.id;
  //   return this.restaurantsService.activate(id, userId);
  // }

  @Post('/:id/activate')
  async activateOffer(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.restaurantsService.activate(id, userId);
  }
}
