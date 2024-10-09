import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { decodeJwt } from 'jose'; // Assuming you have the correct library for decoding JWT tokens
import { RootState } from '../../../../redux/store';

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

    // Fetch the token from Redux
    const token = useSelector((state: RootState) => state.auth.token);

    // Decode the token to get the userId
    let userId: string | null = null;

    if (token) {
        const decodedToken = decodeJwt(token);
        userId = decodedToken?.id || '0'; // Assuming 'id' exists in the token
    }

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

        // Append all form data
        for (const key in formData) {
            if (key === 'photos') {
                formData.photos.forEach((file) => {
                    form.append('photos', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        }

        // Append userId if it's available
        if (userId) {
            form.append('userId', userId);
        }

        try {
            const response = await axios.post('http://localhost:5174/api/Car', form);
            console.log(response.status);
            // You can add logic to reset the form or navigate to another page
        } catch (error) {
            console.error('Error adding car:', error.response?.data || error.message);
            alert('Помилка при додаванні автомобіля: ' + (error.response?.data || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form inputs... */}
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
            {/* ...other inputs... */}
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
