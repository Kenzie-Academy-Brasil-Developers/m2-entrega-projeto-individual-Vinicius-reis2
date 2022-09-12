import { Departments } from "./departments.js"
import { renderSectors } from "./renderSectors.js"
import { companySearch } from "./searchCompany.js"
import { Modals } from "./toastify.js"


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
            Modals.modalOkLogin("Departamentos listados")
            const tagUl = document.querySelector(".listDepartments ul")
            tagUl.innerHTML = "";
            resp.forEach((e) => {
                const tagLi = document.createElement("li")
                tagLi.setAttribute("class", "listDepartmentsUlLi")
                const tagH3 = document.createElement("h3")
                tagH3.innerText = e.name;

                const tagP = document.createElement("p")
                tagP.innerText = e.description;

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
        .then(resp => Departments.RegistredUsers(resp))

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
}

await ApiAdmin.getSectors()
await ApiAdmin.getCompanies()
await ApiAdmin.CallUsers()
ApiAdmin.ButtonExit()

