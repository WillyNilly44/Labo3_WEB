export default class CollectionFilter {
    constructor(objectList, params, model) {
        this.objectList = objectList;
        this.params = params;
        this.model = model;
    }
    get() {
        let newObjects = [];
        if (this.params == null) {
            return this.objectList
        }
        let type = Object.keys(this.params)[0]
        let value = this.params[type]

        console.log()

        if(type == 'sort')
        {
            this.objectList.sort(function(a,b){
                return innerCompare(a[value],b[value])
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
compareNum(x,y)
{
    if (x === y) {return 0;}
    else if(x < y){return -1;}
    return 1;
}
innerCompare(x, y)
{
    if ((typeof x) === 'string')
    {
        return x.localeCompare(y);
    }
    else
    {
        return compareNum(x, y);
    }
} 
