import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, FileText, Clock, Award,
// This icon was used for a removed element, but import might be kept by linter
Phone,
// This icon was used for a removed element
CheckCircle, ArrowRight,
// This icon usage is being removed from specialties
Users,
// This icon was used for a removed element
Activity // Using Activity for the logo now
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
  const {
    user,
    isAuthenticated
  } = useAuth();
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
  return <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-medical-blue text-white p-2 rounded-md">
              <Activity size={20} /> {/* Changed from Calendar to Activity */}
            </div>
            <span className="text-xl font-bold ml-2 text-gray-800">OnlineDoc</span> {/* Changed from MediBook */}
          </Link>
          
          <nav>
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-800 hover:text-medical-blue">Home</Link></li>
              <li><Link to="/find-doctor" className="text-gray-800 hover:text-medical-blue">Find Doctors</Link></li>
              <li><a href="#how-it-works" className="text-gray-800 hover:text-medical-blue">How It Works</a></li>
            </ul>
          </nav>
          
          <div className="flex space-x-4">
            {isAuthenticated ? <Button className="bg-medical-blue hover:bg-medical-darkblue" onClick={() => navigate(`/${user?.role}`)}>
                Dashboard
              </Button> : <>
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button className="bg-medical-blue hover:bg-medical-darkblue" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-medical-lightblue/10 to-medical-blue/10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Trusted Doctors<br /> {/* Changed Tagline */}
              <span className="text-medical-blue">Anytime, Anywhere</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Find specialists in your area and book your free appointment online. {/* Changed Description */}
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
          
          <div className="relative"> {/* Removed pop-up elements around the image */}
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
            {specialties.map(specialty => <Card key={specialty.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-start"> {/* Changed justify-between to justify-start */}
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{specialty.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{specialty.name}</h3>
                      {/* <p className="text-sm text-gray-500">{specialty.doctors} Specialists</p> Removed doctors count */}
                    </div>
                  </div>
                  {/* Removed ArrowRight button */}
                </CardContent>
              </Card>)}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600">and more...</p> {/* Changed from Button to plain text */}
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
          
          <div className="grid md:grid-cols-3 gap-8"> {/* Changed from md:grid-cols-4 to md:grid-cols-3 */}
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
            
            {/* Removed Medical Records step */}
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
              {testimonials.map((testimonial, idx) => <div key={testimonial.id} className={`absolute w-full transition-all duration-500 transform ${idx === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}>
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
                        {[1, 2, 3, 4, 5].map(star => <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`w-3 h-3 rounded-full transition-colors ${idx === activeTestimonial ? "bg-medical-blue" : "bg-gray-300"}`}></button>)}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section Removed */}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl mb-6 max-w-3xl mx-auto"></p>
          <div className="">
            <Button className="bg-white text-medical-blue hover:bg-gray-100 px-6 py-3 text-md" onClick={handleGetStarted}></Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6 py-3 text-md"
          // onClick={() => { /* Define contact action or link */ }}
          ></Button>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="mb-4">&copy; {new Date().getFullYear()} OnlineDoc. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact-us" className="hover:text-white transition-colors text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Home;