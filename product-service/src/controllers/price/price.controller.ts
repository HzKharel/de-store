import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { PriceService } from '../../services/price/price.service';
import { ManagerGuard } from '../../Guards/ManagerGuard';
import { UpdateProductPriceInterface } from '../../Interfaces/UpdateProductPriceInterface';
import { UpdateProductPromotionInterface } from '../../Interfaces/UpdateProductPromotionInterface';

@Controller('price')
export class PriceController {
  constructor(private priceService: PriceService) {}

  
  @Get('/info')
  getServerStatus() {
    return 'This is the product service - price controller';
  }


  @Put('/updateProductPrice')
  @UseGuards(ManagerGuard)
  updateProductPrice(@Body() productData: UpdateProductPriceInterface) {
    return this.priceService.updateProductPrice(productData);
  }

  @Put('/updateProductPromotion')
  @UseGuards(ManagerGuard)
  updateProductPromotion(@Body() productData: UpdateProductPromotionInterface) {
    return this.priceService.updateProductPromotion(productData);
  }
}
