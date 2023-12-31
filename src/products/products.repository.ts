import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from './products.schema';
import { ProductRequestDto } from './dto/product.reqest.dto';
import { reviewDto } from './dto/prdouct.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}

  async create(product: ProductRequestDto) {
    return await this.productsModel.create(product);
  }

  async getAllProducts() {
    return await this.productsModel.find();
  }

  async getTopNineReviewProduct() {
    return await this.productsModel.find().sort({ reviewCNT: -1 }).limit(9);
  }

  async getDetailProduct(productId: string) {
    const product = await this.productsModel.findById(productId);
    return product;
  }

  async getRecentProduct() {
    const products = await this.productsModel
      .find()
      .sort({ createdAt: -1 })
      .limit(3);
    return products;
  }

  async getCategory(category: string) {
    const products = await this.productsModel.find({ category });
    return products;
  }

  async uploadProductImg(_id: string, filesName: string[]) {
    const product = await this.productsModel.findById(_id);
    if (product) {
      for (let i = 0; i < filesName.length; i++) {
        product.imgUrl.push(`${filesName[i]}`);
      }
      return product.save();
    } else {
      new HttpException('db error 해당하는 상품 ID는 없어요 ㅇㅋ?', 400);
    }
  }

  async deleteProduct(_id: string) {
    return await this.productsModel.deleteOne({ _id });
  }

  async updateProduct(_id: string, body: ProductRequestDto) {
    const product = await this.productsModel.findById({ _id });
    product.name = body.name;
    product.quantity = body.quantity;
    product.manufacture = body.manufacture;
    product.category = body.category;
    product.price = body.price;
    product.content = body.content;
    return product.save();
  }

  async orderDecide(_id: string, body: reviewDto) {
    const product = await this.productsModel.findById({ _id });
    product.reviewCNT = body.reviewCNT;
    product.reviewAVG = body.reviewAVG;
    product.review.push(body.reviewcontent);
    return product.save();
  }
}
