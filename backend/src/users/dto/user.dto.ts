import { BaseDTO } from '../../core/base.dto';

export class UserDTO extends BaseDTO {
    name: string;
    email: string;
    password: string;
}
