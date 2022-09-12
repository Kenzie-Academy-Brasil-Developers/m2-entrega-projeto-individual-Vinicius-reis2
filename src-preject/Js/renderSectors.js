import { ApiAdmin } from "./ApiAdmin.js";

export class renderSectors{
    static adminRenderSectors(data){
        data.forEach((e) => {
            const tagUl = document.querySelector(".companiesSectors")
            
            const tagLi = document.createElement("li")
            tagLi.setAttribute("class", "companiesSectorsLi")

            const tagH4 = document.createElement("h4")
            tagH4.innerText = e.description

            tagLi.append(tagH4)
            tagUl.append(tagLi)
        });
    }

    static renderCompanies(data){
        data.forEach((e) => {
            const tagUl = document.querySelector(".myCompanies ul")

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
        })
    }
}