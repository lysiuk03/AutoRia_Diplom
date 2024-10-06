
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
export interface CarUser extends Car{
    user :
        {
            firstName: string,
            middleName: string,
            lastName: string,
            region: string,
            city: string,
            rating: number,
            phoneNumber: string,
            cars: [],
            photo?: string,
            userRoles: null,
            id: number,
            userName: string,
            normalizedUserName: string,
            email?: string,
            normalizedEmail: string,
            emailConfirmed: false,
            passwordHash: string,
            securityStamp: string,
            concurrencyStamp: string,
            phoneNumberConfirmed: false,
            twoFactorEnabled: false,
            lockoutEnd: null,
            lockoutEnabled: true,
            accessFailedCount: 0
        };
}

export interface UserCar {
    id: number;
    carModel: {
        id: number;
        name: string;
    };
    carBrand: {
        id: number;
        name: string;
    };
    bodyType: {
        name: string;
    };
    city: {
        id: number;
        name: string;
    };
    color: {
        color: string;
        id: number;
        isDeleted: boolean;
        dateCreated: string;
    };
    engineVolume: {
        id: number;
        volume: string;
    };
    fuelTypes: {
        name: string;
        id: number;
        isDeleted: boolean;
        dateCreated: string;
    };
    numberOfSeats: {
        id: number;
        number: number;
        seatType: string;
    };
    transmissionType: {
        id: number;
        name: string;
    };
    transportType: {
        name: string;
    };
    photos: string[];
    user: {
        userId: number;
        userName: string;
        firstName: string;
        middleName: string;
        lastName: string;
    };

    // Car-specific details
    year: number;
    vin: string;
    mileage: number;
    metallic: boolean;
    accidentParticipation: boolean;
    description: string;
    price: number;
    stage: string;
    dateCreated: string;

    // Additional features and selling options
    hasPowerWindows: boolean;
    hasAirConditioning: boolean;
    hasLeatherInterior: boolean;
    hasPremiumInteriorColor: boolean;
    hasPowerSteering: boolean;
    hasHeightAdjustableSeats: boolean;
    hasHeadlights: boolean;
    hasSpareWheel: boolean;
    hasSeatMemory: boolean;
    hasHeatedSeats: boolean;
    hasSeatVentilation: boolean;
    isNotCustomsCleared: boolean;
    isBargainAvailable: boolean;
    isExchangeAvailable: boolean;
    isInstallmentAvailable: boolean;
}


