var list = [];

function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
            .objectStore(storeName) // 仓库对象
            .add(data)

        request.onsuccess = function (event) {
            resolve(event)
        }

        request.onerror = function (event) {
            throw new Error(event.target.error)
            reject(event)
        }
    })
}
function openDB(dbName, storeName, version = 30) {
    return new Promise((resolve, reject) => {
        let indexedDB = window.indexedDB
        let db
        const request = indexedDB.open(dbName, version)
        request.onsuccess = function (event) {
            db = event.target.result // 数据库对象
            resolve(db)
        }

        request.onerror = function (event) {
            reject(event)
        }

        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log('onupgradeneeded')
            db = event.target.result // 数据库对象
            let objectStore

            if (!db.objectStoreNames.contains(storeName)) {
                objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
                // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
            }
        }
    })
}
function getDataAll(db, storeName) {
    let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    var request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onerror = function (e) {
            reject(e)
        }
        request.onsuccess = function (e) {
            resolve(request.result)
        }
    })
}

function updateDB(db, storeName, data) {
    let request = db.transaction([storeName], 'readwrite') // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data)

    return new Promise((resolve, reject) => {
        request.onsuccess = function (ev) {
            resolve(ev)
        }

        request.onerror = function (ev) {
            resolve(ev)
        }
    })
}
openDB("hcfy", "favorites").then((db) => {
    // getDataAll(db, "favorites").then((res) => { console.log(JSON.stringify(res)); })
    list.forEach((v, k) => {
        updateDB(db, "favorites", v).then((res) => { console.log("更新成功"); });
    })

})