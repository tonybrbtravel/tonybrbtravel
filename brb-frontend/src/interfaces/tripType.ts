export interface TripType {
    id: number;
    label: string;
    content: string;
    image: string;
    value: string;
    checked?: boolean;
    name?: string;
    imageUrl?: string;
    status?: string;
}

export interface TripImageType {
    name: string;
    image: string;
    imageUrl?: string;
}
