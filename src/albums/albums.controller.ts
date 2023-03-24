import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Track, TrackDocument } from '../schemas/track.schema';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}
  @Get()
  getAll(@Query() artistId: { [key: string]: string }) {
    if (artistId.artist) {
      const id = artistId.artist;
      return this.albumModel.find({ artist: id });
    }
    return this.albumModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      name: albumDto.name,
      artist: albumDto.artist,
      yearOfIssue: parseInt(albumDto.yearOfIssue),
      image: file ? '/uploads/albums/' + file.filename : null,
    });
    return await album.save();
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findById(id);
    if (album) {
      const tracks = await this.trackModel.find({ album: id });
      if (tracks.length) {
        return { message: "You can't delete an album if they have tracks" };
      }
      await this.albumModel.deleteOne({ _id: id });

      return { message: 'Album deleted' };
    }
    return { message: 'Album not found' };
  }
}
