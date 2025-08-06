import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { createPortal } from "react-dom";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';

const Marker = ({ route, mapRef }: { route: any, mapRef: any }) => {
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const contentRef = useRef(document.createElement("div"));

    useEffect(() => {
        markerRef.current = new mapboxgl.Marker(contentRef.current).setLngLat([route.location.lon, route.location.lat]).addTo(mapRef)

        return () => {
            markerRef.current?.remove()
        }
    }, [])

    return <>
        {createPortal(
            <div ref={contentRef}>
                <span style={{ height: '20px', width: '20px' }}>
                    <LocationOnTwoToneIcon fontSize="large" />
                </span>
            </div>,
            contentRef.current
        )}
    </>
}

export default Marker