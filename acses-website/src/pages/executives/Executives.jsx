import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import executives from "./executiveList";

const Executives = () => {
  const Card = ({ children, className }) => (
    <div
      className={`rounded-lg shadow-md overflow-hidden bg-white ${className}`}
    >
      {children}
    </div>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#f3f4f6] py-28">
        <div className="container px-4 py-16 mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
              <span className="text-primary">ACSES</span> Executives
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team leading the Association of Computer
              Science and Engineering Students
            </p>
          </div>

          {/* Executives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {executives.map((executive, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:hover:shadow-primary/20"
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    {/* Profile Image */}
                    <img
                      src={executive.image}
                      alt={executive.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm">
                        {executive.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <executive.icon className="h-5 w-5 text-primary text-acses-green-500" />
                      <h3 className="font-semibold text-lg text-acses-green-500">
                        {executive.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">{executive.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Executives;
