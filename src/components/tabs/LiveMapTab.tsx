import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface LiveMapTabProps {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  onLocationUpdate: (latitude: number, longitude: number) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

const LiveMapTab: React.FC<LiveMapTabProps> = ({ currentLocation, onLocationUpdate }) => {
  const [latitude, setLatitude] = useState(currentLocation.latitude.toString());
  const [longitude, setLongitude] = useState(currentLocation.longitude.toString());
  const [isValidInput, setIsValidInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const { toast } = useToast();

  // Initialize map when component mounts
  useEffect(() => {
    const initializeMap = () => {
      if (window.L && mapRef.current && !mapInstanceRef.current) {
        // Initialize the map
        mapInstanceRef.current = window.L.map(mapRef.current).setView(
          [currentLocation.latitude, currentLocation.longitude], 
          13
        );

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(mapInstanceRef.current);

        // Add initial marker
        markerRef.current = window.L.marker([currentLocation.latitude, currentLocation.longitude])
          .addTo(mapInstanceRef.current)
          .bindPopup(`Lat: ${currentLocation.latitude}, Lng: ${currentLocation.longitude}`)
          .openPopup();
      }
    };

    // Load Leaflet if not already loaded
    if (!window.L) {
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = '/assets/leaflet/leaflet.css';
      document.head.appendChild(leafletCSS);

      const leafletJS = document.createElement('script');
      leafletJS.src = '/assets/leaflet/leaflet.js';
      leafletJS.onload = initializeMap;
      document.head.appendChild(leafletJS);
    } else {
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Update map when location changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const newLatLng = [currentLocation.latitude, currentLocation.longitude];
      mapInstanceRef.current.setView(newLatLng, 13);
      markerRef.current.setLatLng(newLatLng);
      markerRef.current.bindPopup(`Lat: ${currentLocation.latitude}, Lng: ${currentLocation.longitude}`);
    }
  }, [currentLocation]);

  const validateCoordinates = (lat: string, lng: string): boolean => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    if (isNaN(latNum) || isNaN(lngNum)) return false;
    if (latNum < -90 || latNum > 90) return false;
    if (lngNum < -180 || lngNum > 180) return false;
    
    return true;
  };

  const handleInputChange = (type: 'lat' | 'lng', value: string) => {
    if (type === 'lat') {
      setLatitude(value);
    } else {
      setLongitude(value);
    }
    
    setIsValidInput(validateCoordinates(
      type === 'lat' ? value : latitude,
      type === 'lng' ? value : longitude
    ));
  };

  const handleUpdateMap = () => {
    if (!isValidInput) {
      toast({
        title: "Invalid Coordinates",
        description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180) values.",
        variant: "destructive"
      });
      return;
    }

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    
    onLocationUpdate(latNum, lngNum);
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Connection Status
            <Badge className={isValidInput ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
              {isValidInput ? "Manual Input Mode" : "Invalid Input"}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Live Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="map-container">
              <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
            </div>
          </CardContent>
        </Card>

        {/* Controls & Data Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Manual Coordinate Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => handleInputChange('lat', e.target.value)}
                  placeholder="-90 to 90"
                  className={!isValidInput ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">Range: -90 to 90</p>
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => handleInputChange('lng', e.target.value)}
                  placeholder="-180 to 180"
                  className={!isValidInput ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">Range: -180 to 180</p>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateMap} 
              className="w-full"
              variant={isValidInput ? "default" : "destructive"}
              disabled={!isValidInput}
            >
              Update Map Location
            </Button>

            {/* Current Location Display */}
            <div className="coordinate-display">
              <h4 className="font-semibold mb-2">Current Location</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Latitude:</strong> {currentLocation.latitude.toFixed(6)}</div>
                <div><strong>Longitude:</strong> {currentLocation.longitude.toFixed(6)}</div>
                <div><strong>Timestamp:</strong> {new Date().toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMapTab;