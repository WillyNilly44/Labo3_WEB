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
