import { useEffect, useState } from "react"
import RouteListItem from "../RouteListItem/RouteListItem"
import styles from './RouteSidebar.module.css'
import LocationInfo from "../LocationInfo/LocationInfo";
import TopNav from "../TopNav/TopNav";
import RouteProgressBar from "../RouteProgressBar/RouteProgressBar";

const RouteSidebar = ({ data, mapRef }: { data: any, mapRef: React.RefObject<mapboxgl.Map | null> }) => {
    const [activeLocation, setActiveLocation] = useState<string | null>(null)
    const [showRouteContent, setShowRouteContent] = useState<boolean>(false)

    useEffect(() => {
        // when activeLocation state changes, debounce showing the content to allow time for the information panel to animate in
        const debouncedContent = setTimeout(() => setShowRouteContent(true), 275)
        if(activeLocation) {
            // lock the scroll on the list
            const list = document.getElementById('route-navigation-list')
            if(list) {
                list.style.overflow = 'hidden'
            }

            // shrink the width of the map and move it to the right to allow space for the info container
            const mapContainer = document.getElementById('map-container')
            if(mapContainer) {
                mapContainer.style.left = '45%'
                mapContainer.style.width = '50%'
            }

            // reveal the info container
            const routeItemInfoContainer = document.getElementById('route-item-info-container')
            if(routeItemInfoContainer) {
                routeItemInfoContainer.style.width = '20%'
            }
        } else {
            // clear any waiting timeouts when activeLocation updates to null
            clearTimeout(debouncedContent)

            // release the scroll on the list
            const list = document.getElementById('route-navigation-list')
            if(list) {
                list.style.overflow = 'auto'
            }

            // restore the width of the map and move it to the left to allow space for the info container
            const mapContainer = document.getElementById('map-container')
            if(mapContainer) {
                mapContainer.style.left = '30%'
                mapContainer.style.width = '60%'
            }

            // shrink info container back out of view
            const routeItemInfoContainer = document.getElementById('route-item-info-container')
            if(routeItemInfoContainer) {
                routeItemInfoContainer.style.width = '0%'
            }
            setShowRouteContent(false)
        }
    }, [activeLocation])

    useEffect(() => {
        const list = document.getElementById('route-navigation-list')
        const containerYCoord = list?.getBoundingClientRect().y
        const ghostItem = document.getElementById('ghost-list-item')
        const listItems = document.querySelectorAll('[id^="route-list-item-"]')
        const lastItemHeight = listItems[listItems.length - 1].offsetHeight ?? 0

        if(ghostItem) {
            ghostItem.style.height = `${(list?.offsetHeight ?? 0) - lastItemHeight - 40}px`
        }
        
        const handleScrollEnd = () => {
            // on scroll end, find the location that is at the top of the list and fly to it
            listItems.forEach((item: any, index: number) => {
                const listItemYCoord = item.getBoundingClientRect().y
                if(listItemYCoord === containerYCoord) {
                    const route = data.route[index]
                    mapRef.current?.flyTo({
                        center: [route.location.lon, route.location.lat],
                        zoom: 15,
                    })
                }
            })
        }

        const handleScroll = () => {
            // on scroll, update the progress of the visual representation of the journey progress that is to the left of the list
            const scrollPercentage = (list?.scrollTop ?? 0) / ((list?.scrollHeight ?? 0 )- (ghostItem?.offsetHeight ?? 0) - lastItemHeight - 20) * 100
            const progressBar = document.getElementById('route-progress-bar-filled') as HTMLElement

            if(progressBar) {
                progressBar.style.height = `${scrollPercentage}%`
            }
        }
        
        list?.addEventListener('scrollend', handleScrollEnd)
        list?.addEventListener('scroll', handleScroll)

        // remove the event listeners when the component unmounts
        return () => {
            list?.removeEventListener('scrollend', handleScrollEnd)
            list?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const routeContent = data.route.find((route: any) => route.location.id === activeLocation)
    
    return (
        <>
        <TopNav />
        <div className={styles['route-info-container']}>
            <div className={styles['route-info-container-grid']}>
                <RouteProgressBar data={data} />
                <div id="route-navigation-list" className={styles['route-navigation-list']}>
                    <ol>
                        {[...data.route.map((route: any, index: number) => (<RouteListItem route={route} key={route.location.id} index={index} mapRef={mapRef} isActive={activeLocation === route.location.id} setActiveLocation={setActiveLocation}/>)),
                        <div id="ghost-list-item" className={styles['ghost-list-item']} />
                    ]}
                    </ol>
                </div>           
            </div>
        </div>
        {activeLocation && <LocationInfo showRouteContent={showRouteContent} routeContent={routeContent} setActiveLocation={setActiveLocation} activeLocation={activeLocation} />}
        </>
    )
}

export default RouteSidebar