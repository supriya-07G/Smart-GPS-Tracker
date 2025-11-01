import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import LiveMapTab from './tabs/LiveMapTab';
import HardwareTab from './tabs/HardwareTab';
import DataTab from './tabs/DataTab';
import AboutTab from './tabs/AboutTab';

export interface GPSData {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
}

const GPSTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [gpsData, setGpsData] = useState<GPSData[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 16.313557,
    longitude: 80.453133
  });
  const { toast } = useToast();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('gpsTrackerData');
    if (savedData) {
      try {
        setGpsData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading GPS data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever gpsData changes
  useEffect(() => {
    if (gpsData.length > 0) {
      localStorage.setItem('gpsTrackerData', JSON.stringify(gpsData));
    }
  }, [gpsData]);

  const addGPSData = (latitude: number, longitude: number) => {
    const newData: GPSData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      latitude,
      longitude
    };
    setGpsData(prev => [newData, ...prev]);
    setCurrentLocation({ latitude, longitude });
    
    toast({
      title: "Location Updated",
      description: `New coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    });
  };

  const exportToCSV = () => {
    if (gpsData.length === 0) {
      toast({
        title: "No Data",
        description: "No GPS data available to export.",
        variant: "destructive"
      });
      return;
    }

    const csvContent = [
      ['Timestamp', 'Latitude', 'Longitude'],
      ...gpsData.map(data => [
        new Date(data.timestamp).toLocaleString(),
        data.latitude.toString(),
        data.longitude.toString()
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gps-tracker-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast({
      title: "Export Successful",
      description: "GPS data exported to CSV file.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Smart GPS Tracker</h1>
            <p className="text-lg opacity-90">Real-Time Wireless Tracking System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <LiveMapTab 
              currentLocation={currentLocation}
              onLocationUpdate={addGPSData}
            />
          </TabsContent>

          <TabsContent value="hardware">
            <HardwareTab />
          </TabsContent>

          <TabsContent value="data">
            <DataTab 
              gpsData={gpsData}
              onExport={exportToCSV}
              onAddData={addGPSData}
            />
          </TabsContent>

          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GPSTracker;