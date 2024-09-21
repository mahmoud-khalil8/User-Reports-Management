import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {

    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @IsNumber()
    lng: number;

    @IsNumber()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}