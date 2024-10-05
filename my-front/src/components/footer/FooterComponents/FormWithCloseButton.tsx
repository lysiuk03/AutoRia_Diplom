import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

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

    // Block scroll when form is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            console.error('All fields are required');
            return;
        }

        const templateParams = {
            from_name: formData.name,
            to_name: 'Support Team',
            message: formData.message,
            email: formData.email,
        };

        emailjs.send('service_wheeldeal', 'template_gjz2u9e', templateParams, 'uqh--ZOMM8g9UJjrh')
            .then((response) => {
                console.log('Email sent successfully:', response.status, response.text);
                onClose(); 
            })
            .catch((err) => {
                console.error('Failed to send email:', err);
            });
    };

    return (
        <>
            <div className="overlay" onClick={onClose}></div> 
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="up-container">
                    <h2>Написати</h2>
                    <img
                        src="/images/exit.png"
                        alt="Close"
                        onClick={onClose}
                        className="close-icon"
                    />
                </div>
                <hr />
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше ім'я"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <div className="h-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Електронна адреса"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>*Обов’язково для заповнення. На вказаний e-mail буде надіслано відповідь</label>
                </div>
                <textarea
                    name="message"
                    placeholder="Введіть запитання"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Надіслати запитання</button>
            </form>
        </>
    );
};

export default FormWithCloseButton;