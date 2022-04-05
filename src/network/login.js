import {request} from './request'

export function getOssInfos () {
    return request({ 
        url:'/',
        method:'get',
    })
}
