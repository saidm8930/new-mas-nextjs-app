export class Service {

  constructor(url = null){
    this.apiUrl = url;
    this.env=EnvProps.UAT_PROFILE
}

getList = (request) => {
  let key = request.key;
  return request.list.filter(item => item[key] == request.value)
}

send = async (endpoint, data) => {
console.log("api link :: ", `${this.apiUrl}/${endpoint}`);
try {
  //   const jwt_token = await this.getToken();
  const api = `${this.apiUrl}/${endpoint}`;

  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${jwt_token}`,
    },
    body: JSON.stringify({
      ...data,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
} catch (exception) {
  console.log("Error in sending request:", exception);
  return {
    code: 4008,
    status: "Failed",
    message: "Application Service Error",
  };
}
};

app() {
return new App(this.env);
}
}

class EnvProps {
static PROFILE = "";
static LOCAL_PROFILE = "local";
static UAT_PROFILE = "uat";
static PROD_PROFILE = "prod";
localDomain = "http://localhost";
}

class App extends EnvProps {
constructor(envProf) {
super(envProf);
this.envProfile = envProf;
}
bdss() {
return new BDSS(this.envProfile);
}
mas() {
const url = `${this.appDomain}:${this.appPort}/${this.baseUrl}`;
return new Service(url);
}
icbs() {
const url = `${this.appDomain}:${this.appPort}/${this.baseUrl}`;
return new Service(url);
}
tis() {
const url = `${this.appDomain}:${this.appPort}/${this.baseUrl}`;
return new Service(url);
}
}

class BDSS extends App {
prodDomain = "https://bdss.bot.go.tz";
uatDomain = "https://bdss-uat.bot.go.tz";
profile = null;

adminPort = {
local: "8087",
remote: "8088",
}

signPort = {
local: "8085",
remote: "8086",
}

baseUrl = {
admin: "admin/v1",
sign: "sign/v1",
};

constructor(envProf) {
super(envProf);
this.profile = envProf;
}

getDomain() {
const prof = this.profile === null ? EnvProps.PROFILE : this.profile;

if (prof === EnvProps.LOCAL_PROFILE) {
  return this.localDomain;
} else if (prof === EnvProps.UAT_PROFILE) {
  return this.uatDomain;
} else if (prof === EnvProps.PROD_PROFILE) {
  return this.prodDomain;
}
}

getPort(app) {
if (app === "admin" && this.profile === EnvProps.LOCAL_PROFILE) {
  return this.adminPort.local;
} else if (
  app === "admin" &&
  (this.profile === EnvProps.PROD_PROFILE || this.profile === EnvProps.UAT_PROFILE)
) {
  return this.adminPort.remote;
} else if (app === "sign" && this.profile === EnvProps.LOCAL_PROFILE) {
  return this.signPort.local;
} else if (
  app === "sign" &&
  (this.profile === EnvProps.PROD_PROFILE || this.profile === EnvProps.UAT_PROFILE)
) {
  return this.signPort.remote;
}
}

admin() {
this.port = this.getPort("admin");
this.domain = this.getDomain();
const url = `${this.domain}:${this.port}/${this.baseUrl.admin}`;
return new Service(url);
}

sign() {
this.port = this.getPort("sign");
this.domain = this.getDomain();
const url = `${this.domain}:${this.port}/${this.baseUrl.admin}`;
return new Service(url);
}

uat() {
return new BDSS(EnvProps.UAT_PROFILE);
}

prod() {
return new BDSS(EnvProps.PROD_PROFILE);
}

local() {
return new BDSS(EnvProps.LOCAL_PROFILE);
}
}

export const service = new Service();

export default service;
