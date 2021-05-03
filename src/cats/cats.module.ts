
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Cats', schema: Cat }])],
    providers: [CatsResolver, CatsService],
})
export class CatsModule {}