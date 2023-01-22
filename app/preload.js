const { contextBridge, ipcRenderer } = require("electron");
const { spawn } = require("child_process");
const performRP = require("./reverseProxy/reverseProxy");
const { preFetch } = require("./utils/utils");
const gridView = require('./stepsGrid/steps-grid');
const ip = require('ip');
const checkInternetConnected = require('check-internet-connected');
// const browsers = require('detect-browsers');
// const si = require('systeminformation');
const webDriver = require('selenium-webdriver');


//Bridge between the main and back-ground process
contextBridge.exposeInMainWorld("electron", {
  onLogin: (data) => {
    console.log("USER CRED " + JSON.stringify(data))
    callLoginAPI(data);
    //ipcRenderer.send("call-dashboard");
  },
  logout: () => {
    performLogout();
  },
  onConnect: (data) => {
    console.log("FORM DETAILS " + JSON.stringify(data))
    performRP(data);
  },
  onDisconnect: () => disconnectRp(),
  appendIp: () =>  appendIpAddr(),
  nodeReg: () => regNode(),
  gridShow: () => {
    gridView()
  },
});

//Function to Validate the Credentials to authenticate
async function callLoginAPI(data) {
  let { username, password } = data;
  localStorage.setItem('username',username);
  let { appendurl, client_id, logouturl, custom} = preFetch(data);
  localStorage.setItem('logouturl',logouturl);
  localStorage.setItem('custom',custom);
  console.log(appendurl);
  const response = await fetch(appendurl, {
    method: "POST",
    body: `client_id=${client_id}&password=${password}&username=${username}&grant_type=password`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  });
  response.body.getReader().read().then(function (data) {
    let string = new TextDecoder("utf-8").decode(data.value);
    console.log("RESPONSE:-" + string + "typeof "+typeof(string));
    //console.log("Access token =>"+string.access_token)
    string = JSON.parse(string)
    console.log("New typeof->"+typeof(string))
    localStorage.setItem("access_token",string.access_token);
    localStorage.setItem("refresh_token",string.refresh_token);
    if (string.access_token) {
      //After Successfull authentication, redirect to dashboard
      ipcRenderer.send("call-dashboard");
    } else {
      document.getElementById('alert').style.display = 'block';
    }
  });
}

//To Disconnect the Connection Eshtablished to Qyrus CloudBridge (Rp)
function disconnectRp(){
  if(process.platform == 'win32'){
    const binExecWin = spawn('qyrus-connect-win-v6.exe', ['down']);
    binExecWin.stdout.on('data', (output)=>{
      console.log("Printing STDOUT "+output);
      document.getElementById("message-received").innerHTML = "Disconnected Successfully! \n";
      document.getElementById("success").style.display = "none";
      document.querySelector('#submit-button').value = "Connect";
      document.getElementById("address").disabled = false;
    })
    binExecWin.stderr.on('data', (output)=>{
      console.log("Printing STDERR "+output);
      document.getElementById("message-received").innerHTML = "Failed to Disconnect";
      document.getElementById("failure").style.display = "flex";
    });
    binExecWin.on('close',(code)=>{
      console.log(`Exited with code: ${code}`)
    });
    
  } else if(process.platform == 'darwin'){
    const binExecMac = spawn('./qyrus-connect-mac-v3', ['down']);
    binExecMac.stdout.on('data', (output)=>{
      console.log("Printing STDOUT "+output);
      document.getElementById("message-received").innerHTML = "Disconnected Successfully! \n";
      document.getElementById("success").style.display = "none";
      document.querySelector('#submit-button').value = "Connect";
      document.getElementById("address").disabled = false;

    })
    binExecMac.stderr.on('data', (output)=>{
      console.log("Printing STDERR "+output);
      document.getElementById("message-received").innerHTML = "Failed to Disconnect";
      document.getElementById("failure").style.display = "flex";
    });
    binExecMac.on('close',(code)=>{
      console.log(`Exited with code: ${code}`)
    });
  } else {
    console.log("No Operation")
  }
 
}

//To Perform Logout Operation
async function performLogout() {
  if (document.querySelector('#submit-button').value == "Disconnect") {
    document.getElementById("message-received").innerHTML = "Make Sure You Disconnect before logging out!";
  } else {
    console.log("Access token in performLogout " + localStorage.getItem('access_token'));
    const urlLogout = localStorage.getItem('logouturl');
    const acTkn = localStorage.getItem('access_token');
    const custGateWay = localStorage.getItem('custom');
    const uname = localStorage.getItem('username');
    const responseLogout = await fetch(`${urlLogout}/usermgmt/v2/api/logout?login=${uname}`, {
      method: "GET",
      headers: {
        "Custom": `Bearer ${acTkn}`,
        "Authorization": `${custGateWay}`
      }
    });
    responseLogout.body.getReader().read().then(function (data) {
      let string = new TextDecoder("utf-8").decode(data.value);
      console.log("RESPONSE FOR LOGOUT:-" + string + "typeof " + typeof (string));
      console.log('clearing localStorage');
      localStorage.clear();
      ipcRenderer.send("user:logout");
    })
  }
  exitPorts();
}

function exitPorts(){
  console.log("Killing ports")
  const binExec = spawn('taskkill',['/im','app.exe','/F']);
    binExec.stdout.on('data', (output) => {
      console.log("Printing STDOUT " + output);
    })
    binExec.stderr.on('data', (output) => {
      console.log("Printing STDERR " + output);
    });
    binExec.on('close', (code) => {
      console.log(`Exited with code: ${code}`)
    })
}

function appendIpAddr(){
  if(process.platform == "win32"){
    const privateIp = ip.address("Wi-Fi", "ipv4");
    console.log("Private IP "+JSON.stringify(privateIp));
    document.getElementById('address').value = privateIp+'/32';
  } else if(process.platform == "darwin"){
    const privateIp = ip.address();
    console.log("Private IP "+JSON.stringify(privateIp));
    document.getElementById('address').value = privateIp+'/32';
  }
}

function regNode(){
  //Get installed browsers
  // browsers.getInstalledBrowsers()
  //   .then( list=> {
  //     console.log(list)
  //     if(list.includes('Google Chrome')){
  //       document.getElementById('chrome').style.display = "block"
  //     }
  //     if (list.includes('Firefox')){
  //       document.getElementById('firefox').style.display = "block"
  //     }
  //     if(list.includes('Internet Explorer')){
  //       document.getElementById('edge').style.display = "block"
  //     }
  //     if(list.includes('Safari')){
  //       document.getElementById('safari').style.display = "block" 
  //     }else{
  //       console.log("Other Browser")
  //       //document.getElementById('other').style.display = "block" 
  //     }
  //   }).catch( error => console.error(error));

  //   si.osInfo().then(data => {
  //     console.log(data)
  //   });
  console.log("trying to run test in local chrome")
  let driver = new webDriver.Builder().forBrowser('chrome').build();
  driver.get('https://www.facebook.com').then(()=>{
      driver.getTitle().then((title)=>{
        setTimeout(()=>{
          console.log("PAGE TITLE->"+title);
          driver.quit();
        },4000)
      })
  })
}

//Check Internet Connection
checkInternetConnected()
  .then((result) => {
    console.log("INSIDE")
    console.log(result);
  })
  .catch((ex) => {
    console.log("EXCEPTION")
    alert('Offline: Please Check the Connection and Try Again!')
  });


