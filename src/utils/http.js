import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import Utils from '../utils'
import localforage from 'localforage';

const baseURL = process.env.NODE_ENV === "production" ? "/api/v1" : "http://www.api.local/api/v1"

/**
 * axios发起请求
 * @param config
 * @param params
 * @returns {Promise<unknown>}
 */
export default function (config, data = {}) {
    let url = config.url, fromData = {}
    config.method = config.method ? config.method : "GET"
    if (data) {
        for (let key in data) {
            url = url.replace('{' + key + '}', data[key]);
        }
        if (config.method === 'GET') {
            url += '?' + qs.stringify(data)
        } else {
            fromData = qs.stringify(data);
        }
    }
    let httpConfig = {
        method: config.method,
        baseURL: baseURL,
        url: url,
        data: fromData,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': Cookies.get('token') ? Utils.decodeEntities(Cookies.get('token')) : ''
        },
    }
    return new Promise((resolve, reject) => {
        // if (cache && config.method === 'GET') {
        //     localforage.getItem(url).then(function (value) {
        //         if (value) {
        //             return resolve(value)
        //         } else {
        //             doHttp()
        //         }
        //     }).catch(() => {
        //         doHttp()
        //     })
        // } else {
        //     doHttp()
        // }
        doHttp();

        async function doHttp() {
            axios(httpConfig).then((res) => {
                if (config.method === 'GET') {
                    localforage.setItem(url, res.data)
                }
                return resolve(res.data)
            }).catch((response) => {
                reject(response)
            })
        }
    })
}