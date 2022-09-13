import { ApiAdmin } from "./ApiAdmin.js";

export class Employees{
    static async listdepartments(data){
        const tagSelect = document.getElementById("departSelect")
        data.forEach((e) => {
            const tagOption = document.createElement("option");
            tagOption.innerText = e.name;
            tagOption.value = e.uuid;
            tagSelect.append(tagOption)
        })
    }

    static async ListUser(data){
        const tagSelectDerp = document.getElementById("departSelect")
        const tagSelect = document.getElementById("userSelect")
        data.forEach((e) => {
            const tagOption = document.createElement("option");
            tagOption.innerText = e.username;
            tagOption.value = e.uuid;
            if(!e.is_admin){
                tagSelect.append(tagOption)
            }
        })

        const button = document.querySelector(".conEmp button")
        button.addEventListener("click", (e) =>{
            e.preventDefault()

            const data = {
                user_uuid: tagSelect.value,
                department_uuid: tagSelectDerp.value
            }

            ApiAdmin.ContEmployees(data)
        })
    }

    static async DemissEmployee(data){
        const tagSelect = document.getElementById("userSelectDem")
        data.forEach((e) =>{
            const tagOption = document.createElement("option")
            tagOption.innerText = e.username
            tagOption.value = e.uuid;
            if(e.department_uuid != null){
                tagSelect.append(tagOption)
            }
        })

        const button = document.querySelector(".demisEmp button")
        button.addEventListener("click", (e) => {
            e.preventDefault()

            const data = tagSelect.value;

            ApiAdmin.DemissEmployee(data)
        })
    }

}