//Script to perform operations and command Execution in Dashboard

document.querySelector("#node-reg").addEventListener("click", () => {
    if (document.getElementById('node-reg').className == "reg-node-box"){
        document.getElementById('node-reg').className = "reg-node-box-selected";
        document.getElementById('rp').className = "rp-box";
        document.getElementById('desk-test').className = "desk-test-box";
    } 
    if (document.getElementById('show-reg-node').style.display == "none") {
        document.getElementById('show-form').style.display = "none";
        // document.getElementById('show-reg-node').style.display = "block";
        document.getElementById('show-reg-node').style.display = "none";
        document.getElementById('show-desk-test').style.display = "none";
    }
    document.getElementById('navbar').style.width = "100%";
    window.electron.nodeReg();
});
document.querySelector("#desk-test").addEventListener("click", () => {
    if (document.getElementById('desk-test').className == "desk-test-box") {
        document.getElementById('desk-test').className = "desk-test-box-selected";
        document.getElementById('node-reg').className = "reg-node-box";
        document.getElementById('rp').className = "rp-box";
    }
    if (document.getElementById('show-desk-test').style.display == "none") {
        document.getElementById('show-form').style.display = "none";
        document.getElementById('show-reg-node').style.display = "none";
        
        document.getElementById('show-desk-test').style.display = "block";
    }
    document.getElementById('navbar').style.width = "1280px";
    //window.electron.gridShow();
});
document.querySelector("#rp").addEventListener("click", () => {
    document.getElementById('node-reg').className = "reg-node-box";
    if (document.getElementById('rp').className == "rp-box"){
        document.getElementById('rp').className = "rp-box-selected";
        document.getElementById('node-reg').className = "reg-node-box";
        document.getElementById('desk-test').className = "desk-test-box";
    } 
    if (document.getElementById('show-form').style.display == "none") {
        document.getElementById('show-form').style.display = "block";
        document.getElementById('show-reg-node').style.display = "none";
        document.getElementById('show-desk-test').style.display = "none";
    }
    document.getElementById('navbar').style.width = "100%";
})

function hideOptions() {
    if (document.getElementById('show-panel').style.display == "none") {
        document.getElementById('show-panel').style.display = "block";
    } else {
        document.getElementById('show-panel').style.display = "none";
    }
    if (document.getElementById('show-panel').style.display == "block") {
        document.getElementById('show-form').className = "form-details";
        document.getElementById('show-desk-test').className = "node-details";
        document.getElementById('myGrid').style.width = "100%";
    } else {
        document.getElementById('show-form').className = "form-details-flex";
        document.getElementById('show-desk-test').className = "node-details-flex";
        document.getElementById('myGrid').style.width = "1100px";
    }
    
}
    
document.querySelector("#logout-button").addEventListener("click", () => {
    window.electron.logout();
});

const addr = document.getElementById("address").value;
if(!addr){
    window.electron.appendIp();
}

document.querySelector("#submit-button").addEventListener("click", () => {
    if (document.querySelector('#submit-button').value == "Connect") {
        document.getElementById('message-received').innerHTML = "";
        document.getElementById("address").disabled = true;
        const address = document.getElementById("address").value;
        let data = {
            address: address,
        };
        console.log("Address before Validation "+address)
        if (address.includes('/32') && !/[a-zA-Z !@#$%^&*)(]/.test(address)) {
            document.getElementById('submit-button').className = "form-button-loader"
            document.getElementById('submit-button').value = "Connecting.."
            window.electron.onConnect(data);
        } else {
            document.getElementById('alert-ip').style.display = "block";
            document.getElementById('submit-button').style.top = "130px";
            document.getElementById("address").disabled = false;

        }
    } else if (document.querySelector('#submit-button').value == "Disconnect") {
        window.electron.onDisconnect();
    }
});
document.getElementById('address').addEventListener('click', function (event) {
    document.getElementById('alert-ip').style.display = 'none';
    document.getElementById('submit-button').style.top = "120px";
    if (document.getElementById("failure").style.display == "flex") document.getElementById("failure").style.display = "none";
    if (document.getElementById("success").style.display == "flex") document.getElementById("success").style.display = "none";
})
document.getElementById("rp-form").addEventListener("click", function (event) {
    console.log("Cancelling!")
    event.preventDefault()
});
// document.getElementById('close').onclick = function(){
//     document.getElementById('upper-msg').style.display = 'none';
// }
// document.getElementById('edit-option').addEventListener("click",function (event){
//     let disabled = document. getElementById("address"). disabled;
//     if(disabled){
//         document. getElementById("address"). disabled = false;
//     }else{
//         document. getElementById("address"). disabled = true;
//     }
// });

//Removing the event listeners
document.getElementById('rp').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('menu-button').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('logout-button').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('address').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});
document.getElementById('submit-button').removeEventListener('click', function () {
    console.log("Event Listener Removed")
});

function showPanel(){
    if(document.getElementById('panel').style.display == 'none'){
        document.getElementById('panel').style.display = "block";
    } else{
        document.getElementById('panel').style.display = "none";
    }
}

let is_win32;

function enableDelButton(){
    document.getElementById('delete-button').style.display = 'block';
}

document.getElementById('win-sap').addEventListener('change', () => {
    document.getElementById("desk-test-message").innerHTML = ""
    console.log("HERE in WinSap");
    document.getElementById('delete-button').style.display = 'block';
    if(document.getElementById('win-sap').checked){
        document.getElementById('win-sap').disabled = true;
        document.getElementById('sap').disabled = true;
        document.getElementById('win32').disabled = true;
    }
})

document.getElementById('win32').addEventListener('change', () => {
    document.getElementById("desk-test-message").innerHTML = ""
    console.log("HERE in Win32");
    if(document.getElementById('win32').checked){
        document.getElementById('win32').disabled = true;
        document.getElementById('sap').disabled = true;
        document.getElementById('win-sap').disabled = true;
    }
})

document.getElementById('sap').addEventListener('change', () => {
    document.getElementById("desk-test-message").innerHTML = ""
    console.log("HERE in SAP");
    if(document.getElementById('sap').checked){
        document.getElementById('sap').disabled = true;
        document.getElementById('win32').disabled = true;
        document.getElementById('win-sap').disabled = true;
    }
})

if(document.getElementById('win32').checked){
    console.log("Is it checked?")
    document.getElementById('sap').disabled = true;
    document.getElementById('win-sap').disabled = true;
    document.getElementById('delete-button').style.display = 'block';
    callGrid();
} 

function callGrid() {
    console.log('called callGrid')
    document.getElementById('clear-button').style.display = 'block';
    document.getElementById('add-button').style.display = 'block';
    document.getElementById('upload-button').style.display = 'block';
    document.getElementById('btnAttachment').style.display = 'block';
    document.getElementById('btn-para').style.display = 'block';
    window.electron.gridShow();
}

function openAttachment() {
    document.getElementById('attachment').value = '';
    console.log('here')
    document.getElementById('attachment').click();
}

function fileSelected(input) {
    console.log('fileSelected!')
    document.getElementById('btnAttachment').value = input.files[0].name
}

function openAttachmentPara() {
    document.getElementById('attachment-para').value = '';
    document.getElementById('attachment-para').click();
}

function fileSelectedPara(input) {
    document.getElementById('btnAttachment-para').value = input.files[0].name
}

function showPopup(){
    document.getElementById('para-detail').style.display = 'block'
}

function disableFields(){
    if(document.getElementById('btnAttachment-ok').value == 'OK'){
        document.getElementById('btnAttachment-para').disabled = true;
        document.getElementById('csv-link').disabled = true;
        document.getElementById('btnAttachment-ok').value = 'Reset'
    } else if(document.getElementById('btnAttachment-ok').value == 'Reset'){
        document.getElementById('btnAttachment-para').disabled = false;
        document.getElementById('csv-link').disabled = false;
        document.getElementById('btnAttachment-para').value = 'Upload';
        document.getElementById('csv-link').value = '';
        document.getElementById('btnAttachment-ok').value = 'OK'
    }   
}

// document.getElementById('refresh').addEventListener('click',()=>{
//     console.log('refresh!')
//     window.location.reload();
// })


