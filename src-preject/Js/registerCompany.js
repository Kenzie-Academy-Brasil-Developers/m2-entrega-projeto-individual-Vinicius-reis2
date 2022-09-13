import { ApiAdmin } from "./ApiAdmin.js";

export class registerCompany{
    static async registerNewCompany(){
        const buttonSend = document.querySelector(".registerCompanies button")
        buttonSend.addEventListener("click", async (e) => {
            e.preventDefault();
            const input = document.querySelectorAll("input")
            const select = document.querySelectorAll("select")

            const data = {
                name: input[0].value,
                opening_hours: input[1].value,
                description: input[2].value,
                sector_uuid: select[0].value
            }

            await ApiAdmin.registerNewCompany(data)

        })
    }
}

registerCompany.registerNewCompany()