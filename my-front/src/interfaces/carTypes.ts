export interface ICarPhoto {
    name: string;
    priority: number;
}

export interface ICar {
    id: number;
    model: string;
    manufacturer: string;
    description: string;
    stage: string;
    mileage: number;
    vin: string;
    photos: ICarPhoto[];
    dateCreated: string;
}

// ICarView.ts
export interface ICarView {
    year: number;
    model: string;
    manufacturer: string;
    mileage: number;
    vin: string;
    stage: string;
    description: string;
    photos: string[]; // Assuming photos is an array of URLs or image paths
    transportType: string | null; // Adjust based on possible values
    carModel: string | null; // Adjust based on possible values
    bodyType: string | null; // Adjust based on possible values
    transmissionType: string | null; // Adjust based on possible values
    numberOfSeats: number | null; // Adjust based on possible values
    fuelTypes: string[] | null; // Assuming fuelTypes is an array of strings
    engineVolume: number | null; // Adjust based on possible values
    city: string | null; // Adjust based on possible values
    color: string | null; // Adjust based on possible values
    metallic: boolean;
    accidentParticipation: boolean;
    id: number;
    isDeleted: boolean;
    dateCreated: string; // ISO date string
}
