import { UserRolesEnum } from '.././enumerations/user-roles.enum';

export interface UserData{
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  role: UserRolesEnum,
}
