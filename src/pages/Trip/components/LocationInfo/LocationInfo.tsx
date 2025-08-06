import { format } from "date-fns"
import styles from './LocationInfo.module.css'
import CloseIcon from '@mui/icons-material/Close';

const LocationInfo = ({ showRouteContent, routeContent, setActiveLocation, activeLocation }: { showRouteContent: boolean, routeContent: any, setActiveLocation: (location: string | null) => void, activeLocation: string | null }) => {
    return (
        <div id="route-item-info-container" className={styles['route-item-info-container']}>
        <div className={styles['route-item-info']}>
            <div className={styles['route-item-info-header']}>
                <span style={{visibility: !activeLocation ? 'hidden' : 'visible'}} className={styles['route-item-info-close-button']}><CloseIcon onClick={() => setActiveLocation(null)} fontSize="small" /></span>
            </div>
            {showRouteContent && routeContent && 
                <div className={styles['route-item-info-content-container']}>
                    <h3 className={styles['route-item-info-title']}>{routeContent.location.detailed_name}</h3>
                    <h4 className={styles['route-item-info-title']}>Arrival</h4>
                    <p className={styles['arrival-departure-time']}>{format(routeContent.arrival.scheduled, 'h:mm a')}</p>
                    <h4 className={styles['route-item-info-title']}>Departure</h4>
                    <p className={styles['arrival-departure-time']}>{format(routeContent.departure.scheduled, 'h:mm a')}</p>
                    {routeContent.pre_booked_only ? 
                        <p className={styles['route-item-info-description']}>Pre-booked only. Tickets must be booked online at least 10 minutes before the scheduled departure time.</p>
                    :
                        <p className={styles['route-item-info-description']}>Passengers may purchases tickets when boarding.</p>
                    }
                    {routeContent.allow_drop_off && <p className={styles['route-item-info-description']}>Passengers may be dropped off at this stop.</p>}
                    {routeContent.allow_boarding && <p className={styles['route-item-info-description']}>Passengers can board at this stop.</p>}
                </div>}
        </div>
    </div>
    )
}

export default LocationInfo