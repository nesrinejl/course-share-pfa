import { UserRolesEnum } from '../enumerations/user-roles.enum';


export function getRoutePrefixFromRole(role: UserRolesEnum): string {
    
    return '/' + role.toLowerCase();

}
