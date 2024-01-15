import { useLoadScript } from '@react-google-maps/api'
import Custommap from './Custommap';
const GMapAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

function GoogleMapsPlaces({ onAddressChange }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${GMapAPIKey}`,
        libraries: libraries,
    })
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (<Custommap onUpdateAddress={onAddressChange} />)
    }
}

export default GoogleMapsPlaces;
