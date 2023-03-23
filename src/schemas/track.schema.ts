import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ ref: 'Album', required: true, unique: true })
  name: string;
  @Prop({ required: true })
  album: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  duration: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
