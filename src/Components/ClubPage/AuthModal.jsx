import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    parentName: '',
    phone: '',
    password: ''
  });

  if (!isOpen) return null;

  const isJoin = type === 'join';
  const title = isJoin ? "Join the Superstar Club" : "Welcome Back, Superstar!";
  const subTitle = isJoin ? "Start your journey today!" : "Login to access your dashboard";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mock Submission: ${type} \n ${JSON.stringify(formData, null, 2)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop with Blur */}
        <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
            onClick={onClose}
        ></div>

        {/* Modal Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xs 2xl:max-w-md overflow-hidden animate-fade-in-up max-h-[95vh] overflow-y-auto custom-scrollbar">
            
            {/* Header */}
            <div className="bg-kelloggs-red px-4 py-3 2xl:p-6 text-white text-center relative sticky top-0 z-10">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 2xl:top-4 2xl:right-4 text-white/80 hover:text-white transition-colors"
                >
                    <CloseIcon />
                </button>
                <h2 className="font-kelloggs text-lg 2xl:text-3xl mb-0.5">{title}</h2>
                <p className="text-red-100 text-[10px] 2xl:text-sm">{subTitle}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-4 py-3 2xl:p-8 flex flex-col gap-2 2xl:gap-4">
                
                {isJoin ? (
                    <>
                        <div>
                            <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Parent/Guardian Full Name</label>
                            <input 
                                type="text" 
                                name="parentName"
                                className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                placeholder="Enter parent/guardian name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                         <div>
                            <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Parent/Guardian Email</label>
                            <input 
                                type="email" 
                                name="parentEmail"
                                className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                placeholder="parent@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Child's Name</label>
                            <input 
                                type="text" 
                                name="childName"
                                className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                placeholder="Enter child's name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Date of Birth</label>
                                <input 
                                    type="date" 
                                    name="dob"
                                    className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">State</label>
                                <select 
                                    name="state"
                                    className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none bg-white"
                                    onChange={handleChange}
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Select State</option>
                                    {[
                                        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
                                        "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", 
                                        "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
                                        "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
                                    ].map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                         <div>
                            <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">School</label>
                            <input 
                                type="text" 
                                name="school"
                                className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                placeholder="Enter school name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                            placeholder="john@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {!isJoin && (
                     <div>
                        <label className="block text-gray-700 text-xs 2xl:text-sm font-bold mb-0.5 2xl:mb-2">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="w-full px-4 py-1.5 2xl:py-3 text-sm 2xl:text-base rounded-lg border border-gray-300 focus:border-kelloggs-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-kelloggs-red text-white font-bold py-2 2xl:py-4 rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-[1.02] transition-all mt-2 text-sm 2xl:text-base"
                >
                    {isJoin ? 'Join Now' : 'Log In'}
                </button>

            </form>
        </div>
    </div>
  );
};

export default AuthModal;
