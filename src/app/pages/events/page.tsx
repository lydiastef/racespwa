'use client'
import './style.css'
import React from 'react';
import Navbar from '../../components/navbar/page';
import Navbar2 from '../../components/navbar/navbar2/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'

type Content = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}
//String means "made up of text"

const Events = () => {
    // State declarations
    const [error, setError] = useState(null); //Handle errors
    const [fetchError, setFetchError] = useState(""); //Handle errors that occur while trying to fetch data
    const [races, setRaces] = useState<Content[] | null>(null);

  // Fetch data function
  //This function handles the asynchronous fetching of data from Supabase, updates the application state with the results, and manages errors that might occur during the process.
  const fetchDataFromTable = async (table: string, setState: React.Dispatch<React.SetStateAction<any>>, query?: string | undefined) => {
    const result = supabase.from('raceapi').select(query);
    type QueryType = QueryData<typeof result>;
    const { data, error } = await result;

    if (error) {
        setFetchError(`Could not fetch races`);
        setState(null);
    }

    if (data) {
        //@ts-ignore
        const typedData: QueryType = data;
        setState(typedData);
        setFetchError("");
    }
};


useEffect(() => {
    fetchDataFromTable('races', setRaces);
    //We want to get data from this table in Supabase

    //UseEffect hook for controlling what information comes into view upon scrolling the popup card
    const handleHashNavigation = () => {
        if (window.location.hash) {
            const element = document.getElementById(decodeURI(window.location.hash.substring(1)));
            if (element) {
                element.scrollIntoView();
            }
        }
    };

    handleHashNavigation(); // Handle hash navigation (#) on initial render

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

      return () => {
        window.removeEventListener('hashchange', handleHashNavigation);
      };
  }, []); // Effect runs only once on mount

    // Pop-up functions - fetching data from Supabase for the popup cards
    /*const openPopup = (person: Staff) => {
        setSelectedPerson(person);
    };
  
    const closePopup = () => {
        setSelectedPerson(null);
    };*/
  
    //This "Get" function gets data (value) from the doctorspage table in Supabase based on a name that it filters through. 
    const get = (name:string): string => {
      return races?.filter(content => content.name === name)[0]?.value ?? "";
    }
    //The first question mark is used to prevent crashing if there's no data to search through in the doctorspage (it might be null or empty).
  //Then it looks for an item where the name property matches the name you passed to the function.
  //The filter returns a list of all items that match the condition so [0] is there to get the first item from this list. 
  //The ?.value part attempts to access the value property of the item in the column "name". The ? before .value is a safety check for if there's no item found.
  //The double question marks ?? are used to provide a default value. If the value is undefined or null, it returns an empty string "". This way, the function always returns a string, even if no matching item is found.
  
  if (fetchError) return <p>{fetchError}</p>;
  
  return(
    <>
      <Navbar/>
      <Navbar2/>
      <h1 className='events-h1'>Choose your race</h1>
      <div id="events"></div>
      <div className='card'>
        <div className='individual-card'>
          <div className='races'>{error && <p>{error}</p>}
            <h1 className='h1'>{get('race1')}</h1>
          </div> 
        </div> 
        <div className='individual-card'>
          <div className='races'>{error && <p>{error}</p>}
            <h1 className='h1'>{get('race2')}</h1>
          </div> 
        </div>           
        </div>
      </>
  );
}

export default Events;