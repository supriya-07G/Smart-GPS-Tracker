import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, MapPin, Zap, Shield, Users, BookOpen } from 'lucide-react';

const AboutTab: React.FC = () => {
  const teamMembers = [
    { id: "24BCE8137", name: "Supriya Gali" },
    { id: "24BCE7597", name: "Charu Shieja Maurya" },
    { id: "24BCE7560", name: "Vaishnavi Priyamvada Ravi" },
    { id: "24BCE8212", name: "Harini Siddabathuni" },
    { id: "24BCE7048", name: "Lavu Asritha" },
    { id: "24BCE7499", name: "Druthi Potharlanka" }
  ];

  const features = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Wireless Communication",
      description: "LoRa R-2a module enables communication up to 1-5 metres with minimal power consumption."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Precise GPS Tracking",
      description: "NEO-6M GPS module provides accurate location data with 2.5m precision for reliable tracking."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Low Power Design",
      description: "Optimized power consumption allows for extended battery life, perfect for remote monitoring applications."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Reliable Wireless",
      description: "LoRa modulation ensures robust communication even in challenging RF environments."
    }
  ];

  const specifications = [
    { category: "Communication", items: ["LoRa R-2a 433MHz", "Range: 1-5m", "Modulation: LoRa/FSK"] },
    { category: "GPS Accuracy", items: ["2.5m CEP", "50 channels", "Cold start: 27s"] },
    { category: "Power Supply", items: ["3.7V Li-ion", "10,000mAh capacity", "54+ hours operation"] },
    { category: "Interface", items: ["WiFi web dashboard", "Real-time updates", "CSV data export"] }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Smart GPS Tracker Using LoRa</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A cutting-edge wireless GPS tracking system that combines the power of LoRa long-range communication 
          with precise GPS positioning for reliable asset tracking and monitoring applications.
        </p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Our Smart GPS Tracker leverages LoRa (Long Range) technology to create a robust, 
              long-distance wireless communication system for GPS tracking applications. The system 
              consists of a battery-powered transmitter unit that collects GPS coordinates and 
              transmits them via LoRa to a receiver unit connected to the internet.
            </p>
            <p className="text-muted-foreground">
              This solution is ideal for tracking vehicles, assets, livestock, or any objects that 
              need monitoring over large areas where traditional cellular coverage might be limited 
              or expensive. The low power consumption and long-range capabilities make it perfect 
              for remote monitoring applications.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="component-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specifications.map((spec, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-3 text-primary">{spec.category}</h4>
                <ul className="space-y-1">
                  {spec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How LoRa Works */}
      <Card>
        <CardHeader>
          <CardTitle>How LoRa Technology Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>LoRa (Long Range)</strong> is a low-power wide-area network (LPWAN) wireless protocol 
              designed for the Internet of Things (IoT) applications. It operates in unlicensed radio 
              frequency bands and uses a chirp spread spectrum modulation technique.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">1-5m</div>
                <p className="text-sm text-muted-foreground">Communication Range</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">433 MHz</div>
                <p className="text-sm text-muted-foreground">Operating Frequency</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">22 dBm</div>
                <p className="text-sm text-muted-foreground">Transmission Power</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Key Advantages:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Ultra-low power consumption for battery-powered devices</li>
                <li>Short-range communication capabilities (1-5 metres)</li>
                <li>Excellent penetration through buildings and obstacles</li>
                <li>No subscription fees - operates in unlicensed spectrum</li>
                <li>Robust against interference and jamming</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Development Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.id}</div>
                </div>
                <Badge variant="outline">Developer</Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground text-center">
              This project was developed as part of an IoT and embedded systems course, 
              demonstrating practical applications of wireless communication technologies 
              and GPS tracking systems.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Applications & Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Commercial Applications</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Fleet management and vehicle tracking</li>
                <li>• Asset tracking for construction equipment</li>
                <li>• Cargo and shipment monitoring</li>
                <li>• Agricultural equipment tracking</li>
                <li>• Wildlife and livestock monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Personal Applications</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Personal safety and emergency tracking</li>
                <li>• Pet tracking and monitoring</li>
                <li>• Outdoor recreation and hiking safety</li>
                <li>• Valuable item security tracking</li>
                <li>• Elderly or child safety monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutTab;