import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden lg:overflow-visible pt-20">
      {/* GRID BG */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      {/* Gradient ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <div className="space-y-10 order-2 lg:order-1  animate-fade-up">
              <div className="space-y-6">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-primary animate-pulse">
                    AI-Powered Dental Assistant
                  </span>
                </div>

                {/* HEADING */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    Your dental
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    questions
                  </span>
                  <br />
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    answered instantly
                  </span>
                </h1>

                {/* SUBTITLE */}
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg font-medium">
                  Chat with our AI dental assistant for instant advice, book smart
                  appointments, and get personalized care recommendations.
                  Available 24/7.
                </p>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:200ms]">
                <SignUpButton mode="modal">
                  <Button size="lg" className="w-full sm:w-auto">
                    <MicIcon className="mr-2 size-5" />
                    Try voice agent
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <CalendarIcon className="mr-2 size-5" />
                    Book an appointment
                  </Button>
                </SignUpButton>
              </div>

              {/* TESTIMONIALS */}
              <div className="pt-8 animate-fade-up [animation-delay:400ms]">
                <div className="flex flex-wrap items-center gap-6">
                  {/* AVATARS */}
                  <div className="flex -space-x-3">
                    {[
                      "photo-1544005313-94ddf0286df2",
                      "photo-1560250097-0b93528c311a",
                      "photo-1580489944761-15a19d654956",
                      "photo-1633332755192-727a05c4013d",
                      "photo-1598300042247-d088f8ab3a91",
                    ].map((img, i) => (
                      <Image
                        key={i}
                        src={`https://images.unsplash.com/${img}?w=100&h=100&fit=crop&crop=face`}
                        alt="User"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                      />
                    ))}
                  </div>

                  {/* RATINGS */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        4.9/5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Trusted by{" "}
                      <span className="font-semibold text-foreground">
                        1,200+ patients
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT – IMAGE */}
            <div className="relative order-1 lg:order-2 lg:pl-8 flex justify-center">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl" />

              <Image
                src="/hero.png"
                alt="Dentwise AI Dental Assistant"
                width={600}
                height={600}
                className="w-[260px] sm:w-[320px] md:w-[420px] lg:w-full mx-auto animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
