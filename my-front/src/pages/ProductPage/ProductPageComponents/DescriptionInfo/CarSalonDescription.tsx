import React from 'react';
import "./DescriptionInfo.css"
import { ProductInfoProps } from '../../../../interfaces/Car';

const CarSalonDescription: React.FC<ProductInfoProps> = ({ car }) => {
    if (!car) {
        return <div>Loading...</div>;
    }

    const {
        metallic,
        accidentParticipation,
        hasPowerWindows,
        hasAirConditioning,
        hasLeatherInterior,
        hasPremiumInteriorColor,
        hasPowerSteering,
        hasHeadlights,
        hasSpareWheel,
        hasSeatMemory,
        hasHeatedSeats,
        hasSeatVentilation,
        isNotCustomsCleared,
        isBargainAvailable,
        isExchangeAvailable,
        isInstallmentAvailable,

    } = car;

    const descriptions: Record<string, { value: boolean; trueText: string; falseText: string }> = {
        metallic: { value: metallic, trueText: "Металеве покриття", falseText: "Не металеве покриття" },
        accidentParticipation: { value: accidentParticipation, trueText: "Брав участь в аварії", falseText: "Не брав участі в аваріях" },
        hasPowerWindows: { value: hasPowerWindows, trueText: "Електросклопідйомники", falseText: "Без електросклопідйомників" },
        hasAirConditioning: { value: hasAirConditioning, trueText: "Кондиціонер", falseText: "Без кондиціонера" },
        hasLeatherInterior: { value: hasLeatherInterior, trueText: "Шкіряний салон", falseText: "Не шкіряний салон" },
        hasPremiumInteriorColor: { value: hasPremiumInteriorColor, trueText: "Преміум колір інтер'єру", falseText: "Звичайний колір інтер'єру" },
        hasPowerSteering: { value: hasPowerSteering, trueText: "Підсилювач керма", falseText: "Без підсилювача керма" },
        hasHeadlights: { value: hasHeadlights, trueText: "Фари", falseText: "Без фар" },
        hasSpareWheel: { value: hasSpareWheel, trueText: "Запасне колесо", falseText: "Без запасного колеса" },
        hasSeatMemory: { value: hasSeatMemory, trueText: "Пам'ять сидінь", falseText: "Без пам'яті сидінь" },
        hasHeatedSeats: { value: hasHeatedSeats, trueText: "Підігрів сидінь", falseText: "Без підігріву сидінь" },
        hasSeatVentilation: { value: hasSeatVentilation, trueText: "Вентиляція сидінь", falseText: "Без вентиляції сидінь" },
        isNotCustomsCleared: { value: isNotCustomsCleared, trueText: "Не розмитнений", falseText: "Розмитнений" },
        isBargainAvailable: { value: isBargainAvailable, trueText: "Доступний торг", falseText: "Торг недоступний" },
        isExchangeAvailable: { value: isExchangeAvailable, trueText: "Доступний обмін", falseText: "Обмін недоступний" },
        isInstallmentAvailable: { value: isInstallmentAvailable, trueText: "Доступна розстрочка", falseText: "Розстрочка недоступна" },
    };

    const getDescriptionText = (value: boolean, trueText: string, falseText: string) =>
        value ? trueText : falseText;

    return (

        <div className="description-container">
            <h4>КОМЕНТАР:</h4>
            <ul>
                {Object.values(descriptions).map((item, index) => (
                    <li key={index}>{getDescriptionText(item.value, item.trueText, item.falseText)}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarSalonDescription;