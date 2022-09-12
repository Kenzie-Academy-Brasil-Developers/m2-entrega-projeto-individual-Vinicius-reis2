class buttonExit{
    static buttonExit(){
        const button = document.querySelector("header button")
        button.addEventListener("click", (e) => {
            e.preventDefault()
            localStorage.clear()
            window.location.assign("../../index.html")
        })
    }
}

buttonExit.buttonExit()