module.exports = class {
    constructor(data) {
        this.data = data
    }

    find = function () {
        const { fakeMessageList } = this.data
        return new Promise(function (resolve, reject){
            if (fakeMessageList) {
                resolve(fakeMessageList)
            } else {
                reject(new Error('Mock error on findAll'))
            }
        })
    }

    findByIdAndUpdate = function (id, data, options) {
        const { fakeMessageUpdated } = this.data
        return new Promise(function (resolve, reject){
            if (fakeMessageUpdated) {
                if(id === "correctId") {    
                    resolve(fakeMessageUpdated)
                } else resolve(null)
            } else {
                reject(new Error('Mock error on update'))
            }
        })
    }

    create = function (message) {
        const { fakeMessageNew } = this.data
        return new Promise(function (resolve, reject){
            if (fakeMessageNew) {
                resolve(fakeMessageNew)
            } else {
                reject(new Error('Mock error on create'))
            }
        })
    }
}