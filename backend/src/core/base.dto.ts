import { ApiProperty } from "@nestjs/swagger";

export class BaseDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    _v: string;
}
