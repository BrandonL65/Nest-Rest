import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Array<Product> = [];

  insertProduct(title: string, description: string, price: number) {
    const newProduct = new Product(
      new Date().toString(),
      title,
      description,
      price,
    );
    this.products.push(newProduct);
    console.log(this.products);
    return this.products[this.products.length - 1];
  }
}
