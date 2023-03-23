import mongoose, { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;
  @Prop({ ref: 'Artist', required: true, unique: true })
  category: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  yearOfIssue: string;
  @Prop()
  image: string | null;
}
