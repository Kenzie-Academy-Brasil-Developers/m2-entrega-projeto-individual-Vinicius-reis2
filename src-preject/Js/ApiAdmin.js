import { Departments } from "./departments.js"
import { Employees } from "./employees.js"
import { renderSectors } from "./renderSectors.js"
import { companySearch } from "./searchCompany.js"
import { Modals } from "./toastify.js"


class CheckTooken{
    static async CheckTooken(){
        if(!localStorage.getItem("@KenzieEmpresas:token")){
            setInterval((e) => {
                window.location.replace("../../index.html")
            }, 1)
        }
    }
}

CheckTooken.CheckTooken()

export class ApiAdmin{

    static BaseUrl = "http://localhost:6278/"
    static Header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@KenzieEmpresas:token")}`,
    }

    static async getSectors(){
        const response = await fetch(`${this.BaseUrl}sectors/`,{
            method: "GET",
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => renderSectors.adminRenderSectors(resp))
        .catch(err => err)

        return response
    }

    static async getCompanies(){
        const response = await fetch(`${this.BaseUrl}companies/`, {
            method: "GET",
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            renderSectors.renderCompanies(resp) 
            companySearch.companySearchInput(resp)
            Departments.CallCompanies(resp)
            Departments.ListDepartments(resp)
        })

        return response
    }

    static async registerNewCompany(data){
        const response = await fetch(`${this.BaseUrl}companies`,{
            method: "POST",
            headers: this.Header,
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.success){
                Modals.modalOkLogin("Empresa cadastrada com sucesso")
            }
        })
        .catch(err => console.error(err))

        return response
    }

    static async createDepartments(data){
        const response = await fetch(`${this.BaseUrl}departments/`,{
            method: 'POST',
            headers: this.Header,
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(!resp.error){
                Modals.modalOkLogin("Departamento criado!")
            }else{
                Modals.modalError(resp.error)
            }
        })

        return response
    }

    static async ListDepartments(data){
        const response = await fetch(`${this.BaseUrl}departments/${data}`,{
            method: 'GET',
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            Employees.listdepartments(resp)
            if(resp.length <= 0 ){
                Modals.modalError("Nenhum departamento encontrado para está empresa")
            }else{
                Modals.modalOkLogin("Departamentos listados")
            }
            const tagUl = document.querySelector(".listDepartments ul")
            tagUl.innerHTML = "";
            resp.forEach((e) => {
                const tagLi = document.createElement("li")
                tagLi.setAttribute("class", "listDepartmentsUlLi")
                const tagH3 = document.createElement("h3")
                tagH3.innerText = `Departamento:   ${e.name}`
                
                const tagP = document.createElement("p")
                tagP.innerText = `descripition: ${e.description}`

                tagLi.append(tagH3, tagP);
                tagUl.append(tagLi)
            });
        })

        return response
    }

    static async CallUsers(){
        const response = await fetch(`${this.BaseUrl}users/`, {
            method: 'GET',
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            Departments.RegistredUsers(resp)
            Employees.ListUser(resp)
            Employees.DemissEmployee(resp)
        })

        return response
    }

    static ButtonExit(){
        const button = document.querySelector("header button")
        button.addEventListener("click", (e) => {
            e.preventDefault()
            localStorage.clear()
            window.location.assign("../../index.html")
        })
    }

    static async CallDepartments(){
        const response = await fetch(`${this.BaseUrl}departments/`,{
            method: 'GET',
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            Departments.SearchDepartments(resp)
            Departments.DeletDerp(resp)
            Departments.EditDerp(resp)
        })

        return response
    }

    static async DeletDepartments(data){
        const response = await fetch(`${this.BaseUrl}departments/${data}`,{
            method: 'DELETE',
            headers: this.Header,
        })
        .then(resp => resp.json())
        .then(resp => {
            if(!resp.error){
                Modals.modalOkLogin("Departamento apagado")
            }
        })

        return response
    }

    static async EditDepartments(data, uuid){
        const response = await fetch(`${this.BaseUrl}departments/${uuid}`,{
            method: 'PATCH',
            headers: this.Header,
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(!resp.error){
                Modals.modalOkLogin(resp)
            }else{
                Modals.modalError(resp.error)
            }
        })
        
        return response
    }

    static async ListDepartmentsEmployees(){
        const response = await fetch(`${this.BaseUrl}departments/`,{
            method: 'GET',
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            Employees.listdepartments(resp)
        })

        return response
    }

    static async ContEmployees(data){
        const response = await fetch(`${this.BaseUrl}departments/hire/`,{
            method: 'PATCH',
            headers: this.Header,
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(!resp.error){
                Modals.modalOkLogin("Usuário contratado")
            }else{
                Modals.modalError(resp.error)
            }
        })
        .then(err => err)

        return response
    }

    static async DemissEmployee(data){
        const response = await fetch(`${this.BaseUrl}departments/dismiss/${data}`,{
            method: 'PATCH',
            headers: this.Header
        })
        .then(resp => resp.json())
        .then(resp => {
            if(!resp.error){
                Modals.modalOkLogin("Usuario demitido")
            }else{
                Modals.modalError(resp.error)
            }
        })

        return response
    }
}

await ApiAdmin.getSectors()
await ApiAdmin.getCompanies()
await ApiAdmin.CallUsers()
ApiAdmin.ButtonExit()
ApiAdmin.CallDepartments()
ApiAdmin.ListDepartmentsEmployees()

