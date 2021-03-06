/**
 * Created by terrence_watson on 6/3/16.
 */

class BaseComponent {
    constructor(defaults){
        //Copy defaults to instance
        Object.keys(defaults).forEach( propertyName => {
            if(typeof this[propertyName] === "undefined") {
                this[propertyName] = defaults[propertyName];
            }
        })
    }    
}

export default BaseComponent;