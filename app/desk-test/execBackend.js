const { spawn, exec } = require("child_process");
const fs = require("fs");
let wget = require('node-wget');
module.exports = function (jsonData, option) {
  let EXEC_URL = 'https://d19iowjsts8t5i.cloudfront.net/QyrusDesktopTesting-v6.zip'
  console.log("Printing JSON inside the Backend logic!")
  console.log(JSON.stringify(jsonData))
  //download binary 
  if (fs.existsSync(`${process.env.LOCALAPPDATA + '\\Programs' + '\\qyrus_cloudbridge' + '\\app.exe'}`)) {
    // file exists no need to download!
    console.log('file exists no need to download!')
    execBinary();
  } else {
    wget({
      url: EXEC_URL,    //url to download
      timeout: 50000                      // duration to wait for request fulfillment in milliseconds, default is 2 seconds
    }, function (error, response, body) {
      if (error) {
        console.log('Unable to download the file');
        console.log(error);              // error encountered
        document.getElementById("desk-test-message").innerHTML = `Error Occured: ${error}`;
      } else {
        console.log(`downloaded the file`);
        execBinary();
      }
    });
  }
  
  //change directory to binary download area
  function execBinary(){
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
    //Unzip file
    const unzipFile = spawn('tar', ['-xf','QyrusDesktopTesting-v6.zip']);
    unzipFile.stdout.on('data', (output)=>{
      console.log("Printing STDOUT "+output);
      console.log("Now going into unzipped folder")
      //process.chdir(`${process.env.LOCALAPPDATA + '\\Programs' + '\\qyrus_cloudbridge'}`);
      // instantiate()
    })
    unzipFile.stderr.on('data', (output)=>{
      console.log("Printing STDERR "+output);
    });
    unzipFile.on('close',(code)=>{
      console.log(`Exited with code: ${code}`)
      instantiate()
    })
  }

  // try {
  //   // Change the directory
  //   process.chdir(`${process.env.HOMEDRIVE + process.env.HOMEPATH + "\\Downloads" + "\\QyrusDesktopTesting"}`);
  //   console.log("working directory after "
  //     + "changing: " + process.cwd());
  //     instantiate();
  // } catch (err) {
  //   // Printing error if occurs
  //   console.error("error occurred while "
  //     + "changing directory: " + err);
  // }

  function instantiate(){
    console.log("INSTANTIATING THE BINARY")
    document.getElementById("desk-test-message").innerHTML = "Instantiating the Desktop testing Process..";
    const binExec = spawn('app.exe');
    binExec.stdout.on('data', (output) => {
      console.log("Printing STDOUT " + output);
      // if(output['status'] == 'Fail')  document.getElementById("desk-test-message").innerHTML = `Invalid Operation/Fields are empty`;
    })
    binExec.stderr.on('data', (output) => {
      console.log("Printing STDERR " + output);
      if (output.includes('Uvicorn')) {
        if (option == 'win32') postJSONWin(jsonData);
        else if(option == 'win-sap') postJSONWinSap(jsonData);
        else postJSONSap(jsonData);
      }
    });
    binExec.on('close', (code) => {
      console.log(`Exited with code: ${code}`)
      if (code) {
        if (option == 'win32') postJSONWin(jsonData);
        else if(option == 'win-sap') postJSONWinSap(jsonData);
        else postJSONSap(jsonData);
      }
    })
    
  }  

  async function postJSONWin(jsonData){
    console.log("Inside PostJSON fetch call for Win")
    let url = 'http://localhost:8000/api/win32/exec-win-test/'
    const response = await fetch(url, {
      method: "POST",
      body: `${JSON.stringify(jsonData)}`,
      headers: {
        "Content-type": "application/json"
      }
    });
    response.body.getReader().read().then(function (data) {
      let string = new TextDecoder("utf-8").decode(data.value);
      console.log("RESPONSE:-" + string + "typeof "+typeof(string));
      document.getElementById("desk-test-message").innerHTML = `Received response: ${string}`;
      if(string.includes('Internal')){
        console.log(string)
      } else{
        let url = string.replaceAll(/\\/g, "/")
        let cmd = `start msedge "file:///${url}"`
        console.log('trying to launch url')
        exec(cmd);
        //Terminating the process
        const termProc = spawn('taskkill', ['/im', 'app.exe', '/F']);
        termProc.stdout.on('data', (output) => {
          console.log("Printing STDOUT " + output);
        })
        termProc.stderr.on('data', (output) => {
          console.log("Printing STDERR " + output);
        });
        termProc.on('close', (code) => {
          console.log(`Exited with code: ${code}`)
        })
      }
    })
  }

  async function postJSONWinSap(jsonData){
    console.log("Inside PostJSON fetch call for Win SAP")
    let url = 'http://localhost:8000/api/win32/exec-sap-win-test/'
    const response = await fetch(url, {
      method: "POST",
      body: `${JSON.stringify(jsonData)}`,
      headers: {
        "Content-type": "application/json"
      }
    });
    response.body.getReader().read().then(function (data) {
      let string = new TextDecoder("utf-8").decode(data.value);
      console.log("RESPONSE:-" + string + "typeof "+typeof(string));
      document.getElementById("desk-test-message").innerHTML = `Received INFO: ${string}`;
      if(string.includes('Internal')){
        console.log(string)
      } else{
        let url = string.replaceAll(/\\/g, "/")
        let cmd = `start msedge "file:///${url}"`
        console.log('trying to launch url')
        exec(cmd);
        //Terminating the process
        const termProc = spawn('taskkill', ['/im', 'app.exe', '/F']);
        termProc.stdout.on('data', (output) => {
          console.log("Printing STDOUT " + output);
        })
        termProc.stderr.on('data', (output) => {
          console.log("Printing STDERR " + output);
        });
        termProc.on('close', (code) => {
          console.log(`Exited with code: ${code}`)
        })
      }
    })
  }

  async function postJSONSap(jsonData){
    console.log("Inside PostJSON fetch call for SAP")
    let url = 'http://localhost:8000/api/win32/exec-sap-test/'
    const response = await fetch(url, {
      method: "POST",
      body: `${JSON.stringify(jsonData)}`,
      headers: {
        "Content-type": "application/json"
      }
    });
    response.body.getReader().read().then(function (data) {
      let string = new TextDecoder("utf-8").decode(data.value);
      console.log("RESPONSE:-" + string + "typeof "+typeof(string));
      document.getElementById("desk-test-message").innerHTML = `Received INFO: ${string}`;
      if(string.includes('Internal')){
        console.log(string)
      } else{
        let url = string.replaceAll(/\\/g, "/")
        let cmd = `start msedge "file:///${url}"`
        console.log('trying to launch url')
        exec(cmd);
        //Terminating the process
        const termProc = spawn('taskkill', ['/im', 'app.exe', '/F']);
        termProc.stdout.on('data', (output) => {
          console.log("Printing STDOUT " + output);
        })
        termProc.stderr.on('data', (output) => {
          console.log("Printing STDERR " + output);
        });
        termProc.on('close', (code) => {
          console.log(`Exited with code: ${code}`)
        })
      }
    })
  }
}