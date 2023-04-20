/* (function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "http://bia-winsrv-tst1:8301/api/"; 18.208.148.189:5700
    window["env"]["debug"] = true;
  })(this) */

  (function (window) { 
      window.__env = window.__env || {};   
      window.__env.apiUrl = "http://bia-winsrv-tst1:8301/api/"; //"http://localhost:5000/api/"; //
      window.__env.apiVer = "1.0";
    } (this));