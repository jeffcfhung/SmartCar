import RestClient from 'react-native-rest-client'

export default class CarRestApi extends RestClient {
    constructor() {
        super('http://smartcar_pi3/');
    }
    
    getImage() {
        return null;
    }
    
    setX() {
        
    }
    
    setY() {
        
    }
}