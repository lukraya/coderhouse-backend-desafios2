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

    actualizarProducto(cambios, id) {
        let indiceProd = this.productos.findIndex(prod=>{
            return prod.id == id
        })
        let prodActualizado = {...cambios, id: id}
        return this.productos[indiceProd] = prodActualizado;
    }

    eliminarProducto(id) {
        let indiceProd = this.productos.findIndex(prod=>{
            return prod.id == id
        })
        return this.productos.splice(indiceProd, 1)[0]
    }
}

module.exports= new Producto;