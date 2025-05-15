import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Star, MapPin, Stethoscope, Filter, Clock, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data for doctors
const doctorsData = [{
  id: "1",
  name: "Dr. Sarah Johnson",
  specialization: "Cardiology",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  rating: 4.9,
  reviewCount: 120,
  location: "New York Medical Center",
  experience: "10+ years",
  fee: "$150",
  availability: ["Mon", "Wed", "Fri"],
  education: "Harvard Medical School",
  about: "Specialized in treating cardiovascular diseases with a focus on preventive cardiology and heart health."
}, {
  id: "2",
  name: "Dr. James Wilson",
  specialization: "Neurology",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4.7,
  reviewCount: 98,
  location: "Central Hospital",
  experience: "15+ years",
  fee: "$180",
  availability: ["Tue", "Thu", "Sat"],
  education: "Johns Hopkins University",
  about: "Expert in diagnosing and treating complex neurological disorders, with special interest in stroke prevention."
}, {
  id: "3",
  name: "Dr. Emily Chen",
  specialization: "Pediatrics",
  image: "https://randomuser.me/api/portraits/women/30.jpg",
  rating: 4.8,
  reviewCount: 145,
  location: "Children's Hospital",
  experience: "8+ years",
  fee: "$120",
  availability: ["Mon", "Tue", "Thu", "Fri"],
  education: "Stanford University",
  about: "Compassionate pediatrician dedicated to child wellness and development, with expertise in childhood allergies."
}, {
  id: "4",
  name: "Dr. Michael Brown",
  specialization: "Dermatology",
  image: "https://randomuser.me/api/portraits/men/92.jpg",
  rating: 4.6,
  reviewCount: 87,
  location: "Skin & Health Clinic",
  experience: "12+ years",
  fee: "$160",
  availability: ["Wed", "Thu", "Sat"],
  education: "Yale School of Medicine",
  about: "Specializes in skin health, cosmetic dermatology, and treating various skin conditions and disorders."
}, {
  id: "5",
  name: "Dr. Linda Martinez",
  specialization: "Orthopedics",
  image: "https://randomuser.me/api/portraits/women/62.jpg",
  rating: 4.9,
  reviewCount: 110,
  location: "Orthopedic Institute",
  experience: "14+ years",
  fee: "$170",
  availability: ["Mon", "Thu", "Fri"],
  education: "UCLA Medical School",
  about: "Expert in sports injuries, joint replacements, and rehabilitation, helping patients regain mobility."
}, {
  id: "6",
  name: "Dr. Robert Taylor",
  specialization: "Psychiatry",
  image: "https://randomuser.me/api/portraits/men/46.jpg",
  rating: 4.8,
  reviewCount: 92,
  location: "Mental Health Center",
  experience: "9+ years",
  fee: "$140",
  availability: ["Tue", "Wed", "Fri"],
  education: "Columbia University",
  about: "Specializes in anxiety disorders, depression, and cognitive behavioral therapy, with a personalized approach."
}];

// Mock data for specialties
const specializations = [{
  id: "1",
  name: "Cardiology"
}, {
  id: "2",
  name: "Neurology"
}, {
  id: "3",
  name: "Pediatrics"
}, {
  id: "4",
  name: "Dermatology"
}, {
  id: "5",
  name: "Orthopedics"
}, {
  id: "6",
  name: "Psychiatry"
}, {
  id: "7",
  name: "Gynecology"
}, {
  id: "8",
  name: "Ophthalmology"
}];
const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const {
    isAuthenticated,
    user
  } = useAuth();
  const navigate = useNavigate();

  // Handle search and filtering
  const handleSearch = () => {
    let filtered = doctorsData;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doctor => doctor.name.toLowerCase().includes(query) || doctor.specialization.toLowerCase().includes(query) || doctor.location.toLowerCase().includes(query));
    }

    // Filter by specialization
    if (selectedSpecialization) {
      filtered = filtered.filter(doctor => doctor.specialization === specializations.find(s => s.id === selectedSpecialization)?.name);
    }
    setFilteredDoctors(filtered);
  };

  // Handle booking
  const handleBookAppointment = (doctorId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === 'patient') {
      navigate(`/patient/book-appointment/${doctorId}`);
    } else {
      // Doctor or admin users cannot book appointments
      alert('Please log in as a patient to book appointments');
    }
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow">
        {/* Navigation header */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-medical-blue text-white p-2 rounded-md">
              <Calendar size={20} />
            </div>
            <span className="text-xl font-bold ml-2 text-gray-800">OnlineDoc</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-800 hover:text-medical-blue">Home</Link></li>
              <li><Link to="/find-doctor" className="text-medical-blue font-medium">Find Doctors</Link></li>
            </ul>
          </nav>
          
          <div className="flex space-x-4">
            {isAuthenticated ? <Button className="bg-medical-blue hover:bg-medical-darkblue" onClick={() => navigate(`/${user?.role}`)}>
                Dashboard
              </Button> : <>
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button className="bg-medical-blue hover:bg-medical-darkblue hidden md:flex" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>}
          </div>
        </div>
      </header>
      
      {/* Search Section */}
      <section className="bg-medical-blue py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find the Right Doctor For Your Health
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Search from our network of qualified healthcare professionals and book an appointment in just a few clicks.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input placeholder="Search doctors, specializations..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              
              <div className="flex-1">
                <select className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-medical-blue focus:border-medical-blue" value={selectedSpecialization || ''} onChange={e => setSelectedSpecialization(e.target.value || null)}>
                  <option value="">All Specializations</option>
                  {specializations.map(spec => <option key={spec.id} value={spec.id}>{spec.name}</option>)}
                </select>
              </div>
              
              <Button className="bg-medical-blue hover:bg-medical-darkblue md:w-auto" onClick={handleSearch}>
                <Search size={20} className="mr-2" /> Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Doctors Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Available Doctors</h2>
              <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
            </div>
            
            <div className="hidden md:block">
              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" /> Filters
              </Button>
            </div>
          </div>
          
          {/* Doctor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="relative">
                        <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
                        <div className="absolute -bottom-1 -right-1 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Available
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                        
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Stethoscope size={14} className="text-medical-blue" />
                          <span className="ml-1">{doctor.specialization}</span>
                          
                          <span className="mx-2 text-gray-300">|</span>
                          
                          <span>{doctor.experience}</span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="ml-1 text-xs text-gray-500">({doctor.reviewCount} reviews)</span>
                        </div>
                        
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="ml-1 truncate">{doctor.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600 line-clamp-2">
                      {doctor.about}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">Consultation Fee</span>
                        <p className="font-semibold text-medical-blue">{doctor.fee}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-1" />
                          Available on
                        </div>
                        <div className="flex space-x-1 mt-1">
                          {doctor.availability.map((day, idx) => <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {day}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border-t">
                    <Button variant="ghost" className="flex-1 rounded-none py-4 text-gray-700 hover:text-medical-blue border-r" onClick={() => navigate(`/doctor/${doctor.id}`)}>
                      View Profile
                    </Button>
                    <Button className="flex-1 rounded-none py-4 text-white bg-medical-blue hover:bg-medical-darkblue" onClick={() => handleBookAppointment(doctor.id)}>
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          
          {/* No Results */}
          {filteredDoctors.length === 0 && <div className="text-center py-10">
              <img src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png" alt="No results" className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-gray-800">No doctors found</h3>
              <p className="text-gray-600 mt-1">Try adjusting your search or filter criteria</p>
              <Button className="mt-4 bg-medical-blue hover:bg-medical-darkblue" onClick={() => {
            setSearchQuery('');
            setSelectedSpecialization(null);
            setFilteredDoctors(doctorsData);
          }}>
                Clear Filters
              </Button>
            </div>}
        </div>
      </section>
      
      {/* Footer - Updated to match Home page */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <div className="bg-white p-2 rounded-md">
                  <Activity size={20} className="text-medical-blue" />
                </div>
                <span className="text-xl font-bold ml-2 text-white">OnlineDoc</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Find specialists in your area and book your free appointment online. Trusted doctors, anytime, anywhere.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/3 md:px-8 mb-8 md:mb-0">
              <h3 className="font-semibold text-white text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/find-doctor" className="text-gray-400 hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>

            <div className="w-full md:w-1/3">
              <h3 className="font-semibold text-white text-lg mb-6">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p className="mb-3">1234 Healthcare Ave.</p>
                <p className="mb-3">San Francisco, CA 94102</p>
                <p className="mb-3">Email: support@onlinedoc.com</p>
                <p>Phone: (800) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8">
            <p className="mb-4">&copy; {new Date().getFullYear()} OnlineDoc. All rights reserved.</p>
            <div className="flex flex-wrap justify-center space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact-us" className="hover:text-white transition-colors text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default FindDoctor;
