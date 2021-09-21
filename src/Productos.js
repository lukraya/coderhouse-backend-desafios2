const productController = require('./controller/product')

class Producto {
    productos = []

    async newProd(producto) {
        await productController.createProduct(producto)
    }

    async getProd(id) {
        let prod = await productController.getProduct(id)
        return prod
    }

    get listarProductos() {
        productController.getAllProducts().then(val=>{this.productos = val})
        //console.log(this.productos)
        return this.productos
    }

    async actualizarProducto(id, cambios) {
        await productController.updateProduct(id, cambios)
    }

    async eliminarProducto(id) {
        await productController.deleteProduct(id)
    }
}

module.exports= new Producto;