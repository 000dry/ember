import { useEffect } from 'react';
import styles from './Map.module.css';

const Map = ({ mapContainerRef, setPosition }: { mapContainerRef: React.RefObject<HTMLDivElement | null>, position: { lat: number, lng: number } | null, setPosition: (position: { lat: number, lng: number } | null) => void }) => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude});
        });
    }, [])

    return <>
        <div id='map-container' ref={mapContainerRef} className={styles['map-container']} />
    </>
}

export default Map