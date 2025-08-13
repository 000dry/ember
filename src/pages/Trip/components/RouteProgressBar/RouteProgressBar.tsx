import styles from './RouteProgressBar.module.css'

const RouteProgressBar = ({ data }: { data: any }) => {
    return (
        <div className={styles['route-progress-bar-container']}>
            <span className={styles['start-end-location']}>{data.route[0].location.region_name}</span>
            <div className={styles['route-progress-bar']}>
                <div id="route-progress-bar-empty" className={styles['route-progress-bar-empty']}>
                    <div id="route-progress-bar-filled" className={styles['route-progress-bar-filled']} />
                </div>
            </div>
            <span className={styles['start-end-location']}>{data.route[data.route.length - 1].location.region_name}</span>
        </div>
    )
}

export default RouteProgressBar