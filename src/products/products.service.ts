import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider:true
      }
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOne({
      where: { productId: id },
      relations: ['provider'],
    });
  
    if (!product) throw new NotFoundException();
    return product;
  }
  

  findByProvider(id:string){
    const find = this.productRepository.findBy({
      provider: {
        providerId: id,
      }
    })
    return find;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId:id,
      ...updateProductDto
    })
    console.log(productToUpdate)
    return this.productRepository.save(productToUpdate);
  }

  async remove(id: string) {
    this.productRepository.delete({
    productId:id,
   })
   return {
    message: `Objeto con ${id} eliminado`
   }

  }
}
