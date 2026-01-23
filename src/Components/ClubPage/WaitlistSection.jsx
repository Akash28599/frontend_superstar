import { useState } from 'react';
import { Send } from 'lucide-react';

const WaitlistSection = ({ data }) => {
  const [formData, setFormData] = useState({});

  if (!data) return null;
  const { title, description, label_texts, button_data } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Waitlist Form Submitted: ", formData);
    alert("Thanks for joining the waitlist!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center flex flex-col items-center">

        <div className="mb-10 text-center w-full">
          <h2 className="font-kelloggs text-2xl sm:text-3xl font-bold text-kelloggs-red mb-4 uppercase tracking-wide">
            {title.toUpperCase()}
          </h2>
          <p className="text-gray-600 text-lg">
            {description}
          </p>
        </div>

        {/* Form Container with Border */}
        <form onSubmit={handleSubmit} className="bg-white border-4 border-kelloggs-red p-8 sm:p-12 text-left w-full shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
            {label_texts?.map((label, index) => {
              const isFullWidth = label.toLowerCase().includes('email') || label.toLowerCase().includes('name') || label.toLowerCase().includes('school');
              const labelLower = label.toLowerCase();
              const isAge = labelLower.includes('age');

              const displayLabel = isAge ? "Date of Birth" : label;
              const inputType = labelLower.includes('email') ? 'email' :
                isAge ? 'date' : 'text';

              return (
                <div key={index} className={`flex flex-col ${isFullWidth ? 'md:col-span-2' : ''}`}>
                  <label className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">
                    {displayLabel} *
                  </label>
                  {labelLower.includes('state') ? (
                    <select
                      name={displayLabel}
                      required
                      defaultValue=""
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-kelloggs-red/20 focus:border-kelloggs-red transition-all font-sans appearance-none"
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
                  ) : (
                    <input
                      type={inputType}
                      name={displayLabel} // Ensure name matches the displayed label for clarity in form data
                      required
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-kelloggs-red/20 focus:border-kelloggs-red transition-all font-sans"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-kelloggs-red text-white font-bold text-lg py-4 px-8 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-wider rounded-lg shadow-lg"
            >
              <span>{button_data?.button_text || "JOIN NOW"}</span>
              <Send fontSize="small" className="-rotate-45 mb-1" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WaitlistSection;
