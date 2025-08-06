import styles from './TopNav.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmberLogo from '../../../../assets/EmberLogo.svg?react'
import { useNavigate } from 'react-router'

const TopNav = () => {
    const navigate = useNavigate()
    return (
        <div className={styles['top-nav']}>
            <div className={styles['top-nav-title-container']}>
                <ArrowBackIcon onClick={() => navigate(-1)} fontSize="small" className={styles['top-nav-back-button']}/>
                <EmberLogo className={styles['ember-logo']} />
            </div>
        </div>
    )
}

export default TopNav