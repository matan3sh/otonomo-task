import { ChangeEvent } from 'react';
import { useCarContext } from '../context/carContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';
import './Sidebar.scss';

export function Sidebar() {
  const {
    value,
    cars,
    error,
    setValue,
    setError,
    handleAddCar,
    handleCheck
  } = useCarContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setValue(e.target.value);
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__input'>
        <div className='sidebar__input-wrapper'>
          <Input
            placeholder="Enter VIN"
            value={value}
            onChange={handleChange}
          />
          <span>{ error }</span>
        </div>
          <Button onClick={handleAddCar}>+ Add</Button>
      </div>

      <div className='sidebar__vins'>
        {cars.map((car) => (
          <div key={car.vin} className='sidebar__vins-list'>
            <Checkbox checked={car.checked} onChange={() => handleCheck(car)} />
            <span style={{color: car.color}} >{ car.vin }</span>
          </div>
        ))}
      </div>
    </div>
  )
}
