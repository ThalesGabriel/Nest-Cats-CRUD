import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { ResponseCatOutput } from './dto/response-cat.output';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { CatModel } from './intefaces/catModel.interface';

@Resolver(of => ResponseCatOutput)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(returns  => [ResponseCatOutput])
  async cats(): Promise<ResponseCatOutput[]> {
    return this.catsService.findAll();
  }

  @Query(returns  => ResponseCatOutput)
  async cat(@Args('id') id: string): Promise<ResponseCatOutput> {
    return this.catsService.findOne(id);
  }

  @Mutation(returns => ResponseCatOutput)
  async createCat(@Args('input') input: CreateCatInput): Promise<ResponseCatOutput> {
    return this.catsService.create(input);
  }

  @Mutation(returns => ResponseCatOutput)
  async updateCat(
    @Args('id') id: string,
    @Args('input') input: UpdateCatInput,
  ) {
    return this.catsService.update(id, input as CatModel);
  }

  @Mutation(returns  => ResponseCatOutput)
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }

  @Query(returns => String)
  async hello() {
    return 'hello';
  }
}