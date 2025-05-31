import {Role} from './roles';

export interface User {
  username:string;
  password:string;
  email:string;
  role?:Role;
  firstName:string;
  lastName:string;
  phone:string;
}
