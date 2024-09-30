export interface FindByIdInputDto {
    id: string;
}

export interface FindByIdOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}