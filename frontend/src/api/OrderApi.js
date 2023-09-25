import { API } from "../config"

export const placeorder=(order)=>{
    return fetch(`${API}/order/placeorder`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(order)
    })
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}

export const printbill = (table) => {
    return fetch(`${API}/order/printbill/${table}`)
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}

export const updatebill = (table) => {
    return fetch(`${API}/order/updatebill/${table}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify()
    })
        .then(res => { return res.json() })
        .catch(error => { console.log(error) })
}