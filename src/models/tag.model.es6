"use strict";

import RestfulModel from '../utils/model/restfulModel';
import {api} from 'config';

class Tag extends RestfulModel{
    constructor(){
        super('tag', true, api());
    }
    defaults(){
        return {
            title: ''
        };
    }
    search(title){
        return this.fetch({keyword: title, limit: 0});
    }
    fetch(query){
        return this.get(this.api + '/search', Object.assign({}, query));
    }
}

export default new Tag();