

export default class CollectionFilter {
    constructor(objectList, params, model) {
        this.objectList = objectList;
        this.params = params;
        this.model = model;
    }
    get()
    {
        if(this.params == null)
        {
            return this.objectList
        }
        //type = this.params[0]
       // if(type=='sort'){
            //sort
       // }
    }
}
