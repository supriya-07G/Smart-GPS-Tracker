import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HardwareTab: React.FC = () => {
  const transmitterComponents = [
    {
      name: "Arduino Nano",
      model: "ATmega328P",
      specs: ["16MHz Clock Speed", "5V/3.3V Operation", "14 Digital I/O Pins", "8 Analog Inputs"],
      description: "Main microcontroller for GPS data processing and LoRa transmission",
      image: "/assets/images/arduino-nano.jpg"
    },
    {
      name: "LoRa RA-02 Module",
      model: "SX1278",
      specs: ["433MHz Frequency", "22dBm Max Power", "1-5m Range", "LoRa Modulation"],
      description: "Long-range wireless communication module",
      image: "/assets/images/lora-module.jpg"
    },
    {
      name: "NEO-6M GPS Module",
      model: "U-Blox",
      specs: ["50 Channels", "2.5m Accuracy", "UART Interface", "3.3V Operation"],
      description: "High-precision GPS receiver for location tracking",
      image: "/assets/images/gps-module.jpg"
    }
  ];

  const receiverComponents = [
    {
      name: "NodeMCU ESP32",
      model: "ESP32-WROOM-32",
      specs: ["WiFi + Bluetooth", "Dual Core 240MHz", "GPIO Pins", "Built-in Antenna"],
      description: "WiFi-enabled microcontroller for data reception and web interface",
      image: "/assets/images/esp32.jpg"
    },
    {
      name: "LoRa RA-02 Module",
      model: "SX1278",
      specs: ["433MHz Frequency", "Receiver Mode", "1-5m Range", "Low Power"],
      description: "LoRa receiver module for GPS data reception",
      image: "/assets/images/lora-module.jpg"
    }
  ];

  const transmitterPinConnections = [
    { component: "Arduino Nano", pin: "D2", connects: "LoRa NSS" },
    { component: "Arduino Nano", pin: "D9", connects: "LoRa RST" },
    { component: "Arduino Nano", pin: "D10", connects: "LoRa DIO0" },
    { component: "Arduino Nano", pin: "D11", connects: "LoRa MOSI" },
    { component: "Arduino Nano", pin: "D12", connects: "LoRa MISO" },
    { component: "Arduino Nano", pin: "D13", connects: "LoRa SCK" },
    { component: "Arduino Nano", pin: "D4", connects: "GPS RX" },
    { component: "Arduino Nano", pin: "D3", connects: "GPS TX" },
  ];

  const receiverPinConnections = [
    { component: "ESP32", pin: "GPIO5", connects: "LoRa NSS" },
    { component: "ESP32", pin: "GPIO14", connects: "LoRa RST" },
    { component: "ESP32", pin: "GPIO2", connects: "LoRa DIO0" },
    { component: "ESP32", pin: "GPIO23", connects: "LoRa MOSI" },
    { component: "ESP32", pin: "GPIO19", connects: "LoRa MISO" },
    { component: "ESP32", pin: "GPIO18", connects: "LoRa SCK" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Hardware Components</h2>
        <p className="text-muted-foreground">Complete component specifications and wiring diagrams</p>
      </div>

      {/* Transmitter Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary">📡 Transmitter Unit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {transmitterComponents.map((component, index) => (
            <Card key={index} className="component-card">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <Badge variant="outline">{component.model}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                <h4 className="font-medium mb-2">Specifications:</h4>
                <ul className="text-sm space-y-1">
                  {component.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-muted-foreground">• {spec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transmitter Wiring */}
        <Card>
          <CardHeader>
            <CardTitle>Transmitter Wiring Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                <h4 className="font-semibold mb-3">Pin Connections</h4>
                <div className="space-y-2">
                  {transmitterPinConnections.map((connection, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted rounded text-sm">
                      <span className="font-medium">{connection.component} {connection.pin}</span>
                      <span>→</span>
                      <span>{connection.connects}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receiver Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary">📶 Receiver Unit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {receiverComponents.map((component, index) => (
            <Card key={index} className="component-card">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <Badge variant="outline">{component.model}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                <h4 className="font-medium mb-2">Specifications:</h4>
                <ul className="text-sm space-y-1">
                  {component.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-muted-foreground">• {spec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Receiver Wiring */}
        <Card>
          <CardHeader>
            <CardTitle>Receiver Wiring Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                <h4 className="font-semibold mb-3">Pin Connections</h4>
                <div className="space-y-2">
                  {receiverPinConnections.map((connection, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted rounded text-sm">
                      <span className="font-medium">{connection.component} {connection.pin}</span>
                      <span>→</span>
                      <span>{connection.connects}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Power Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Power Requirements & Battery Life</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Transmitter Power</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Arduino Nano:</strong> 20mA @ 5V</li>
                <li>• <strong>LoRa Module:</strong> 120mA @ 3.3V (TX)</li>
                <li>• <strong>GPS Module:</strong> 45mA @ 3.3V</li>
                <li>• <strong>Total:</strong> ~185mA average</li>
                <li>• <strong>Battery Life:</strong> 54+ hours (10,000mAh)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Receiver Power</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>ESP32:</strong> 160mA @ 3.3V (WiFi active)</li>
                <li>• <strong>LoRa Module:</strong> 12mA @ 3.3V (RX)</li>
                <li>• <strong>Total:</strong> ~172mA average</li>
                <li>• <strong>Power Source:</strong> USB 5V supply</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HardwareTab;