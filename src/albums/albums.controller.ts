import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}
  @Get()
  async getAll(@Query() artistId: { [key: string]: string }) {
    return console.log(artistId.artist);
  }

  @Get()
  async getOne(@Param('id') id: string) {
    return this.albumModel.findById({ _id: id });
  }

  @Post()
  async createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      name: albumDto.name,
      artist: albumDto.artist,
      yearOfIssue: albumDto.yearOfIssue,
      image: file ? '/uploads/products/' + file.filename : null,
    });
    return album.save();
  }
}
