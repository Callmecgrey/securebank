import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, LineChart, Clock, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-background">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold">SecureBank</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Banking Made Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Experience modern banking with powerful features, security, and ease of use.
              Manage your finances anywhere, anytime.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary p-3">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Secure Banking</h3>
              <p className="mt-2 text-muted-foreground">
                Bank with confidence using our state-of-the-art security measures and encryption.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary p-3">
                <LineChart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Smart Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Track your spending patterns and get insights to make better financial decisions.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-primary p-3">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">24/7 Banking</h3>
              <p className="mt-2 text-muted-foreground">
                Access your account and make transactions anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}