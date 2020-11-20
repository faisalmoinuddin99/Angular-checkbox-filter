export class Crop {
    name: string;
    checked: boolean;
    district: string
    subCategory: Subcategory[];
}

export class Subcategory {
    id: number;
    name: string;
    checked: boolean;
}