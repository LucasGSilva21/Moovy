import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(userMail: string, userPassword: string) {
        const user = await this.usersService.getByEmail(userMail);

        if(user && (await bcrypt.compare(userPassword, user.password))) {
            const { _id, name, email} = user;
            
            return { id: _id, name, email};
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };

        return {
            user,
            access_token: this.jwtService.sign(payload),
        }
    }
}
