import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Productos } from 'src/dto/CreateProductDto';

@Injectable()
export class ProductosService {
  private dbPath = path.join('src/db/db.json');

  private leerDb() {
    const data = fs.readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  private guardarDb(db: any[]) {
    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  }

  getAll() {
    const data = this.leerDb();
    return data.productos;
  }

  createProduct(nuevoProducto: Productos) {
    const data = this.leerDb();

    const lastId =
      data.productos.length > 0
        ? Math.max(...data.productos.map((p) => p.id))
        : 0;

    const newProducto = {
      id: lastId + 1,
      nombre: nuevoProducto.nombre,
      precio: nuevoProducto.precio,
      categoriaId: nuevoProducto.categoriaId,
      vendedorId: nuevoProducto.vendedorId,
    };

    data.productos.push(newProducto);

    return newProducto;
  }

  updateProduct(id: number, productoUpdate: Productos) {
    const data = this.leerDb();

    const index = data.productos.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`El id que buscas no existe`);
    }

    const productoActualizado = {
      ...data.productos[index],
      ...productoUpdate,
      id,
    };

    data.productos[index] = productoActualizado;

    this.guardarDb(data);

    return productoActualizado;
  }

  deleteProducto(id: number) {
    const data = this.leerDb();

    const index = data.productos.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`El id que queres eliminar no existe`);
    }

    const productoEliminado = data.productos[index]

    data.productos.splice(index, 1);

    this.guardarDb(data);

    return productoEliminado;
  }
}
