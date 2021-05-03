import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateCatInput')
export class CreateCatInput {
  @Field()
  readonly name: string;
  @Field()
  readonly breed: string;
  @Field()
  readonly kind: string;
}