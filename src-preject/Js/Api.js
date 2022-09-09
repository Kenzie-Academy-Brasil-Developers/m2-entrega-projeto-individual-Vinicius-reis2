import { indexHtml } from "./index.js"
import { Modals } from "./toastify.js"

export class Api{
    static BaseUrl = "http://localhost:6278/"
    static Header = {
        "content-type": "application/json",
    }
    static token = localStorage.getItem("@KenzieEmpresas:token")
    static uuid = localStorage.getItem("@KenzieEmpresas:uuid")
    static is_admin = localStorage.getItem("@KenzieEmpresas:is_admin")

    static async getCompanies(){
        const response = await fetch(`${this.BaseUrl}companies/`, {
            method: "GET",
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => indexHtml.renderConpanies(resp))

        return response
    }

    static async registerUser(user){
        console.log(user)
        const response = await fetch(`${this.BaseUrl}auth/register/user`,{
            method: 'POST',
            headers: this.Header,
            body: JSON.stringify(user),
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp != 200){
                Modals.modalError(resp.error)
            }else{
                Modals.modalError("Usuario cadastrado com sucesso")
                setTimeout(() => {
                    indexHtml.loginDom()
                }, 3000);
            }
        })
        return response
    }

    static async loginUser(user){
        const response = await fetch(`${this.BaseUrl}auth/login`,{
            method: 'POST',
            headers: this.Header,
            body: JSON.stringify(user),
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp === 200){
                localStorage.setItem("@KenzieEmpresas:token",resp.token)
                localStorage.setItem("@KenzieEmpresas:uuid",resp.uuid)
                localStorage.setItem("@KenzieEmpresas:is_admin",resp.is_admin)
                Modals.modalOkLogin("Usuario valido")
            }else{
                Modals.modalError(resp.error)
            }
            
        })

        return response
    }
} 

await Api.getCompanies()