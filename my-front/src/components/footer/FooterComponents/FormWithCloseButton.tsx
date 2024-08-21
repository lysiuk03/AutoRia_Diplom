// Libraries
import React, { useState } from 'react';

// Styles
import './FormWithCloseButton.css';

interface FormWithCloseButtonProps {
    onClose: () => void;
}

const FormWithCloseButton: React.FC<FormWithCloseButtonProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="up-container">
                <h2>Написати</h2>
                <img
                    src="/images/exit.png"
                    alt="Close"
                    onClick={onClose} />
            </div>
            <hr/>
            <input
                type="text"
                name="name"
                placeholder="Ваше ім'я"
                value={formData.name}
                onChange={handleChange}
            />
            <div className="h-container">
                <input
                    type="email"
                    name="email"
                    placeholder="Електронна адреса"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label>*Обов’язково для заповнення. На вказаний e-mail буде надіслано відповідь</label>
            </div>
            <textarea
                name="message"
                placeholder="Введіть запитання"
                value={formData.message}
                onChange={handleChange}
            ></textarea>
            <a>Прикріпити файл</a>
            <button type="submit" >Надіслати запитання</button>
        </form>
    );
};

export default FormWithCloseButton;