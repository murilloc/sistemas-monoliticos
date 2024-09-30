export interface FindByIdStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindByIdStoreCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}


export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}