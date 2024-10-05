import React, { useState } from 'react';
import axios from 'axios';

const CarCreateForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        stage: '',
        mileage: 0,
        vin: '',
        year: new Date().getFullYear(),
        price: 0,
        metallic: false,
        accidentParticipation: false,
        hasPowerWindows: false,
        hasAirConditioning: false,
        hasLeatherInterior: false,
        hasPremiumInteriorColor: false,
        hasPowerSteering: false,
        hasHeightAdjustableSeats: false,
        hasHeadlights: false,
        hasSpareWheel: false,
        hasSeatMemory: false,
        hasHeatedSeats: false,
        hasSeatVentilation: false,
        isNotCustomsCleared: false,
        isBargainAvailable: false,
        isExchangeAvailable: false,
        isInstallmentAvailable: false,
        carBrandId: null,
        transportTypeId: null,
        carModelId: null,
        bodyTypeId: null,
        transmissionTypeId: null,
        numberOfSeatsId: null,
        fuelTypesId: null,
        engineVolumeId: null,
        cityId: null,
        colorId: null,
        photos: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photos: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        for (const key in formData) {
            if (key === 'photos') {
                formData.photos.forEach((file) => {
                    form.append('photos', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:5174/api/Car', form);
            console.log(form);
            console.log(response.status);
            // Можна додати логіку для скидання форми або переходу на іншу сторінку
        } catch (error) {
            // Обробка помилок
            console.error('Error adding car:', error.response?.data || error.message);
            alert('Помилка при додаванні автомобіля: ' + (error.response?.data || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Stage:</label>
                <input type="text" name="stage" value={formData.stage} onChange={handleChange} required />
            </div>
            <div>
                <label>Mileage:</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div>
                <label>VIN:</label>
                <input type="text" name="vin" value={formData.vin} onChange={handleChange} required />
            </div>
            <div>
                <label>Year:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Accident Participation:</label>
                <input type="checkbox" name="accidentParticipation" checked={formData.accidentParticipation} onChange={handleChange} />
            </div>
            <div>
                <label>Has Power Windows:</label>
                <input type="checkbox" name="hasPowerWindows" checked={formData.hasPowerWindows} onChange={handleChange} />
            </div>
            <div>
                <label>Has Air Conditioning:</label>
                <input type="checkbox" name="hasAirConditioning" checked={formData.hasAirConditioning} onChange={handleChange} />
            </div>
            <div>
                <label>Has Leather Interior:</label>
                <input type="checkbox" name="hasLeatherInterior" checked={formData.hasLeatherInterior} onChange={handleChange} />
            </div>
            <div>
                <label>Has Premium Interior Color:</label>
                <input type="checkbox" name="hasPremiumInteriorColor" checked={formData.hasPremiumInteriorColor} onChange={handleChange} />
            </div>
            <div>
                <label>Has Power Steering:</label>
                <input type="checkbox" name="hasPowerSteering" checked={formData.hasPowerSteering} onChange={handleChange} />
            </div>
            <div>
                <label>Has Height Adjustable Seats:</label>
                <input type="checkbox" name="hasHeightAdjustableSeats" checked={formData.hasHeightAdjustableSeats} onChange={handleChange} />
            </div>
            <div>
                <label>Has Headlights:</label>
                <input type="checkbox" name="hasHeadlights" checked={formData.hasHeadlights} onChange={handleChange} />
            </div>
            <div>
                <label>Has Spare Wheel:</label>
                <input type="checkbox" name="hasSpareWheel" checked={formData.hasSpareWheel} onChange={handleChange} />
            </div>
            <div>
                <label>Has Seat Memory:</label>
                <input type="checkbox" name="hasSeatMemory" checked={formData.hasSeatMemory} onChange={handleChange} />
            </div>
            <div>
                <label>Has Heated Seats:</label>
                <input type="checkbox" name="hasHeatedSeats" checked={formData.hasHeatedSeats} onChange={handleChange} />
            </div>
            <div>
                <label>Has Seat Ventilation:</label>
                <input type="checkbox" name="hasSeatVentilation" checked={formData.hasSeatVentilation} onChange={handleChange} />
            </div>
            <div>
                <label>Is Not Customs Cleared:</label>
                <input type="checkbox" name="isNotCustomsCleared" checked={formData.isNotCustomsCleared} onChange={handleChange} />
            </div>
            <div>
                <label>Is Bargain Available:</label>
                <input type="checkbox" name="isBargainAvailable" checked={formData.isBargainAvailable} onChange={handleChange} />
            </div>
            <div>
                <label>Is Exchange Available:</label>
                <input type="checkbox" name="isExchangeAvailable" checked={formData.isExchangeAvailable} onChange={handleChange} />
            </div>
            <div>
                <label>Is Installment Available:</label>
                <input type="checkbox" name="isInstallmentAvailable" checked={formData.isInstallmentAvailable} onChange={handleChange} />
            </div>
            <div>
                <label>Car Brand ID:</label>
                <input type="number" name="carBrandId" value={formData.carBrandId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Transport Type ID:</label>
                <input type="number" name="transportTypeId" value={formData.transportTypeId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Car Model ID:</label>
                <input type="number" name="carModelId" value={formData.carModelId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Body Type ID:</label>
                <input type="number" name="bodyTypeId" value={formData.bodyTypeId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Transmission Type ID:</label>
                <input type="number" name="transmissionTypeId" value={formData.transmissionTypeId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Number Of Seats ID:</label>
                <input type="number" name="numberOfSeatsId" value={formData.numberOfSeatsId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Fuel Types ID:</label>
                <input type="number" name="fuelTypesId" value={formData.fuelTypesId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Engine Volume ID:</label>
                <input type="number" name="engineVolumeId" value={formData.engineVolumeId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>City ID:</label>
                <input type="number" name="cityId" value={formData.cityId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Color ID:</label>
                <input type="number" name="colorId" value={formData.colorId || ''} onChange={handleChange} />
            </div>
            <div>
                <label>Photos:</label>
                <input type="file" name="photos" multiple onChange={handleFileChange} />
            </div>
            <div>
                <button type="submit">Add Car</button>
            </div>
        </form>
    );
};

export default CarCreateForm;
