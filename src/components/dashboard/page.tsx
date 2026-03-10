import  Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/WelcomeSection";
function DashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection/>
         Navbar 
       </div>
    </div>
  );
}       

export default DashboardPage;