import { useEffect } from 'react';
import { useQuotes } from '../../hooks'
import { Link } from "react-router";

const Home = () => {
    const { data, isLoading, fetchTrip } = useQuotes()
  
    useEffect(() => {
        fetchTrip()
    }, [])

    if (isLoading) return <div>Loading...</div>

    const tripUids= data?.quotes.map((quote: any) => quote.legs[0].trip_uid) ?? []

    return (<ul>{tripUids.map((tripUid: string) => (
                <li key={tripUid}><Link to={`/trip/${tripUid}`}>{tripUid}</Link></li>
            ))}</ul>)
}

export default Home