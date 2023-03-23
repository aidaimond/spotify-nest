import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ ref: 'Artist', required: true })
  artist: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  yearOfIssue: string;
  @Prop()
  image: string | null;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
