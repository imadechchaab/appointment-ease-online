
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Mock doctors data
const doctorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviewCount: 120,
    availability: {
      Monday: ["9:00", "10:00", "11:00", "14:00", "15:00"],
      Tuesday: ["10:00", "11:00", "13:00", "14:00"],
      Wednesday: ["9:00", "10:00", "11:00", "14:00", "15:00"],
      Thursday: ["10:00", "11:00", "13:00", "14:00"],
      Friday: ["9:00", "10:00", "11:00", "14:00"]
    }
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialization: "Neurology",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    reviewCount: 98,
    availability: {
      Monday: ["10:00", "13:00", "14:00"],
      Tuesday: ["9:00", "10:00", "11:00", "14:00"],
      Wednesday: ["13:00", "14:00", "15:00"],
      Thursday: ["9:00", "10:00", "11:00", "14:00"],
      Friday: ["10:00", "11:00", "13:00"]
    }
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialization: "Pediatrics",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    rating: 4.8,
    reviewCount: 145,
    availability: {
      Monday: ["9:00", "10:00", "11:00", "13:00"],
      Tuesday: ["14:00", "15:00", "16:00"],
      Wednesday: ["9:00", "10:00", "11:00"],
      Thursday: ["13:00", "14:00", "15:00"],
      Friday: ["9:00", "10:00", "11:00", "14:00", "15:00"]
    }
  }
];

// Mock specializations
const specializations = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Psychiatry",
  "Gynecology",
  "Ophthalmology",
  "Urology",
  "Endocrinology",
  "Oncology",
  "Gastroenterology"
];

// Time slots
const timeSlots = ["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(doctorId || null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter doctors by specialization
  const filteredDoctors = selectedSpec
    ? doctorsData.filter(doctor => doctor.specialization === selectedSpec)
    : doctorsData;
  
  // Get the currently selected doctor object
  const currentDoctor = doctorsData.find(doctor => doctor.id === selectedDoctor);
  
  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate || !currentDoctor) return [];
    
    const dayOfWeek = format(selectedDate, 'EEEE');
    return currentDoctor.availability[dayOfWeek as keyof typeof currentDoctor.availability] || [];
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Information",
        description: "Please select a doctor, date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${currentDoctor?.name} is scheduled for ${format(selectedDate, 'PPPP')} at ${selectedTime}.`,
      variant: "default"
    });
    
    // Redirect to dashboard after booking
    setTimeout(() => {
      navigate('/patient');
    }, 2000);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight size={16} />
        <span className="font-medium text-gray-900">Book Appointment</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
      
      <Tabs defaultValue={selectedDoctor ? "datetime" : "specialization"}>
        <TabsList className="mb-6">
          <TabsTrigger value="specialization">1. Select Specialization</TabsTrigger>
          <TabsTrigger value="doctor">2. Select Doctor</TabsTrigger>
          <TabsTrigger value="datetime">3. Select Date & Time</TabsTrigger>
          <TabsTrigger value="confirm">4. Confirm</TabsTrigger>
        </TabsList>
        
        {/* Step 1: Select Specialization */}
        <TabsContent value="specialization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {specializations.map((spec) => (
              <Card 
                key={spec}
                className={`cursor-pointer transition-colors ${
                  selectedSpec === spec 
                    ? 'border-medical-blue ring-2 ring-medical-blue/20' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedSpec(spec)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-medical-blue/10 text-medical-blue">
                      {spec.charAt(0)}
                    </div>
                    <span className="ml-3 font-medium">{spec}</span>
                  </div>
                  
                  {selectedSpec === spec && (
                    <CheckCircle size={18} className="text-medical-blue" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                if (selectedSpec) {
                  document.querySelector('[data-value="doctor"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                } else {
                  toast({
                    title: "Please Select a Specialization",
                    description: "You need to select a medical specialization to proceed.",
                    variant: "destructive"
                  });
                }
              }}
            >
              Next Step
            </Button>
          </div>
        </TabsContent>
        
        {/* Step 2: Select Doctor */}
        <TabsContent value="doctor" className="space-y-6">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id}
                  className={`cursor-pointer transition-colors ${
                    selectedDoctor === doctor.id 
                      ? 'border-medical-blue ring-2 ring-medical-blue/20' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <CardContent className="p-6 flex items-start">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{doctor.specialization}</p>
                      
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(doctor.rating)
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    {selectedDoctor === doctor.id && (
                      <div className="ml-auto">
                        <CheckCircle size={24} className="text-medical-blue" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-sm text-gray-500">Please select a different specialization.</p>
              <Button 
                className="mt-4"
                onClick={() => {
                  document.querySelector('[data-value="specialization"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Back to Specializations
              </Button>
            </div>
          )}
          
          {filteredDoctors.length > 0 && (
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  document.querySelector('[data-value="specialization"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Previous Step
              </Button>
              <Button 
                onClick={() => {
                  if (selectedDoctor) {
                    document.querySelector('[data-value="datetime"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  } else {
                    toast({
                      title: "Please Select a Doctor",
                      description: "You need to select a doctor to proceed.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                Next Step
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Step 3: Select Date & Time */}
        <TabsContent value="datetime" className="space-y-6">
          {currentDoctor ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Select Date</h3>
                  
                  <div>
                    <div className="mb-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => 
                              date < new Date() || 
                              date > new Date(new Date().setDate(new Date().getDate() + 30)) ||
                              date.getDay() === 0 || date.getDay() === 6 // Disable weekends
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < new Date() || 
                        date > new Date(new Date().setDate(new Date().getDate() + 30)) ||
                        date.getDay() === 0 || date.getDay() === 6 // Disable weekends
                      }
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Select Time</h3>
                  
                  {selectedDate ? (
                    <>
                      <p className="text-sm text-gray-500 mb-4">
                        Available time slots for {format(selectedDate, 'PPPP')}:
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {getAvailableTimeSlots().length > 0 ? (
                          getAvailableTimeSlots().map((time) => (
                            <Button 
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              className={cn(
                                selectedTime === time ? "bg-medical-blue" : "",
                                "flex items-center justify-center"
                              )}
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </Button>
                          ))
                        ) : (
                          <div className="col-span-3 text-center py-4">
                            <p className="text-gray-500">No available slots for this date.</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">Please select a date first.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No doctor selected</h3>
              <p className="mt-1 text-sm text-gray-500">Please go back and select a doctor.</p>
              <Button 
                className="mt-4"
                onClick={() => {
                  document.querySelector('[data-value="doctor"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Back to Doctor Selection
              </Button>
            </div>
          )}
          
          {currentDoctor && (
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  document.querySelector('[data-value="doctor"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Previous Step
              </Button>
              <Button 
                onClick={() => {
                  if (selectedDate && selectedTime) {
                    document.querySelector('[data-value="confirm"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  } else {
                    toast({
                      title: "Incomplete Selection",
                      description: "Please select both a date and time for your appointment.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                Next Step
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Step 4: Confirm */}
        <TabsContent value="confirm" className="space-y-6">
          {currentDoctor && selectedDate && selectedTime ? (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-6">Appointment Summary</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <img 
                      src={currentDoctor.image} 
                      alt={currentDoctor.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">{currentDoctor.name}</h4>
                      <p className="text-sm text-gray-500">{currentDoctor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h5>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                        <span>{format(selectedDate, 'PPPP')}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="mr-2 h-5 w-5 text-gray-400" />
                        <span>{selectedTime}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Appointment Type</h5>
                      <select 
                        className="w-full p-2 border rounded-md"
                        defaultValue="consultation"
                      >
                        <option value="consultation">Consultation</option>
                        <option value="followup">Follow-up</option>
                        <option value="checkup">Regular Checkup</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-1">Reason for Visit (Optional)</h5>
                    <textarea 
                      className="w-full p-3 border rounded-md h-20"
                      placeholder="Briefly describe your symptoms or reason for the appointment..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-blue-800">Important Information</h5>
                        <div className="mt-1 text-sm text-blue-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Please arrive 15 minutes before your appointment time.</li>
                            <li>Bring your insurance card and ID.</li>
                            <li>You can cancel or reschedule up to 24 hours before the appointment.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Incomplete Information</h3>
              <p className="mt-1 text-sm text-gray-500">Please complete all previous steps before confirmation.</p>
              <Button 
                className="mt-4"
                onClick={() => {
                  document.querySelector('[data-value="datetime"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Back to Date & Time Selection
              </Button>
            </div>
          )}
          
          {currentDoctor && selectedDate && selectedTime && (
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  document.querySelector('[data-value="datetime"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}
              >
                Previous Step
              </Button>
              <Button 
                onClick={handleConfirmBooking}
                className="bg-medical-blue hover:bg-medical-darkblue"
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookAppointment;
