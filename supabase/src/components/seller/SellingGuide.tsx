import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingCart, Camera, FileText, MapPin, Star } from "lucide-react";

const SellingGuide = () => {
  const steps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Set Up Your Store",
      description: "Complete your seller profile with Ghana Card verification and store details.",
      tips: ["Use your real name and accurate information", "Upload clear Ghana Card image", "Write compelling store description"]
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Take Great Photos",
      description: "High-quality images are crucial for attracting buyers.",
      tips: ["Use natural lighting", "Show multiple angles", "Keep background clean", "Max file size: 5MB"]
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Create Your Listing",
      description: "Write detailed product descriptions with accurate pricing.",
      tips: ["Be honest about condition", "Include all relevant details", "Price competitively", "Use correct category"]
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Set Location & Delivery",
      description: "Specify your location for local buyers and delivery options.",
      tips: ["Select accurate city", "Consider delivery costs", "Offer meetup options", "Be responsive to messages"]
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Maintain Good Reputation",
      description: "Provide excellent customer service to build trust and get positive reviews.",
      tips: ["Respond quickly to inquiries", "Ship items promptly", "Pack items securely", "Follow up with buyers"]
    }
  ];

  const businessServices = [
    {
      category: "Digital Services",
      services: ["Web Design", "Graphic Design", "Social Media Management", "Content Writing", "SEO Services"]
    },
    {
      category: "Professional Services",
      services: ["Tutoring", "Consulting", "Photography", "Event Planning", "Legal Services"]
    },
    {
      category: "Home Services",
      services: ["Cleaning", "Repairs", "Interior Design", "Catering", "Landscaping"]
    },
    {
      category: "Business Solutions",
      services: ["Accounting", "Marketing", "IT Support", "Translation", "Training"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">How to Sell on GBay</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Follow our step-by-step guide to start selling products and services on Ghana's premier marketplace
        </p>
      </div>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  {step.icon}
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Step {index + 1}: {step.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    {step.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {step.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selling Business Services</CardTitle>
          <CardDescription>
            GBay isn't just for physical products - you can also offer professional services to customers across Ghana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {businessServices.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3 text-primary">{category.category}</h3>
                <div className="space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <Badge key={serviceIndex} variant="secondary" className="mr-2 mb-2">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Tips for Service Listings:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Clearly define what's included in your service</li>
              <li>• Set transparent pricing (hourly/project-based)</li>
              <li>• Include portfolio examples or testimonials</li>
              <li>• Specify your availability and turnaround time</li>
              <li>• Offer different service packages (Basic, Standard, Premium)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Start Selling Today!</CardTitle>
          <CardDescription>
            Ready to join thousands of successful sellers on GBay? Set up your store and list your first product or service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">₵0</div>
              <div className="text-sm text-muted-foreground">Listing Fee</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">5%</div>
              <div className="text-sm text-muted-foreground">Commission on Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellingGuide;