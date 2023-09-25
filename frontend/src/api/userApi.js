import { API } from "../config"

export const getmenu=()=>{
    return fetch(`${API}/menu/getmenu`)
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}
export const getmenudetails=(id)=>{
    return fetch(`${API}/menu/getmenudetails/${id}`)
    .then(res=>{return res.json()})
    .catch(error=>{console.log(error)})
}