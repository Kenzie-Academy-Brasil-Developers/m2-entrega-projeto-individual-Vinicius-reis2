export class Modals{
    static modalError(text){
        Toastify({
            text: text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #BB0505, #141a2e)"
            },
          }).showToast();
    }

    static modalOkLogin(text){
      Toastify({
          text: text,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00C400, #141a2e)"
          },
        }).showToast();
  }
}