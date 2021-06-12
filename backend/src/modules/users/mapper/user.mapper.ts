import { User } from '../interfaces/user.interface';
import { UserDTO } from '../dto/user.dto';

export class UserMapper {
    static fromEntityToDTO(entity: User): UserDTO {
        if (!entity) return;

        const entityDTO = new UserDTO();

        entityDTO._id = entity._id;
        entityDTO.name = entity.name;
        entityDTO.email= entity.email;
        entityDTO.createdAt = entity.createdAt;
        entityDTO.updatedAt = entity.updatedAt;

        return entityDTO;
    }
}
