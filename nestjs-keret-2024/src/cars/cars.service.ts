import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  
  constructor(private readonly db: PrismaService){}
  create(createCarDto: CreateCarDto) {
    return this.db.cars.create({
      data: createCarDto
    });
  }

  findAll() {
    return this.db.cars.findMany();
  }
  async rent(carId: number) {
   const car = await this.db.cars.findUnique({
    where: {id: carId}
   })
   if(!car){
    throw new NotFoundException('nincs ilyen autó')
   }
   const start = new Date()
   const end = new Date()
   end.setDate(start.getDate()+7)
   const handlerent = await this.db.rentals.findFirst({
    where:{
      car_id: carId,
      start_date: {lte : start},
      end_date: {gte: start}
    }
   })
   if (handlerent){
    throw new ConflictException('már levan foglalva')
   }
   const rent= await this.db.rentals.create({
    data:{
    car_id:carId,
    start_date: start,
    end_date: end
    }
   })
   return rent
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
