import { UserRolesEnum } from '.././enumerations/user-roles.enum';

export interface UserData{
  _id?: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  role: UserRolesEnum,
}
