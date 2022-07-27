import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {
    collection, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit, 
    startAfter
} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'


function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] =useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()
    
    useEffect(() => {
        
        const fetchListings = async () => {
            try{
                // Get A Reference
                const listingsRef = collection(db, 'listings')
                
                
                // Create A Query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.categoryname), 
                    orderBy('timestamp', 'desc'), 
                    limit(2)
                )
                
                // Execute Query
                const querySnapshot = await getDocs(q)
                
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                setLastFetchedListing(lastVisible)

                let listings = []
                
                querySnapshot.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error("Could Not Fetch Listings")
                console.log(error)
            }
        } 

        fetchListings()
    }, [params.categoryname])

    const onFetchMoreListings = async () => {
        try{
            // Get A Reference
            const listingsRef = collection(db, 'listings')
            
            
            // Create A Query
            const q = query(
                listingsRef, 
                where('type', '==', params.categoryname), 
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing), 
                limit(10)
            )
            
            // Execute Query
            const querySnapshot = await getDocs(q)
            
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
            setLastFetchedListing(lastVisible)

            let listings = []
            
            querySnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
            })
            })
            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error("Could Not Fetch Listings")
            console.log(error)
        }
    } 


  return (
    <div className="category">
        <header>
        <p className="pageHeader">
            {params.categoryname==='rent' ?
            "Places For Rent"
            :"Places For Sale"}
        </p>
        </header>
        {loading ? (
            <Spinner/> 
        ) : listings && listings.length > 0 ? (
            <>
            <main>
                <ul className='categoryListings'>
                    {listings.map((listing) => (
                        <ListingItem 
                            listing={listing.data}
                            id={listing.id}
                            key={listing.id}
                        />
                    ))}
                </ul>
            </main>
            <br />
            <br />
            {lastFetchedListing && (
                <p 
                    className="loadMore" 
                    onClick={onFetchMoreListings}>
                        Load More
                    </p>
            )}

            </>
        ) : (
            <p>No Listings For {params.categoryname}</p>
        ) }
    </div>

  )
}

export default Category