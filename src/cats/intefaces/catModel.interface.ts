import { Document } from 'mongoose';

export interface CatModel extends Document {
    readonly name: string;
    readonly kind: string;
    readonly breed: string;
}