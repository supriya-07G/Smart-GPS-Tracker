import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download, Plus, Trash2 } from 'lucide-react';

export interface GPSData {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
}

interface DataTabProps {
  gpsData: GPSData[];
  onExport: () => void;
  onAddData: (latitude: number, longitude: number) => void;
}

const DataTab: React.FC<DataTabProps> = ({ gpsData, onExport, onAddData }) => {
  const [newLatitude, setNewLatitude] = useState('');
  const [newLongitude, setNewLongitude] = useState('');
  const { toast } = useToast();

  const validateAndAddData = () => {
    const lat = parseFloat(newLatitude);
    const lng = parseFloat(newLongitude);

    if (isNaN(lat) || isNaN(lng)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numeric coordinates.",
        variant: "destructive"
      });
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast({
        title: "Invalid Range",
        description: "Latitude must be -90 to 90, longitude must be -180 to 180.",
        variant: "destructive"
      });
      return;
    }

    onAddData(lat, lng);
    setNewLatitude('');
    setNewLongitude('');
    
    toast({
      title: "Data Added",
      description: "New GPS coordinates have been added to the history.",
    });
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all GPS data? This action cannot be undone.')) {
      localStorage.removeItem('gpsTrackerData');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">GPS Data History</h2>
        <p className="text-muted-foreground">View, manage, and export your GPS tracking data</p>
      </div>

      {/* Add New Data Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Manual GPS Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="newLatitude">Latitude</Label>
              <Input
                id="newLatitude"
                type="number"
                step="any"
                value={newLatitude}
                onChange={(e) => setNewLatitude(e.target.value)}
                placeholder="16.313557"
              />
            </div>
            <div>
              <Label htmlFor="newLongitude">Longitude</Label>
              <Input
                id="newLongitude"
                type="number"
                step="any"
                value={newLongitude}
                onChange={(e) => setNewLongitude(e.target.value)}
                placeholder="80.453133"
              />
            </div>
            <Button onClick={validateAndAddData} className="w-full">
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Summary & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{gpsData.length}</div>
            <p className="text-muted-foreground">Total Entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">
              {gpsData.length > 0 ? new Date(gpsData[0].timestamp).toLocaleDateString() : 'N/A'}
            </div>
            <p className="text-muted-foreground">Latest Entry</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Button onClick={onExport} variant="outline" className="flex-1" disabled={gpsData.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={clearAllData} variant="destructive" disabled={gpsData.length === 0}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>GPS Tracking History</CardTitle>
        </CardHeader>
        <CardContent>
          {gpsData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No GPS data available.</p>
              <p className="text-sm mt-2">Add some coordinates using the form above or the Live Map tab.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {gpsData.map((data) => (
                    <tr key={data.id}>
                      <td>{new Date(data.timestamp).toLocaleString()}</td>
                      <td>{data.latitude.toFixed(6)}</td>
                      <td>{data.longitude.toFixed(6)}</td>
                      <td>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          Manual Entry
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Statistics */}
      {gpsData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Location Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {Math.max(...gpsData.map(d => d.latitude)).toFixed(4)}°
                </div>
                <p className="text-sm text-muted-foreground">Max Latitude</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {Math.min(...gpsData.map(d => d.latitude)).toFixed(4)}°
                </div>
                <p className="text-sm text-muted-foreground">Min Latitude</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {Math.max(...gpsData.map(d => d.longitude)).toFixed(4)}°
                </div>
                <p className="text-sm text-muted-foreground">Max Longitude</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {Math.min(...gpsData.map(d => d.longitude)).toFixed(4)}°
                </div>
                <p className="text-sm text-muted-foreground">Min Longitude</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataTab;