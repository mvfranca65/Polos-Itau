export interface PolosItau {
    id: number;
    name: string;
    business: string;
    valuation: number;
    active: boolean;
    cep: string;
    cnpj: number;
    action?: string;
}

export interface AddressItau {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    service?: string;
}