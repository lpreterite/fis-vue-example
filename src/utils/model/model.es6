"use strict";

import 'fetch';

if ('searchParams' in HTMLAnchorElement.prototype) {
    const URLSearchParams = require('url-search-params');
}

class Model{
    constructor(){
        this._options = {
            headers: {
                'Accept': '*/*'
            },
            serverError: {
                '500': '服务器请求失败！(500)'
            }
        };
    }
    options(opts){
        Object.assign(this._options, opts);
    }
    defaults(){
        return {};
    }
    post(url, data){
        let formData = new FormData();
        Object
            .keys(data)
            .map(attr => formData.append(attr, data[attr]));

        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: formData,
            headers: this._options.headers
        }).then(this.handle.bind(this)).catch(this.handle.bind(this));
    }
    get(url, query){
        url+= this.params(query);

        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: this._options.headers
        }).then(this.handle.bind(this)).catch(this.handle.bind(this));
    }
    put(url, data){
        let formData = new FormData();
        Object
            .keys(data)
            .map(attr => formData.append(attr, data[attr]));

        return fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: formData,
            headers: this._options.headers
        }).then(this.handle.bind(this)).catch(this.handle.bind(this));
    }
    delete(url, query){
        url+=this.params(query);

        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: this._options.headers
        }).then(this.handle.bind(this)).catch(this.handle.bind(this));
    }
    params(data){
        if(typeof data === 'undefined' || Object.keys(data) <= 0) return '';
        var params = new URLSearchParams('');
        Object.keys(data).map(function(attr){
            params.append(attr, data[attr]);
        });
        return '?' + params.toString();
    }
    handle(response){
        return new Promise((resolve, reject) => {
            if(response.status === 200){
                resolve(response.json());
            }else if(response.name){
                if(response.name.toLowerCase().indexOf('error') > -1){
                    reject(response);
                }
            }else{
                let message = this._options.serverError[response.status];
                let e = new Error(message || '未知请求错误！');
                e.response = response;
                reject(e);
            }
        });
    }
}

export default Model;
export {fetch, URLSearchParams};