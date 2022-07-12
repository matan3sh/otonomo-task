import { useCarContext } from '../context/carContext'
import { Card } from './Card';
import './Main.scss'

export function Main() {
  const { streamCars } = useCarContext();

  return (
    <div className='main'>
      {streamCars?.map((car) => (
        <Card key={car.vin} color={car.color} streamer={car.streamer} />
      ))}
    </div>
  )
}
