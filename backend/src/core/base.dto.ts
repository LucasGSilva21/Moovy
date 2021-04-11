import { ApiProperty } from "@nestjs/swagger";

export class BaseDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    _v: string;
}
