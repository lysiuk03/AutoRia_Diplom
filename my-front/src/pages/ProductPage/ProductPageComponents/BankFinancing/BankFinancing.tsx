import React, { useState } from 'react';
import './BankFinancing.css';

const BankFinancing: React.FC = () => {
    const [selectedBank, setSelectedBank] = useState<string>('');

   
    const banks = [
        { name: 'ПриватБанк', url: 'https://privatbank.ua/kredity/avto-v-kredit' },
        { name: 'Ощадбанк', url: 'https://www.oschadbank.ua/credit/na-nove-avto' },
        { name: 'Банк ПУМБ', url: 'https://b2b.pumb.ua/finance/carcredit' },
        { name: 'Укргазбанк', url: 'http://www.ukrgasbank.com/autocredit/autocredit' },
    ];

    const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBank(event.target.value); 
    };

    const handlePropositionButtonClick = () => {
        const bank = banks.find(b => b.name === selectedBank);
        if (bank) {
            window.open(bank.url, '_blank'); 
        } else {
            alert('Будь ласка, виберіть банк');
        }
    };

    return (
        <div className="bank-financing-container">
            <div className="financing-header">
                <img src="/images/money.png" alt="Finance Icon" />
                <h4>ПІДБІР ФІНАНСУВАННЯ АВТО ВІД БАНКІВ</h4>
            </div>
            <div className="financing-option">
                <label>Банк</label>
                <select onChange={handleBankChange}>
                    <option value="">--обрати банк--</option>
                    {banks.map((bank, index) => (
                        <option key={index} value={bank.name}>{bank.name}</option>
                    ))}
                </select>
            </div>
            <button className="proposition-button" onClick={handlePropositionButtonClick}>
                Дивитись пропозиції банку
            </button>
        </div>
    );
};

export default BankFinancing;
