import { ChangeEvent, useState } from 'react';
import { useCarContext, Vin } from '../context/carContext';
import createRandomColor from '../dom-utils/colors';
import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';
import './Sidebar.scss';

const SPECIAL_CHARACTERS_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

export function Sidebar() {
  const { handleCheckVin, handleNewVin } = useCarContext();
  const [vin, setVin] = useState<string>('');
  const [vins, setVins] = useState<Vin[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isValidInput = () => {
    let isValid = true;

    /* Remove spacing */
    const fixedVin = vin.trim();

    /* Check if the vin is not empty and at least 7 characters */
    if (!fixedVin.length || vin.length < 7) {
      setError('VIN must be at least 7 characters long');
      isValid = false;
    }

    /* Check if the vin is already exists */
    if (vins.some((currentVin) => currentVin.vin === vin)) {
      setError('VIN already exists');
      isValid = false;
    }
    return isValid;
  }

  const handleAddNewVin = () => {
    if (!isValidInput()) {
      return;
    }
    const newVin = { vin, checked: false, color: createRandomColor() }
    setVins(prev => [newVin, ...prev]);
    setError(null);
    setVin('');
  }

  const handleCheck = (vin: Vin) => {
    const updatedVin = { ...vin, checked: !vin.checked };
    const updatedVins = vins.map(currentVIN => currentVIN.vin === vin.vin ? updatedVin : currentVIN);
    setVins(updatedVins);
    handleCheckVin(updatedVin);
    if(updatedVin.checked) {
      handleNewVin(vin);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVin(value.replace(SPECIAL_CHARACTERS_REGEX, '').toUpperCase());
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__input'>
        <div className='sidebar__input-wrapper'>
          <Input
            id="vin"
            name="vin"
            placeholder="Enter VIN"
            value={vin}
            onChange={handleChange}
          />
          <span>{error}</span>
        </div>
          <Button onClick={handleAddNewVin}>+ Add</Button>
      </div>

      <div className='sidebar__vins'>
        {vins.map((car) => (
          <div key={car.vin} className='sidebar__vins-list'>
            <Checkbox checked={car.checked} onChange={() => handleCheck(car)} />
            <span style={{color: car.color}} >{ car.vin }</span>
          </div>
        ))}
      </div>
    </div>
  )
}
