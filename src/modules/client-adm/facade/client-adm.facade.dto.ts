export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
}


export interface FindClientByIdFacadeInputDto {
    id: string;
}

export interface FindClientByIdFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}