const onsave = (e) => {
    console.log('onsave');
    e.preventDefault();
    const user = {
        firstName: fnameEl.value,
        lastName: lnameEl.value,
        birthDate: bdateEl.value,
        usr: usrEl.value,
        pwd: pwdEl.value
    }
    fetch("http://localhost:8080/projectwork/resources/users", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(data => {
        console.log(data);
        window.location.href = 'login.html';
    }).catch(error => {
        console.log("si è verificato un problema durante l'operazione fetch:", error);
    })
}
const fnameEl = document.getElementById("firstName");
const lnameEl = document.getElementById("lastName");
const bdateEl = document.getElementById("birthDate");
const usrEl = document.getElementById("usr");
const pwdEl = document.getElementById("pwd");
const formEl = document.querySelector('form');

formEl.addEventListener("submit", onsave);