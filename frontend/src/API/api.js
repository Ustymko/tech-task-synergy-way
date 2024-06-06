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

export async function saveBank(bank){
    return await baseRequest({
        urlPath: "banks/",
        method: "POST",
        body: bank
    })
}

export async function deleteBank(id){
    return await baseRequest({
        urlPath: `banks/${id}`,
        method: "DELETE"
    })
}

export async function getRandomBank(){
    let props = {
        url: 'https://random-data-api.com/api/v2/banks',
        method: 'GET'
    }
    return axios(props)
}