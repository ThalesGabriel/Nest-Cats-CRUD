import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('UpdateCatInput')
export class UpdateCatInput {
  @Field({nullable: true})
  readonly name: string;
  @Field({nullable: true})
  readonly breed: string;
  @Field({nullable: true})
  readonly kind: string;
}