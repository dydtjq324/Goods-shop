import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { categoryRequestDto } from './dto/cateogry.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(body: categoryRequestDto) {
    const isCategoryExist = await this.categoriesRepository.existByCategory(
      body,
    );
    if (isCategoryExist) {
      throw new UnauthorizedException('해당하는 카테고리는 이미 존재합니다.');
    }
    const category = await this.categoriesRepository.createCategory(body);
    return category;
  }

  async getById(id: string) {
    return await this.categoriesRepository.getById(id);
  }

  async getAllCategories() {
    return await this.categoriesRepository.getAllCategory();
  }

  async deleteÇategory(id: string) {
    return await this.categoriesRepository.deleteCategory(id);
  }

  async updateCategory(id: string, body: categoryRequestDto) {
    return await this.categoriesRepository.updateCategory(id, body);
  }
}
