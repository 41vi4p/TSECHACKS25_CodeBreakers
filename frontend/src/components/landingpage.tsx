import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Shield,
  Database,
  Brain,
  UserCheck,
  UserPlus, FileSearch, CheckCircle, Bell
  Twitter,
  LinkedinIcon as LinkedIn,
  GitlabIcon as GitHub,
  Lock, 
  FileCheck,
} from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join the Future of Financial Security
        </h2>
        <p className="text-xl mb-8">
          Experience the power of blockchain-based risk intelligence today.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100">
            Sign Up Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-primary-foreground/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "How does RiskChain ensure data privacy?",
    answer:
      "RiskChain uses advanced encryption and blockchain technology to ensure that all data is securely stored and transmitted. Access is strictly controlled and limited to verified financial institutions and regulators.",
  },
  {
    question: "Can RiskChain integrate with our existing systems?",
    answer:
      "Yes, RiskChain is designed to be highly interoperable. We provide APIs and custom integration solutions to seamlessly connect with your existing risk management and compliance systems.",
  },
  {
    question: "How often is the risk intelligence updated?",
    answer:
      "Our platform provides real-time updates. As soon as new risk intelligence is submitted and validated by our AI and consensus mechanisms, it becomes immediately available to all authorized users.",
  },
  {
    question: "What types of financial institutions can use RiskChain?",
    answer:
      "RiskChain is suitable for a wide range of financial institutions, including banks, credit unions, insurance companies, investment firms, and fintech companies. Regulatory bodies can also access the platform for oversight purposes.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}



const features = [
  {
    title: "Controlled Access Network",
    description:
      "Exclusive platform for verified financial institutions & regulators.",
    icon: Shield,
  },
  {
    title: "Immutable Risk Intelligence",
    description: "Blockchain-secured records with comprehensive audit trails.",
    icon: Database,
  },
  {
    title: "Smart Risk Detection",
    description:
      "AI-powered fraud pattern recognition for proactive risk management.",
    icon: Brain,
  },
  {
    title: "Due Diligence & Verification",
    description:
      "Thorough background checks & network mapping for enhanced security.",
    icon: UserCheck,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}



export  function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RiskChain</h3>
            <p className="text-sm text-muted-foreground">
              Revolutionizing financial risk intelligence with blockchain
              technology.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 RiskChain. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground">
              <LinkedIn className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground">
              <GitHub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



export  function Header() {
  return (
    <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-bold">
          RiskChain
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline">
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:underline">
            Testimonials
          </Link>
          <Link
            href="#security"
            className="text-sm font-medium hover:underline">
            Security
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:underline">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 z-10" />
      <div className="container mx-auto relative z-20 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Global Financial Risk Intelligence, Decentralized & Secure
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Empower your financial institution with blockchain-based risk
          intelligence to combat fraud and identify high-risk entities in
          real-time.
        </p>
        <div className="flex space-x-4">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-primary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Register",
    description: "Sign up as a verified financial institution",
    icon: UserPlus,
  },
  {
    title: "Submit or Query",
    description: "Input or request risk intelligence data",
    icon: FileSearch,
  },
  {
    title: "Validation",
    description: "AI & consensus-based data validation",
    icon: CheckCircle,
  },
  {
    title: "Real-time Alerts",
    description: "Receive instant risk notifications",
    icon: Bell,
  },
]

export  function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 h-1 bg-primary mt-8 rotate-90 origin-left" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


const securityFeatures = [
  {
    title: "Blockchain Encryption",
    description: "Military-grade encryption secures all data on our decentralized network.",
    icon: Shield,
  },
  {
    title: "Regulatory Compliance",
    description: "Fully compliant with GDPR, ISO 27001, and other global standards.",
    icon: FileCheck,
  },
  {
    title: "Immutable Records",
    description: "Blockchain technology ensures tamper-proof data and audit trails.",
    icon: Lock,
  },
]

export function Security() {
  return (
    <section id="security" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Security & Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



const testimonials = [
  {
    quote:
      "RiskChain has revolutionized our approach to risk management. The blockchain-based system ensures data integrity like never before.",
    author: "Jane Doe",
    title: "Chief Risk Officer, Global Bank",
  },
  {
    quote:
      "The AI-powered risk detection has saved us countless hours and significantly improved our fraud prevention capabilities.",
    author: "John Smith",
    title: "Head of Compliance, Fintech Innovators",
  },
  {
    quote:
      "As a regulator, I appreciate the transparency and immutability of the risk intelligence provided by RiskChain.",
    author: "Emily Johnson",
    title: "Senior Regulator, Financial Conduct Authority",
  },
]

const partners = ["/logo1.svg", "/logo2.svg", "/logo3.svg", "/logo4.svg", "/logo5.svg", "/logo6.svg"]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
        <Carousel className="mb-12">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="pt-6">
                    <blockquote className="text-lg mb-4">"{testimonial.quote}"</blockquote>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((logo, index) => (
            <img
              key={index}
              src={logo || "/placeholder.svg"}
              alt={`Partner ${index + 1}`}
              className="h-12 opacity-50 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

