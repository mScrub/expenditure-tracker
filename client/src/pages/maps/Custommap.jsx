import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api"
import classes from './Custommap.module.css'
import PlacesAutocomplete from './PlacesAutoComplete'

export default function Custommap({onUpdateAddress}) {
    const [center, setCenter] = useState({lat: 49.28, lng: -123.12});
    const [zoom, setZoom] = useState(10);
    const [selectedCamPos, setSelectedCamPos] = useState(null); 
    useEffect(() => { 
        if(!selectedCamPos) return;
        setCenter(selectedCamPos)
        setZoom(16);
    }, [selectedCamPos, zoom])
    return (<>
        <div className={classes["places-container"]}>
            <PlacesAutocomplete setSelected={setSelectedCamPos} onUpdateAddressAutoComp={onUpdateAddress} />
        </div>
        <div >
            <GoogleMap zoom={zoom} center={center} mapContainerStyle={{ width: '100%', height: '400px', marginTop: '10px', borderRadius: '0.5rem'}}>
                {selectedCamPos && <Marker position={selectedCamPos} />}
            </GoogleMap>
        </div>
    </>)
}

