export interface FindClientByIdInputDto {
    id: string;
}

export interface FindClientByIdOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}