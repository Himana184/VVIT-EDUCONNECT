/* eslint-disable react/prop-types */
import { DatabaseZap, Filter, Fingerprint, Search } from "lucide-react";
const features = [
  {
    icon: <Fingerprint size={48} color="#007BFF" />,
    title: "Secured Data",
    description:
      "Protect sensitive student and recruiter information with robust data security measures.",
    className: "bg-blue-100",
  },
  {
    icon: <Search size={48} color="#FFA500" />,
    title: "Efficient Search",
    description:
      "Effortlessly find and match job opportunities for students and recruiters through powerful search capabilities.",
    className: "bg-orange-100",
  },
  {
    icon: <DatabaseZap size={48} color="#008000" />,
    title: "Data Insights",
    description:
      "Gain valuable insights into placement trends, success rates, and areas for improvement with data-driven analytics.",
    className: "bg-green-100",
  },
  {
    icon: <Filter size={48} color="#FF0000" />,
    title: "Advanced Filtering",
    description:
      "Customize and refine data views using advanced filtering options, enhancing the user experience.",
    className: "bg-red-100",
  },
];
function FeatureCard({ icon, title, description, className }) {
  return (
    <div>
      <div
        className={`mx-auto max-w-7xl flex h-20 w-20 items-center justify-center rounded-full ${className}`}
      >
        {icon}
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">{title}</h3>
      <p className="mt-4 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Features() {


  return (
    <div id="features" className="py-12 w-full bg-white  px-2 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={feature.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;