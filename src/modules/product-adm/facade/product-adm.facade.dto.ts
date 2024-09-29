export interface AddProductFacadeInoutDto{
    id?: string;
    name: string;
    purchasePrice: number;
    stock: number;
    description: string;
}

export interface CheckStockFacadeInputDto{
    id: string;
}

export interface CheckStockFacadeOutputDto{
    id: string;
    stock: number;
}

