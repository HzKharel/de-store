import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from '../../services/inventory/inventory.service';
import { ManagerGuard } from '../../Guards/ManagerGuard';
import { AuthGuard } from '../../Guards/AuthGuard';
import { ProductInterface } from '../../Interfaces/ProductInterface';
import { UpdateProductStockInterface } from '../../Interfaces/UpdateProductStockInterface';
import { InternalServiceGuard } from '../../Guards/InternalServiceGuard';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  
  @Get('/info')
  getServerStatus() {
    return process.env;
  }

  @Post('/createNewProduct')
  @UseGuards(ManagerGuard)
  CreateNewProduct(@Body() newProduct: ProductInterface) {
    return this.inventoryService.createNewProduct(newProduct);
  }

  @Get('/allProducts')
  @UseGuards(AuthGuard)
  GetAllProducts() {
    return this.inventoryService.getAllProducts();
  }

  @Delete('/deleteProduct')
  @UseGuards(ManagerGuard)
  DeleteProduct(@Query('productId') productId: string) {
    return this.inventoryService.deleteProduct(productId);
  }

  @Post('/orderProductStock')
  @UseGuards(ManagerGuard)
  OrderProductStock(@Body() productStock: UpdateProductStockInterface) {
    return this.inventoryService.OrderProductStock(productStock);
  }

  @Post('/productDetails')
  @UseGuards(InternalServiceGuard)
  ProductDetails(@Body() products: string[]) {
    return this.inventoryService.getProductDetails(products);
  }

  @Post('/reduceProductQuantity')
  @UseGuards(InternalServiceGuard)
  reduceProductQuantity(
    @Body() products: { productId: string; quantity: number }[],
  ) {
    return this.inventoryService.reduceItemQuantity(products);
  }

  @Put('/updateProduct')
  @UseGuards(ManagerGuard)
  updateProduct(@Body() product: ProductInterface) {
    return this.inventoryService.updateProduct(product);
  }
}
