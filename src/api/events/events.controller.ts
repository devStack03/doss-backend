import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@ApiTags('Event')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.id;
    return this.eventsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Patch('/:id/attend')
  async changeEventState(@Param('id') id: string, @Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    return this.eventsService.changeState(id, userId, +body.state)
  }

  @Patch('/:attendId/cancel_attend')
  async cancelAttendEvent(@Param('attendId') attendId: string, @Req() req: any) {
    const userId = req.user.id;
    return this.eventsService.cancelAttend(attendId, userId)
  }
}
