
interface Domain {
    "domainKey": String;
    "email": String;
    "country": String;
    "state": String;
    "city": String;
    "address": String;
    "zipcode": String;
    "primaryPhone": String;
    "locale": String;
    "timezone": String;
    "registeredStamp": number;
    "startId": number;
  }

  interface User {
    "domainKey": String;
    "email": String;
    "password": String;
    "firstName": String;
    "lastName": String;
    "country": String;
    "state": String;
    "city": String;
    "address": String;
    "zipcode": String;
    "primaryPhone": String;
    "locale": String;
    "timezone": String;
    "workStart": number;
    "workEnd": number;
    "workDays": Array<number>,
    "roles": Array<String>,
    "groups": Array<number>,
    "registeredStamp": number;
  }

export interface DomainModel {
    "user": User,
    "domain": Domain,
    "token": String;
    "accessToken": String;
    "domainKey": String;
    "apiKey": String;
    "label": String;
    "linkedDomains": Array<any>;
    "partDomains": Array<any>;
    "sqlAccess": Boolean;
    "dbAccess": Boolean;
    "mongoAccess": Boolean;
    "cassandraAccess": Boolean;
    "globalAccess": Boolean;
    "orgs": Array<number>;
  }