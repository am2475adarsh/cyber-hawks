function flip(event) {
    // var new_el = event.currentTag;
    var element = document.querySelector(".flip-card-inner");
    if (element.className === "flip-card-inner") {
        element.style.backfaceVisibility = "hidden";
        if (element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(360deg)";
        }
        else {
            element.style.transform = "rotateY(180deg)";
        }
    }
};

let api = 'http://localhost:3000/data';

function register() {
    let name = document.querySelector('#name'), email = document.querySelector('#email'), password = document.querySelector('#password');

    if (name.value && email.value && password.value) {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                let currentuserid = -1;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].email == email.value) {
                        currentuserid = i;
                        break;
                    }
                }
                if (currentuserid == -1) {
                    data.push({
                        "id": data.length,
                        "name": name.value,
                        "email": email.value,
                        "password": password.value
                    })
                    fetch(api, {
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        method: "POST",
                        body: JSON.stringify(data)
                    })
                    alert("Registered Successfully");
                    name.value = email.value = password.value = "";
                }
                else {
                    alert("User already exists, please use another email");
                    email.value = "";
                }

            })
    }
    else {
        alert("No Input");
    }

}

function Reset() {
    let re_email = document.querySelector('#re_email'), reset_pass = document.querySelector('#reset_pass'), re_reset_pass = document.querySelector('#re_reset_pass');
    if (re_email.value && reset_pass.value && re_reset_pass.value) {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                let currentuserid = -1;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].email == re_email.value) {
                        currentuserid = i;
                        break;
                    }
                }
                if (currentuserid == -1) {
                    alert("No such email registered");
                    re_email.value = "";
                }
                else {
                    if (reset_pass.value == re_reset_pass.value) {
                        if (reset_pass.value == data[currentuserid].password) {
                            alert("Use a different password than the older one");
                            reset_pass.value = re_reset_pass.value = "";
                        }
                        else {
                            data[currentuserid]["password"] = reset_pass.value;
                            fetch(api, {
                                headers: { "Content-Type": "application/json; charset=utf-8" },
                                method: "POST",
                                body: JSON.stringify(data)
                            })
                            alert("Password Updated Successfully");
                            re_email.value = reset_pass.value = re_reset_pass.value = "";
                        }
                    }
                    else {
                        alert("Entered passwords are not the same");
                        reset_pass.value = re_reset_pass.value = "";
                    }
                }
            })
    }
    else {
        alert("No Input");
    }
}