import { UserMovie } from '../interfaces/user-movie.interface';
import { UserMovieDTO } from '../dto';

export class UserMovieMapper {
    static fromEntityToDTO(entity: UserMovie): UserMovieDTO {
        if (!entity) return;

        const entityDTO = new UserMovieDTO();

        entityDTO._id = entity._id;
        entityDTO.userId = entity.userId;
        entityDTO.imdbID = entity.imdbID;
        entityDTO.poster = entity.poster;
        entityDTO.title = entity.title;
        entityDTO.imdbRating = entity.imdbRating;
        entityDTO.createdAt = entity.createdAt;
        entityDTO.updatedAt = entity.updatedAt;

        return entityDTO;
    }
}
