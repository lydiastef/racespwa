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

  
const EventsPage = () => {
    const [data, setData] = useState<any>(null); // Using 'any' temporarily to bypass strict type checks
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('raceapi')  // Removed type parameters to simplify
                .select('*');

            if (error) {
                setError(error.message);
                setData(null);
            } else {
                setData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data found.</div>;

    return (
        <div>
            {data.map((item: any) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.created_at}</p>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    );
};

export default EventsPage;