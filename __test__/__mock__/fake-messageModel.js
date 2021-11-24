module.exports = class {
    constructor(data) {
        this.data = data
    }

    find = function () {
        const {data} = this
        return new Promise(function (resolve, reject){
            if (data) {
                resolve(data)
            } else {
                reject(new Error('Mock error on findAll'))
            }
        })
    }

    create = function (message) {
        const {data} = this
        return new Promise(function (resolve, reject){
            if (data) {
                resolve(data)
            } else {
                reject(new Error('Mock error on create'))
            }
        })
    }
}