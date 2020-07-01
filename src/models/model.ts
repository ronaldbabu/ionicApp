import { JsonObject, JsonProperty } from 'json2typescript';

// User Model
@JsonObject
export class User {
@JsonProperty('id', String, false)
userId: any = undefined;
@JsonProperty('username', String, false)
userName: any = undefined;
@JsonProperty('firstName', String, false)
firstName: any = undefined;
@JsonProperty('lastName', String, false)
lastName: any = undefined;
@JsonProperty('email', String, false)
email: any = undefined;
@JsonProperty('password', String, false)
password: any = undefined;
@JsonProperty('phone', String, false)
phone: any = undefined;
@JsonProperty('tokenExpiry', String, false)
tokenExpiry: any = undefined;
@JsonProperty('token', String, false)
token: string = undefined;
}
