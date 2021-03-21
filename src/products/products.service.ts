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

  updateSingleProduct(
    valuesToUpdate: { title?: string; description?: string; price?: number },
    id: string,
  ) {
    let foundProduct = this.findProduct(id);
    if (foundProduct.message === 'Fail') {
      throw new NotFoundException('We could not find the product to update.');
    }
    let newlyConstructedProduct = {
      ...foundProduct['product'],
      ...valuesToUpdate,
    };
    this.products[foundProduct.index] = newlyConstructedProduct;
    return this.products;
  }

  deleteSingleProduct(id: string) {
    let foundProduct = this.findProduct(id);
    if (foundProduct.message === 'Fail') {
      throw new NotFoundException('We could not find that product to delete.');
    }

    let productIndexToDelete = foundProduct.index;
    let productToDelete = foundProduct.product;
    let leftHalf = this.products.slice(0, productIndexToDelete);
    let rightHalf = this.products.slice(productIndexToDelete + 1);
    this.products = leftHalf.concat(rightHalf);
    return productToDelete;
  }

  private findProduct(id: string) {
    const foundProductIndex = this.products.findIndex(
      (eachProduct) => eachProduct.id === id,
    );
    const foundProduct = this.products[foundProductIndex];
    if (!foundProduct) {
      return { message: 'Fail' };
    }
    return {
      product: foundProduct,
      index: foundProductIndex,
      message: 'Success',
    };
  }
}
