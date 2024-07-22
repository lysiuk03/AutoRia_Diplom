import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
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
            <h2>ЗВ`ЯЖІТЬСЯ З НАМИ</h2>
            <input
                type="email"
                name="email"
                placeholder="Електронна адреса"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="name"
                placeholder="Ім`я"
                value={formData.name}
                onChange={handleChange}
            />
            <textarea
                name="message"
                placeholder="Як ми можемо допомогти?"
                value={formData.message}
                onChange={handleChange}
            ></textarea>
            <button type="submit">Надіслати</button>
        </form>
    );
};

export default ContactForm;