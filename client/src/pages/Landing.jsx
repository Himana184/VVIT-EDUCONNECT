import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";


const Landing = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<FAQ />
			<Footer />
		</>
	);
};

export default Landing;