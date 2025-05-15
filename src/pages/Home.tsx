
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Search, FileText, Clock, Award,
  CheckCircle, ArrowRight,
  Activity
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data for specialties
const specialties = [{
  id: 1,
  name: "Cardiology",
  icon: "❤️"
}, {
  id: 2,
  name: "Neurology",
  icon: "🧠"
}, {
  id: 3,
  name: "Pediatrics",
  icon: "👶"
}, {
  id: 4,
  name: "Dermatology",
  icon: "🧬"
}, {
  id: 5,
  name: "Orthopedics",
  icon: "🦴"
}, {
  id: 6,
  name: "Psychiatry",
  icon: "🧘"
}];

// Mock data for testimonials
const testimonials = [{
  id: 1,
  text: "OnlineDoc made it so easy to find a specialist and book an appointment. Saved me hours of phone calls!",
  author: "Sarah Johnson",
  role: "Patient",
  avatar: "https://randomuser.me/api/portraits/women/12.jpg"
}, {
  id: 2,
  text: "As a doctor, this platform helps me manage my practice more efficiently. The scheduling system is flawless.",
  author: "Dr. Michael Chen",
  role: "Cardiologist",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
}, {
  id: 3,
  text: "I love how I can access all my medical records and appointment history in one place. Highly recommend!",
  author: "James Wilson",
  role: "Patient",
  avatar: "https://randomuser.me/api/portraits/men/67.jpg"
}];

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Redirect based on role if logged in
  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-medical-blue text-white p-2 rounded-md">
              <Activity size={20} />
            </div>
            <span className="text-xl font-bold ml-2 text-gray-800">OnlineDoc</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-800 hover:text-medical-blue">Home</Link></li>
              <li><Link to="/find-doctor" className="text-gray-800 hover:text-medical-blue">Find Doctors</Link></li>
              <li><a href="#how-it-works" className="text-gray-800 hover:text-medical-blue">How It Works</a></li>
            </ul>
          </nav>
          
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <Button className="bg-medical-blue hover:bg-medical-darkblue" onClick={() => navigate(`/${user?.role}`)}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white" 
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  className="bg-medical-blue hover:bg-medical-darkblue" 
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-medical-lightblue/10 to-medical-blue/10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Trusted Doctors<br />
              <span className="text-medical-blue">Anytime, Anywhere</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Find specialists in your area and book your free appointment online.
            </p>
            <div className="mt-8 space-x-4">
              <Button className="bg-medical-blue hover:bg-medical-darkblue px-8 py-6 text-lg" onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white px-8 py-6 text-lg" onClick={() => navigate('/find-doctor')}>
                Find Doctors
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex items-center">
                <CheckCircle className="text-medical-green mr-2" size={20} />
                <span className="text-gray-700">Verified Doctors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-medical-green mr-2" size={20} />
                <span className="text-gray-700">Secure & Private</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-medical-green mr-2" size={20} />
                <span className="text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-medical-blue/5 rounded-3xl p-8 relative z-10">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor with patient" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialties Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Medical Specialties</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Find the right specialist for your needs from our extensive network of certified healthcare professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {specialties.map(specialty => (
              <Card key={specialty.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-start">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{specialty.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{specialty.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600">and more...</p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Booking an appointment with OnlineDoc is easy and convenient. Follow these simple steps to get started.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-medical-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Search className="text-medical-blue" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Find a Doctor</h3>
              <p className="text-gray-600">
                Search for specialists by medical field, location, or availability.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-medical-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-medical-blue" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Book Appointment</h3>
              <p className="text-gray-600">
                Select a convenient time slot that works for your schedule.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-medical-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Clock className="text-medical-blue" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Get Confirmation</h3>
              <p className="text-gray-600">
                Receive instant confirmation and reminders for your appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover how OnlineDoc is changing the healthcare experience for patients and doctors.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative h-80">
              {testimonials.map((testimonial, idx) => (
                <div key={testimonial.id} className={`absolute w-full transition-all duration-500 transform ${idx === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}>
                  <Card className="p-8 shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-6">
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-14 h-14 rounded-full object-cover" />
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-lg italic">"{testimonial.text}"</p>
                      
                      <div className="flex mt-6">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`w-3 h-3 rounded-full transition-colors ${idx === activeTestimonial ? "bg-medical-blue" : "bg-gray-300"}`}></button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
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
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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
    </div>
  );
};

export default Home;
