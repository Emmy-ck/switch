'use client';

import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Badge, Loading } from '@/components';

export default function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-light p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center fade-in">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Component Library
          </h1>
          <p className="text-lg text-brand-primary">
            Reusable components for your Matatu Finder app
          </p>
        </div>

        {/* Buttons Section */}
        <Card className="slide-in-left">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-brand-dark">Buttons</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button loading={loading} onClick={handleButtonClick}>
                {loading ? 'Loading...' : 'Click Me'}
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardBody>
        </Card>

        {/* Inputs Section */}
        <Card className="slide-in-right">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-brand-dark">Inputs</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Text Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Email Input"
                type="email"
                placeholder="Enter your email..."
              />
              <Input
                label="Password Input"
                type="password"
                placeholder="Enter your password..."
              />
              <Input
                label="Input with Error"
                placeholder="This has an error..."
                error="This field is required"
              />
            </div>
          </CardBody>
        </Card>

        {/* Badges Section */}
        <Card className="slide-in-bottom">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-brand-dark">Badges</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Loading Section */}
        <Card className="scale-in">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-brand-dark">Loading States</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Loading size="lg" variant="spinner" text="Loading..." />
              </div>
              <div className="text-center">
                <Loading size="lg" variant="dots" text="Processing..." />
              </div>
              <div className="text-center">
                <Loading size="lg" variant="pulse" text="Please wait..." />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Usage Examples */}
        <Card className="fade-in delay-300">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-brand-dark">Usage Examples</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="bg-brand-light/50 p-4 rounded-lg">
                <h3 className="font-semibold text-brand-dark mb-2">Form Example</h3>
                <div className="space-y-4">
                  <Input label="Route From" placeholder="Enter starting point" />
                  <Input label="Route To" placeholder="Enter destination" />
                  <Button variant="primary" fullWidth>
                    Find Route
                  </Button>
                </div>
              </div>
              
              <div className="bg-brand-light/50 p-4 rounded-lg">
                <h3 className="font-semibold text-brand-dark mb-2">Status Display</h3>
                <div className="flex items-center gap-4">
                  <Badge variant="success">Available</Badge>
                  <span className="text-brand-dark">Route is currently active</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
