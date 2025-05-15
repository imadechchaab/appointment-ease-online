import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast()
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    // Here you would typically send the appointment data to your backend
    console.log('Appointment Data:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patientInfo: patientInfo,
    });

    toast({
      title: "Appointment Booked",
      description: "Your appointment has been successfully booked!",
    })

    // Reset the state
    setCurrentStep(1);
    setSelectedDoctor('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setPatientInfo({
      name: '',
      email: '',
      phone: '',
    });

    navigate('/patient');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Book an Appointment</h1>
        <p className="text-gray-500">Step {currentStep} of 4</p>
      </div>
      
      <Card className="mt-8">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div>
              <CardHeader>
                <CardTitle>Select Doctor</CardTitle>
              </CardHeader>
              <div className="mt-4 space-y-4">
                <label className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="doctor"
                    value="dr-smith"
                    checked={selectedDoctor === 'dr-smith'}
                    onChange={() => handleDoctorSelect('dr-smith')}
                  />
                  <span>Dr. Smith</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="doctor"
                    value="dr-jones"
                    checked={selectedDoctor === 'dr-jones'}
                    onChange={() => handleDoctorSelect('dr-jones')}
                  />
                  <span>Dr. Jones</span>
                </label>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <CardHeader>
                <CardTitle>Select Date and Time</CardTitle>
              </CardHeader>
              <div className="mt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center" side="bottom">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="mt-4">
                  <Label htmlFor="time">Select Time</Label>
                  <Select value={selectedTime} onValueChange={handleTimeSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={patientInfo.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={patientInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={patientInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div>
              <CardHeader>
                <CardTitle>Confirmation</CardTitle>
              </CardHeader>
              <div className="mt-4 space-y-2">
                <p>Doctor: {selectedDoctor}</p>
                <p>Date: {selectedDate ? format(selectedDate, 'PPP') : 'Not Selected'}</p>
                <p>Time: {selectedTime}</p>
                <p>Name: {patientInfo.name}</p>
                <p>Email: {patientInfo.email}</p>
                <p>Phone: {patientInfo.phone}</p>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !selectedDoctor) || 
                  (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 3 && (!patientInfo.name || !patientInfo.email || !patientInfo.phone))
                }
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleConfirm}
                className="bg-medical-blue hover:bg-medical-darkblue"
              >
                Confirm Appointment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointment;
