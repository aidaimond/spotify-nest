import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query() albumId: { [key: string]: string }) {
    if (albumId.album) {
      return this.trackModel.find({ album: albumId.album });
    }
    return this.trackModel.find();
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createTrack(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      name: trackDto.name,
      album: trackDto.album,
      duration: trackDto.duration,
      number: trackDto.number,
    });
    return await track.save();
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    const track = this.trackModel.findById(id);
    if (track) {
      return this.trackModel.deleteOne({ _id: id });
    }
    return { message: 'Track not found' };
  }
}
