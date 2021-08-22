const productController = require('./controller/product')

class Producto {
    productos = [];
    id = 0;

    async nuevoProd(producto) {
        await productController.createProduct(producto)
    }

    mostrarProd(id) {
        let prod = this.productos.find(producto =>{
            return producto.id == id
        });
        if (prod == undefined) {
            return '{error: "Producto no encontrado."}'
        }

        return prod
    }

    get listarProductos() {
        productController.listProducts().then(val=>{this.productos = val})
        return this.productos
    }

    async actualizarProducto(cambios, id) {
        await productController.updateProduct(cambios, id)
    }

    async eliminarProducto(id) {
        await productController.deleteProduct(id)
    }
}

module.exports= new Producto;