import { ApiAdmin } from "./ApiAdmin.js";
import { Modals } from "./toastify.js";


export class companySearch{
    static async companySearchInput(data){
        const buttonSubmit = document.querySelector(".formSearchCompany button");
        buttonSubmit.addEventListener("click", async (e) => {

            const inputCompany = document.querySelector(".formSearchCompany input")
            e.preventDefault();

            const input = inputCompany.value;

            const newFilter = data.filter((e) => {
                return input.toLowerCase().includes(e.name.toLowerCase())
            })
            companySearch.companySearchInputRender(newFilter)
            Modals.modalOkLogin("Empresa encontrada!")
        })
    }

    static async companySearchInputRender(data){
        data.forEach((e) => {
            const tagUl = document.querySelector(".searchCompany ul")

            tagUl.innerHTML = ""

            const tagLi = document.createElement("li")
            tagLi.setAttribute("class", "myCompaniesLi")

            const tagDivName = document.createElement("div")
            tagDivName.setAttribute("class", "CompanieName")

            const tagH3 = document.createElement("h3")
            tagH3.innerText = e.name;

            const tagSpan = document.createElement("span")
            tagSpan.innerText = e.sectors.description;

            const tagP = document.createElement("p")
            tagP.innerText = e.description;

            const tagSmall = document.createElement("small")
            tagSmall.innerText = `Abre ás: ${e.opening_hours}`

            tagDivName.append(tagH3, tagSpan)
            tagLi.append(tagDivName, tagP, tagSmall)
            tagUl.append(tagLi)
        });
    }
}




