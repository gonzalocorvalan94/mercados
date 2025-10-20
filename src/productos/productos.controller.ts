import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from 'src/dto/CreateProductDto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  getAll() {
    return this.productosService.getAll();
  }

  @Post()
  createProducto(@Body() producto: Productos) {
    return this.productosService.createProduct(producto);
  }

  @Put(':id')
  updateProducto(@Param('id') id:string, @Body() productoActualizado: Productos){
    return this.productosService.updateProduct(+id, productoActualizado)
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return this.productosService.deleteProducto(+id)
  }
}
