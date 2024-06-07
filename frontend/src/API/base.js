import axios from "axios"

export async function baseRequest({urlPath = '', method, body, headers}) {
    let props = {
        method: method,
        url: 'http://localhost:8000/server/' + urlPath,
        headers: headers,
        data: body
    }
    return axios(props);
}

export async function getRandomObjectBaseRequest({urlPath}){
    let props = {
        url: 'https://random-data-api.com/api/v2/' + urlPath,
    }
    return axios(props);
}
