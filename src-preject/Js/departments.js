import { ApiAdmin } from "./ApiAdmin.js";
import { Modals } from "./toastify.js";

export class Departments{
    static async CallCompanies(data){
        data.forEach((e) => {
            const tagSelect = document.querySelector("#selectDepartments")

            const tagOption = document.createElement("option")
            tagOption.innerText = e.name
            tagOption.value = e.uuid

            tagSelect.append(tagOption)
        });

        const button = document.querySelector(".createDepartment button")
        button.addEventListener("click", (e) => {
            e.preventDefault()
            const input = document.querySelectorAll("input")
            const select = document.getElementById("selectDepartments")

            const data = {
                name: input[4].value,
                description: input[5].value,
                company_uuid: select.value
            }

            ApiAdmin.createDepartments(data)
        })
    }

    static async ListDepartments(data){
        data.forEach((e) => {
            const tagSelect = document.querySelector("#selectDepartmentsList")

            const tagOption = document.createElement("option")
            tagOption.innerText = e.name
            tagOption.value = e.uuid

            tagSelect.append(tagOption)
        })

        const button = document.querySelector(".listDepartments button")
        button.addEventListener("click", (e) => {
            e.preventDefault()
            const select = document.getElementById("selectDepartmentsList")

            ApiAdmin.ListDepartments(select.value)
        })
    }

    static async RegistredUsers(data){
        data.forEach((e) =>{
            const tagUl = document.querySelector(".SectionUsersEmp")
            const tagUlDesemp = document.getElementById("ulDesemp")
            tagUl.setAttribute("class", "SectionUsersEmp")
            tagUlDesemp.setAttribute("class", "SectionUsersEmp")

            const tagLi = document.createElement("li")

            const tagH4 = document.createElement("h4")
            tagH4.innerText = `Usuário: ${e.username}`

            const tagP = document.createElement("p")
            tagP.innerText = `Email: ${e.email}`

            const tagSmall = document.createElement("small")
            tagSmall.innerText = `nivel: ${e.professional_level}`

            tagLi.append(tagH4, tagP, tagSmall)

            if(e.department_uuid != null){
                tagUl.innerHTML = ""
                if(e.is_admin != true){
                    tagUl.append(tagLi)
                }
            }else{
                if(e.is_admin != true){
                tagUlDesemp.append(tagLi)
                }
            }
        })
    }
}