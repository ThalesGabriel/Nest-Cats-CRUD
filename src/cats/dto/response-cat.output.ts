import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType('CatResponse')
export class ResponseCatOutput {

  @Field(() => ID)
  @IsString()
  readonly id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly kind: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly breed: string;
}