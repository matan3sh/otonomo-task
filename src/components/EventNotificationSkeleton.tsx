import './EventNotification.scss'
import Skeleton from '@material-ui/lab/Skeleton';

const EventNotificationSkeleton = () => {
  return (
    <article className="car-event">
      <section className="car-event__vin" style={{ backgroundColor: 'transparent' }}>
        <Skeleton animation="wave" variant="text" />
      </section>
      <main className="car-event__body">
        <div className="car-event__stats">
          <div className="car-event__stat car-event__fuel">
            <span className="car-event__label">Fuel Level:</span>
            <span className="car-event__value">
             <Skeleton animation="wave" variant="text" width={180} />
            </span>
          </div>
          <div className="car-event__stat car-event__wiper-fluid">
            <span className="car-event__label">Wiper Fluid:</span>
            <span className="car-event__value">
              <Skeleton animation="wave" variant="text" width={180} />
            </span>
          </div>
          <div className="car-event__stat car-event__location">
            <span className="car-event__label">Location:</span>
            <span className="car-event__value">
               <Skeleton animation="wave" variant="text"/>
            </span>
          </div>
        </div>
        <div className="car-event__time">
          <Skeleton animation="wave" variant="text" width={40} />
        </div>
      </main>
    </article>
  )
}

export default EventNotificationSkeleton
