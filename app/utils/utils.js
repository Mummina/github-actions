const { URL } = require("./configURL");

module.exports = {
    preFetch: (data) =>{
        let { url } = data;
        let client_id, realm, logouturl, custom;
        // switch (url) {
        //   case URL.PUBLIC_UK:
        //     client_id = "electron"
        //     realm = "qyrus-public-cloud"
        //     url_kc = "https://sso-uk.qyrus.com/"
        //     logouturl = ""
        //     //custom = "Bearer 90540897-748a-3ef2-b3a3-c6f8f42022da"
        //     break;
        //   case URL.PUBLIC:
        //     client_id = "electron"
        //     realm = "qyrus-public-cloud"
        //     url_kc = "https://sso.quinnox.info/"
        //     logouturl= ""
        //     //custom = "Bearer 90540897-748a-3ef2-b3a3-c6f8f42022da"
        //     break;
        //   case URL.STG:
        //     client_id = "ctc-electron"
        //     realm = "ctc-stg"
        //     url_kc = "https://sso.quinnox.info/"
        //     logouturl = "https://stg-gateway.quinnox.info:8243"
        //     custom = "Bearer 90540897-748a-3ef2-b3a3-c6f8f42022da"
        //     break;
        //   default:
        //     document.getElementById('alert').style.display = 'block';
        // }
        if(url == URL.STG || 'https://stg-testcloud.quinnox.info/'){
          client_id = "ctc-electron"
          realm = "ctc-stg"
          url_kc = "https://sso.quinnox.info/"
          logouturl = "https://stg-gateway.quinnox.info:8243"
          custom = "Bearer 90540897-748a-3ef2-b3a3-c6f8f42022da"
        }
        let appendurl = `${url_kc}auth/realms/${realm}/protocol/openid-connect/token`;

        return {appendurl, client_id, realm, url_kc, logouturl, custom};
    }
}
