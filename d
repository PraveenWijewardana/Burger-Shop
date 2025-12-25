async function sendemail() {
            await fetch('https://script.google.com/macros/s/AKfycbyT_xyUjCkVNNTigLQxEbSj3ZUcr3sLf_-xiolI0tktPwCd17LPKTT8ebTMxL5CsK5v/exec', {
                method: 'POST',
                body: JSON.stringify({
                    to: "praveenwps1212@gmail.com",
                    subject: "Contact Form",
                    body: "Hello!"
                })
            });
        }