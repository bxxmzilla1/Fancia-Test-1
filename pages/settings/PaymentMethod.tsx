
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, CreditCardIcon, TrashIcon } from '../../components/icons/Icons';

const PaymentMethod: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const savedCards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '08/26', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '11/24', isDefault: false },
  ];

  const InputField: React.FC<{ label: string; id: string; placeholder: string }> = ({ label, id, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input id={id} placeholder={placeholder} className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/settings" className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6">
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Settings
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Payment Method</h1>

      <div className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Saved Cards</h2>
        <ul className="space-y-4 mb-6">
            {savedCards.map(card => (
                <li key={card.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                        <CreditCardIcon className="w-8 h-8 text-gray-500" />
                        <div>
                            <p className="font-semibold">{card.type} ending in {card.last4}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Expires {card.expiry}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {card.isDefault && <span className="text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">Default</span>}
                        <button className="text-gray-400 hover:text-red-500 transition">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        
        {!showForm && (
            <button onClick={() => setShowForm(true)} className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                Add New Card
            </button>
        )}
        
        {showForm && (
            <form className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                 <h3 className="text-lg font-semibold">Add a new card</h3>
                 <InputField label="Name on Card" id="cardName" placeholder="John Doe" />
                 <InputField label="Card Number" id="cardNumber" placeholder="•••• •••• •••• ••••" />
                 <div className="grid grid-cols-2 gap-4">
                     <InputField label="Expiry Date" id="cardExpiry" placeholder="MM / YY" />
                     <InputField label="CVC" id="cardCvc" placeholder="•••" />
                 </div>
                 <div className="flex items-center pt-2">
                    <input id="default" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
                    <label htmlFor="default" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Set as default payment method</label>
                 </div>
                 <div className="flex gap-4 justify-end pt-4">
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">Add Card</button>
                 </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
