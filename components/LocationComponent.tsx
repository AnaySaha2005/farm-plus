"use client";
import { useEffect, useState } from 'react';
export default function LocationComponent(
) {
  const [location, setLocation] = useState({ "latitude": 21, "longitude": 78 });
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      });
    }
  }, []);
  return <></>
}