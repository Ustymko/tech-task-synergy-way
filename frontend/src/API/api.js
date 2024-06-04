import axios from "axios"

export async function baseRequest({urlPath = '', method, body, headers}) {
    let props = {
        method: method,
        url: 'http://backend:8000/server/' + urlPath,
        headers: headers,
        data: body
    }
    return axios(props);
}