import { Api } from "./Api.js";


export class indexHtml{

    static async loginDom(){
    const sectionContainer = document.querySelector(".containerLogin")
    const smallLogin = document.querySelector("#smallLogin")

    sectionContainer.innerHTML = "";

    const tagH2 = document.createElement("h2")
    tagH2.innerText = "Login"

    const tagP = document.createElement("p")
    tagP.innerText = "digite suas credenciais abaixo para acessar a plataforma"

    const tagForm = document.createElement("form")
    tagForm.setAttribute("class", "formLogin")

    const tagInputEmail = document.createElement("input")
    tagInputEmail.placeholder = "Email"
    tagInputEmail.type = "email"

    const tagInputPassword = document.createElement("input")
    tagInputPassword.placeholder = "Password"
    tagInputPassword.type = "password"

    const tagButton = document.createElement("button")
    tagButton.innerText = "Entrar"
    tagButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const input = document.querySelectorAll("input")
        
        const data = {
            email: input[0].value,
            password: input[1].value
        }

        await Api.loginUser(data)
    })

    const tagSmall = document.createElement("small")
    tagSmall.innerText = "Ainda não é cadastrado? Click Aqui!"
    tagSmall.setAttribute("id", "smallLogin")
    tagSmall.addEventListener("click", (e) => {
        e.preventDefault()
        indexHtml.registerDom()
    })

    tagForm.append(tagInputEmail, tagInputPassword, tagButton)
    sectionContainer.append(tagH2, tagP, tagForm, tagSmall)
    }

    static async registerDom(){
        const sectionContainer = document.querySelector(".containerLogin")
        const smallLogin = document.querySelector("#smallLogin")

        sectionContainer.innerHTML = "";

        const tagH2 = document.createElement("h2")
        tagH2.innerText = "Registrar"

        const tagP = document.createElement("p")
        tagP.innerText = "Complete os campos abaixo para cadastrar-se"

        const tagForm = document.createElement("form")
        tagForm.setAttribute("class", "formLogin")

        const tagInputEmail = document.createElement("input")
        tagInputEmail.placeholder = "Email"
        tagInputEmail.type = "email"

        const tagInputPassword = document.createElement("input")
        tagInputPassword.placeholder = "Password"
        tagInputPassword.type = "password"

        const tagInputUserName = document.createElement("input")
        tagInputUserName.placeholder = "NickName"

        const tagDivCat = document.createElement("div")
        tagDivCat.setAttribute("class", "divCategories")

        const tagSpan = document.createElement("span")
        tagSpan.innerText = "Nível profissional: "

        const tagInputSelect = document.createElement("select")

        tagDivCat.append(tagSpan, tagInputSelect)
        
        const arr = ["estágio", "júnior", "pleno", "sênior"]
        arr.forEach(e => {
            const tagOption = document.createElement("option")
            tagOption.innerText = e
            tagInputSelect.append(tagOption)
        })


        const tagButton = document.createElement("button")
        tagButton.setAttribute("class", "buttonSubmit")
        tagButton.innerText = "Cadastrar"
        tagButton.addEventListener("click", async (e) => {
            e.preventDefault()
            const input = document.querySelectorAll("input")
            const select = document.querySelectorAll("select");
            const data = {
                password: input[1].value,
                email: input[0].value,
                professional_level: select[0].value,
                username: input[2].value
            }

            await Api.registerUser(data)
        })

        const tagSmall = document.createElement("small")
        tagSmall.innerText = "Já é cadastrado? vá para o login clickando aqui"
        tagSmall.addEventListener("click", (e) => {
            indexHtml.loginDom()
        })

        tagForm.append(tagInputEmail, tagInputPassword, tagInputUserName, tagDivCat)
        sectionContainer.append(tagH2, tagP, tagForm, tagButton, tagSmall)
    }

    static async renderConpanies(data){
        const tagUl = document.querySelector(".containerEmpresasList")
        data.forEach((e) => {
            const tagLi = document.createElement("li")
            tagLi.setAttribute("class", "cardCompanies")

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
        })
    }
}

indexHtml.loginDom()
