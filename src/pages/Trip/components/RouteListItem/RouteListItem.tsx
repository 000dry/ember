import { useRef } from 'react'
import styles from './RouteListItem.module.css'

const RouteListItem = ({ route, index, mapRef, isActive, setActiveLocation }: { route: any, index: number, mapRef: React.RefObject<mapboxgl.Map | null>, isActive: boolean, setActiveLocation: (location: string | null) => void }) => {
    const itemRef = useRef<HTMLDivElement>(null)
    const handleLocationClick = () => {
        if(!isActive) {
            mapRef.current?.flyTo({
                center: [route.location.lon, route.location.lat],
                zoom: 15,
                pitch: 0,
                bearing: 0
            })
            itemRef.current?.scrollIntoView({ behavior: 'smooth' })
            setActiveLocation(route.location.id)
        } else {
            setActiveLocation(null)
        }
    }

    const activeClass = isActive ? styles['route-list-item-active'] : styles['route-list-item']
    return (
        <li ref={itemRef} id={`route-list-item-${index}`} className={styles['route-list-item']}>
            <div className={activeClass} onClick={handleLocationClick}>
                <span className={styles['route-list-item-name']}>{route.location.name}</span>
            </div>
        </li>
    )
}

export default RouteListItem