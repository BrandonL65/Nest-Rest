import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productsService.insertProduct(title, description, price);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id);
  }

  @Patch('id')
  updateSingleProduct(@Param('id') id: string) {
    let response = this.productsService.updateSingleProduct(id);
  }
}
