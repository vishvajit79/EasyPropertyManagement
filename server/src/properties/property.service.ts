import {PropertyDAO} from './property.dao';
import {Property} from './property.model';

export class PropertyService {

    constructor(
        private dao = new PropertyDAO()
    ) {
    }

    /**
     * List all properties from the flat file
     * @param query
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<Property[]>}
     */
    public listProperties(
        query: any = {},
        offset: number = 0,
        limit: number = 10
    ): Promise<Property[]> {
        return this.dao.query(query, offset, limit);
    }

    /**
     * Get Specific property from the flat file filter by id
     * @param {string} id
     * @returns {Promise<Property>}
     */
    public getPropertyId(
        id: string = ''
    ): Promise<Property> {
        return this.dao.getProperty(id);
    }

    /**
     * Insert new property to the file
     * @param query
     * @returns {Promise<String>}
     */
    public insertProperty(
        query: any= {}
    ):Promise<String> { return this.dao.insert(query); };

}
