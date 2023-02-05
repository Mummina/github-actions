const { spawn } = require("child_process");
let wget = require('node-wget');
const path = require('path');
var sudo = require('sudo-prompt');
let fs = require('fs')

module.exports = function (data){
    //loader to carry-on with the set-up
    //document.getElementById("loader").style.display = "flex";    

    let win = "https://d19iowjsts8t5i.cloudfront.net/qyrus-connect-win-v6.exe";
    let linux = "https://d19iowjsts8t5i.cloudfront.net/cli-linux";
    let mac = "https://d19iowjsts8t5i.cloudfront.net/qyrus-connect-mac-v3";

    if(process.platform == 'win32'){
      downloadBinary(win,"win32");
    } else if(process.platform == 'darwin'){
      downloadBinary(mac, "darwin")
    }

    function downloadBinary(data, type){
      console.log(`Inside downloadBinary with the data ${data}`)
      if(type == "darwin") {
        wget({
          url: data,
          dest: "/tmp/",      // destination path or path with filenname, default is ./
          timeout: 50000                        // duration to wait for request fulfillment in milliseconds, default is 2 seconds
        }, function (error, response, body) {
          if (error) {
            console.log('Unable to download the libs! Please write us at support@qyrus.com');
            console.log(error);              // error encountered
          } else {
            console.log('download daemon complete for mac!');
            configureQyrusConnect(type);
          }
        });
      } else if (type == 'win32'){
        wget({
          url: data,
          timeout: 50000                        // duration to wait for request fulfillment in milliseconds, default is 2 seconds
        }, function (error, response, body) {
          if (error) {
            console.log('Unable to download the libs! Please write us at support@qyrus.com');
            console.log(error);              // error encountered
          } else {
            console.log('download daemon complete for windows!');
            configureQyrusConnect(type);
          }
        });
      }
    }

    function configureQyrusConnect(type){
      if(type == "win32"){
        setUpForWindows();
      } else if(type == "darwin"){
        setUpForMac();
      } else{
        console.log("To be configured..")
        //setUpForLinux();
      }
    }
    
  function setUpForWindows() {
    try {
      // Change the directory
      process.chdir(`${process.env.LOCALAPPDATA + '\\Programs' + '\\qyrus_cloudbridge'}`);
      console.log("working directory after "
        + "changing: " + process.cwd());
    } catch (err) {
      // Printing error if occurs
      console.error("error occurred while "
        + "changing directory: " + err);
    }

    //Qyrus-connect binary set-up
    var options = {
      name: 'Qyrus CloudBridge'
    };
    sudo.exec(`qyrus-connect-win-v6.exe configure`, options,
      function(error, stdout, stderr) {
        if (error) {
          //document.getElementById("loader").style.display = "none";
          document.getElementById("message-received").innerHTML = "Error Occured in Configuration";
          document.getElementById('submit-button').className = "form-button";
          //document.getElementById('close').style.display = "flex";
          document.getElementById("failure").style.display = "flex";
          document.querySelector('#submit-button').value = "Connect"
          throw error;
        }
        console.log('stdout: ' + stdout);
      }
    );
    
    //Performing Reverse Proxy connection
    var options = {
      name: 'Qyrus CloudBridge'
    };
    sudo.exec(`qyrus-connect-win-v6.exe up --advertiseIp=${JSON.stringify(data.address)}`, options,
      function(error, stdout, stderr) {
        if (error) {
          //document.getElementById("loader").style.display = "none";
          document.getElementById("message-received").innerHTML = "Failed to create Connection with Qyrus Cloud\n";
          document.getElementById('submit-button').className = "form-button";
          //document.getElementById('close').style.display = "flex";
          document.getElementById("failure").style.display = "flex";
          document. getElementById("address"). disabled = false;
          document.querySelector('#submit-button').value = "Connect"
          throw error;
        }
        console.log('stdout: ' + stdout);
        console.log(stdout.includes("error"))
        //document.getElementById("loader").style.display = "none";
        if(stdout.includes("error")){
          document.getElementById("message-received").innerHTML = "Connection with Qyrus Cloud Failed as the Address provided is incorrect\n";
          document.getElementById('submit-button').className = "form-button";
          document.getElementById("failure").style.display = "flex";
          document.getElementById("address").disabled = false;
          document.querySelector('#submit-button').value = "Connect"
        } else{
          document.getElementById("message-received").innerHTML = "Connection with Qyrus Cloud was Successful!";
          document.getElementById('submit-button').className = "form-button";
          document.getElementById("success").style.display = "flex";
          document.querySelector('#submit-button').value = "Disconnect";
          document.getElementById("address").disabled = true;
        }
      }
    ); 
  }

  function setUpForMac() {
    try {
      // Change the directory
      process.chdir('/tmp/');
      console.log("working directory after "
        + "changing: " + process.cwd());
    } catch (err) {
      // Printing error if occurs
      console.error("error occurred while "
        + "changing directory: " + err);
    }

    //Making the binary executable.
    const binExec = spawn('chmod', ['777','qyrus-connect-mac-v3']);
    binExec.stdout.on('data', (output)=>{
      console.log("Printing STDOUT "+output);
    })
    binExec.stderr.on('data', (output)=>{
      console.log("Printing STDERR "+output);
    });
    binExec.on('close',(code)=>{
      console.log(`Exited with code: ${code}`)
    })

    //Sudo permission UI to execute the binary
    var options = {
      name: 'Qyrus CloudBridge'
    };
    sudo.exec(`./qyrus-connect-mac-v3 configure`, options,
      function (error, stdout, stderr) {
        console.log("Working directory after "
          + "changing: " + process.cwd());
        if (error) {
          //document.getElementById("loader").style.display = "none";
          document.getElementById("message-received").innerHTML = "Error Occured in Configuration";
          document.getElementById('submit-button').className = "form-button";
          //document.getElementById('close').style.display = "flex";
          document.getElementById("failure").style.display = "flex";
          document.querySelector('#submit-button').value = "Connect"
          throw error;
        }
        console.log('stdout: ' + stdout);
      }
    );

    //Performing Reverse Proxy connection
    var options = {
      name: 'Qyrus CloudBridge'
    };
    sudo.exec(`./qyrus-connect-mac-v3 up --advertiseIp=${JSON.stringify(data.address)}`, options,
      function(error, stdout, stderr) {
        if (error) {
          //document.getElementById("loader").style.display = "none";
          document.getElementById("message-received").innerHTML = "Failed to create Connection with Qyrus Cloud\n";
          //document.getElementById('close').style.display = "flex";
          document.getElementById('submit-button').className = "form-button";
          document.getElementById("failure").style.display = "flex";
          document.getElementById("address").disabled = false;
          document.querySelector('#submit-button').value = "Connect"
          throw error;
        }
        console.log('stdout: ' + stdout);
        //document.getElementById("loader").style.display = "none";
        if(stdout.includes("error")){
          document.getElementById("message-received").innerHTML = "Connection with Qyrus Cloud Failed as the Address provided is incorrect\n";
          document.getElementById('submit-button').className = "form-button";
          document.getElementById("failure").style.display = "flex";
          document.getElementById("address").disabled = false;
          document.querySelector('#submit-button').value = "Connect"
        } else{
          document.getElementById("message-received").innerHTML = "Connection with Qyrus Cloud was Successful!";
          document.getElementById('submit-button').className = "form-button";
          document.getElementById("success").style.display = "flex";
          document.querySelector('#submit-button').value = "Disconnect";
          document.getElementById("address").disabled = true;
        }
      }
    );
  }
}