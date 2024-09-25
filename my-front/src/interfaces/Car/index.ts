
export interface CardDimensions {
    height?: number;
    width?: number;
}
export interface Car extends CardDimensions{
    year:number;
    id: number;
    vin: string;
    accidentParticipation: boolean;
    carBrand: {
        id: number;
        name: string;
    };
    carModel: {
        id: number;
        name: string;
        carBrandId: number;
        carBrandName: string;
    };
    city: {
        id: number;
        name: string;
    };
    color: {
        id: number;
        color: string;
        isDeleted: boolean;
        dateCreated: string;
    };
    dateCreated: string;
    description: string;
    engineVolume: {
        id: number;
        volume: string;
    };
    fuelTypes: {
        id: number;
        name: string;
        isDeleted: boolean;
        dateCreated: string;
    };
    mileage: number;
    numberOfSeats: {
        id: number;
        number: number;
        seatType: string;
    };
    photos: {
        // Приклад структури для фотографій (можливо, потрібно буде адаптувати залежно від конкретних даних)
        name:string;
        priority: number;
        id: number;
        url: string;
        description?: string;
    }[];
    price: number | null;
    stage: string;
    transmissionType: {
        id: number;
        name: string;
    };
    metallic: boolean;
}


