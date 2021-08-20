class Producto {
    productos = [];
    id = 0;

    nuevoProd(producto) {        
        this.productos.push({
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            id: ++this.id
        });

        return (this.productos[this.id - 1])
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