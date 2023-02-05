//Script to help in Successful Login

document.querySelector("#submit-button").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url = document.getElementById("url").value;
    console.log(username, password, url)
    let data = {
        password: password
    };
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(username)) {
        document.getElementById('alert').style.display = 'block';
    } else {
        data.username = username;
    }
    var urlReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!urlReg.test(url)) {
        document.getElementById('alert').style.display = 'block';
    } else {
        data.url = url;
    }
    if (data.hasOwnProperty('username') && data.hasOwnProperty('password') && data.hasOwnProperty('url')) {
        performLogin(data);
    } else {
        console.log("Data obj " + JSON.stringify(data))
        document.getElementById('alert').style.display = 'block';
    }
    //this.removeEventListener('click',arguments.callee)
});

function viewPassword() {
    console.log("Inside viewpassword function!");
    const password = document.getElementById("password");
    const showIcon = document.getElementById("showpass");
    const hideIcon = document.getElementById("hidepass");
    if (password.type == "password") {
        password.type = "text";
        showIcon.style.display = 'none';
        hideIcon.style.display = 'inline-block';
    }
    else {
        password.type = "password";
        showIcon.style.display = 'inline-block';
        hideIcon.style.display = 'none';
    }
}

function performLogin(data) {
    console.log("Data-> " + JSON.stringify(data));
    window.electron.onLogin(data)
}
document.getElementById("kc-form-login").addEventListener("click", function (event) {
    //document.getElementById('alert').style.display = 'none';
    console.log("Cancelling!")
    event.preventDefault()
});
document.getElementById('username').addEventListener('click', function (event) {
    document.getElementById('alert').style.display = 'none';
})
document.getElementById('password').addEventListener('click', function (event) {
    document.getElementById('alert').style.display = 'none';
})
document.getElementById('url').addEventListener('click', function (event) {
    document.getElementById('alert').style.display = 'none';
})
//Removing the event listeners
document.getElementById('username').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('password').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('url').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('kc-form-login').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('submit-button').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});