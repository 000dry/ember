import './Trip.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map/Map'
import { useParams } from "react-router";
import { useTrip } from '../../hooks';
import RouteOverlay from './components/RouteOverlay/RouteOverlay';
import { useEffect, useRef, useState } from 'react';
import Marker from './components/Marker/Marker';
import mapboxgl from 'mapbox-gl';

const Trip = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const { id } = useParams()
  const { data, isLoading, fetchTrip } = useTrip(id)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<{ lat: number, lng: number } | null>({
      lat: 55.95,
      lng: -3.19
  })

  useEffect(() => {
    // initialize mapbox and get data
    const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const style = {
        light: 'mapbox://styles/000dry/cme0gu70l007v01qzcz0og8k6',
        dark: 'mapbox://styles/000dry/cme0gityd00ws01qsf9v20n3w',
    }[mode]

    if (!mapContainerRef.current) return;
   
    mapboxgl.accessToken = 'pk.eyJ1IjoiMDAwZHJ5IiwiYSI6ImNtZTBlMGdqMTAzbHgyaXNiZHJyYmY3YnQifQ.McgWwLNaDNRcR_4W7n0YGQ'
    mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style,
        center: [position?.lng ?? 0, position?.lat ?? 0],
        zoom: 8,
    });

    mapRef.current.on('load', () => {
      fetchTrip()
    })

    return () => {
        mapRef.current?.remove()
    }
  }, [position, mapContainerRef])


  return (
    <>
      {isLoading && <div>Loading...</div>}
      {<Map mapContainerRef={mapContainerRef} position={position} setPosition={setPosition} />}
      {mapRef.current && data && data.route.map((route: any) => {
        return <Marker route={route} mapRef={mapRef.current} />})}
      {!isLoading && data && <RouteOverlay data={data} mapRef={mapRef}/>}
    </>
  )
}

export default Trip
