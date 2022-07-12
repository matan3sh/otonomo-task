import { useState, useEffect } from 'react';
import { CarData } from '../api/data-generator';
import createStreamerFrom from '../api/streamer';
import EventNotification from './EventNotification';
import EventNotificationSkeleton from './EventNotificationSkeleton';
import './Card.scss'

interface CardProps {
  color: string;
  streamer: ReturnType<typeof createStreamerFrom>;
}

export function Card({ color, streamer }: CardProps) {
  const [carData, setCarData] = useState<CarData | null>(null);

  useEffect(() => {
    streamer.subscribe(setCarData);
    streamer.start();
    return () => {
      streamer.stop();
      streamer.removeHandler(setCarData);
    }
  }, [streamer]);

  if (!carData) {
    return <EventNotificationSkeleton />
  }

  return (
      <div className='card'>
        <EventNotification carEvent={carData} color={color} />
      </div>
  )
}
