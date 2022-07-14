import { useState } from 'react';
import { useCarContext } from '../context/carContext'
import Checkbox from './Checkbox';
import EventNotification from './EventNotification';
import './Main.scss'

export function Main() {
  const { carData, handleFilter, vinStreamer } = useCarContext();
  const [toggleFilter, setToggleFilter] = useState(false);

  const handleClick = () => {
    setToggleFilter(prev => !prev);
    handleFilter(toggleFilter);
  }

  return (
    <div className='main'>
      <div className="main__filter">
        <Checkbox
          id="filter"
          name="filter"
          checked={toggleFilter}
          onClick={handleClick}
          disabled={!Object.keys(vinStreamer).length}
        />
        <span>Filter events where fuel level is under 15%</span>
      </div>

      <div className='main__events'>
        {carData?.map((car) => (
          <div className='main__event'>
            <EventNotification carEvent={car} color={car.color} />
          </div>
        ))}
      </div>
    </div>
  )
}
