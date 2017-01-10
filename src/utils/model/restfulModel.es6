"use strict";

import Model from './model';

class RestfulModel extends Model{
    /**
     * 初始化
     * @param  {String} name         模型名字
     * @param  {Boolean} emulateIdKey 访问地址是否带上id
     * @return {void}              
     */
    constructor(name, emulateIdKey, url){
        super();
        this._api = '';
        this._emulateIdKey = '';

        this.init(name, emulateIdKey, url);
    }

    init(name, emulateIdKey, url){
        if(typeof url !== "undefined") this._api = url;
        if(typeof name !== "undefined") this._api += '/' + name;
        if(typeof emulateIdKey !== "undefined") this._emulateIdKey = emulateIdKey;
    }

    fetch(query){
        return this.get(this.api, query);
    }
    find(id, query){
        return this.get(this.getUrl(id), this._emulateIdKey ? Object.assign({}, query, {id}) : query);
    }
    save(data){
        if(data.hasOwnProperty('id')){
            return this.post(this.api, data);
        }else{
            return this.post(this.getUrl(data.id), data);
        }
    }
    del(id, query){
        return this.delete(this.getUrl(id), this._emulateIdKey ? Object.assign({}, query, {id}) : query);
    }

    getUrl(id){
        return this._emulateIdKey ? this.api : this.api + '/' + id;
    }
    get api(){
        return this._api;
    }
    set api(val){
        this._api = val;
    }
}

export default RestfulModel;