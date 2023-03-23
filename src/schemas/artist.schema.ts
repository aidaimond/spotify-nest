import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop()
  info: string;
  @Prop()
  image: string | null;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
