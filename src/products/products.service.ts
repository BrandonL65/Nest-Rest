import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];

  insertProduct(title: string, description: string, price: number) {
    const newProduct = new Product(
      Math.floor(Math.random() * 100).toString(),
      title,
      description,
      price,
    );
    this.products.push(newProduct);
    console.log(this.products);
    return this.products[this.products.length - 1];
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const foundProduct = this.findProduct(id);
    if (foundProduct.message === 'Fail') {
      throw new NotFoundException('We could not find the product.');
    }
    return foundProduct.product;
  }

  updateSingleProduct(id: string) {
    let foundProduct = this.findProduct(id);
    if (foundProduct.message === 'Fail') {
      throw new NotFoundException('We could not find the product to update.');
    }
    let newObjectState = 
  }

  private findProduct(id: string) {
    const foundProduct = this.products.find(
      (eachProduct) => eachProduct.id === id,
    );
    if (!foundProduct) {
      return { message: 'Fail' };
    }
    return {
      product: foundProduct,
      message: 'Success',
    };
  }
}
