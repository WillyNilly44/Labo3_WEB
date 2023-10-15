import Model from './model.js';

export default class CollectionFilterModel extends Model {
    constructor() {
        super();
        this.addField('Type', 'string');
        this.addField('Nom', 'string');
        this.addField('order', 'boolean');
        this.addField('n', 'integer');
        this.addField('i', 'integer');
              
        this.setKey("Type");
    }
}