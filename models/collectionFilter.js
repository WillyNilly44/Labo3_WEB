export default class CollectionFilter {
    constructor(objectList, params, model) {
        this.objectList = objectList;
        this.params = params;
        this.model = model;
    }
    get() {
        let newObjects = [];
        let type;
        let type2;
        let value;
        let offset;
        let limit;

        if (this.params == null) {
            return this.objectList
        }
        if (Object.keys(this.params).length == 1) {
            type = Object.keys(this.params)[0];
            value = this.params[type]
        }
        else if (Object.keys(this.params).length == 2) {
            type = Object.keys(this.params)[0];
            type2 = Object.keys(this.params)[1];
            limit = this.params[type];
            offset = this.params[type2];
        }
        //console.log()
        if (type2 != undefined) {
            if (type == 'limit' && type2 == 'offset') {
                let index = parseInt(offset);
                let newList = [];
                let nogo = parseInt(limit) + parseInt(offset);
                while (index < nogo) {
                    newList.push(this.objectList[index])
                    index++;
                }
                return newList;
            }
        }
        if (type == 'sort') {
            this.objectList.sort(function (a, b) {
                return innerCompare(a[value], b[value])
            })
            return this.objectList;
        }
        if (this.model.isMember(type)) {
            if (value.startsWith('*') && value.endsWith('*')) {
                newValue = value.substring(1, value.length - 1);
                for (let filtered of this.objectList) {
                    if (filtered[type].includes(newValue)) {
                        newObjects.push(filtered);
                    }
                };
                return newObjects;
            }
            else if (value.startsWith('*')) {
                let newValue = value.substring(1);
                for (let filtered of this.objectList) {
                    if (filtered[type].endsWith(newValue)) {
                        newObjects.push(filtered);
                    }
                };
                return newObjects;
            }
            else if (value.endsWith('*')) {
                let newValue = value.substring(0, value.length - 1);
                for (let filtered of this.objectList) {
                    if (filtered[type].startsWith(newValue)) {
                        newObjects.push(filtered);
                    }
                };
                return newObjects;
            }
            else {
                for (let filtered of this.objectList) {
                    if (filtered[type] == value) {
                        newObjects.push(filtered);
                    }
                };
                return newObjects;
            }



        }

    }

}
function compareNum(x, y) {
    if (x === y) { return 0; }
    else if (x < y) { return -1; }
    return 1;
}
function innerCompare(x, y) {
    if ((typeof x) === 'string') {
        return x.localeCompare(y);
    }
    else {
        return compareNum(x, y);
    }
}
function valueMatch(value, searchValue) {
    try {
        let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
        return new RegExp(exp).test(value.toString().toLowerCase());
    } catch (error) {
        console.log(error);
        return false;
    }
}
