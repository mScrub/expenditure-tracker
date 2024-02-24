import { useEffect } from 'react';
import classes from './Custommap.module.css'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"; 

import {
    Combobox, 
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutoComplete = ({ setSelected , onUpdateAddressAutoComp, inputTouch, inputFieldReset }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data }, 
        clearSuggestions,
    } = usePlacesAutocomplete(); 

    const handleSelect = async (address) => { 
        onUpdateAddressAutoComp(address)       
        setValue(address, false)  
        clearSuggestions();
        const results = await getGeocode({ address }); 
        const { lat, lng } = await getLatLng(results[0]); 
        setSelected({ lat, lng }); 
    };
    useEffect(() => {
        if(inputFieldReset) {
            setValue('');
        }
    }, [inputFieldReset, setValue])

    const handleChange = (event) => {
        setValue(event.target.value)

    }

    return <>
        <Combobox onSelect={handleSelect}>
            <ComboboxInput onBlur={inputTouch} value={value} onChange={handleChange} disabled={!ready}
                className={classes["combobox-input"]} placeholder="Search an address" />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({ place_id, description }) =>
                        <ComboboxOption key={place_id} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </>
}

export default PlacesAutoComplete