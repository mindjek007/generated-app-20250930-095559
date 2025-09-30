import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Users, Heart } from "lucide-react";
export function AboutPage() {
  const features = [
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-brand" />,
      title: "Diverse Culinary Delights",
      description: "From savory street tacos to decadent desserts, we bring together a curated selection of the best local food vendors.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-brand" />,
      title: "Fresh & Quality Ingredients",
      description: "Our stall owners are passionate about their craft, using only the freshest ingredients to create unforgettable flavors.",
    },
    {
      icon: <Users className="h-8 w-8 text-brand" />,
      title: "Community Focused",
      description: "Urban Chowk is more than a food court; it's a vibrant community hub where people connect over great food.",
    },
    {
      icon: <Heart className="h-8 w-8 text-brand" />,
      title: "Made with Passion",
      description: "Every dish is prepared with love and dedication, ensuring a memorable culinary experience with every bite.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Our Story
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Urban Chowk was born from a simple idea: to create a single, vibrant space where the diverse flavors of the city's best street food could come together. We're a collective of passionate chefs and food entrepreneurs dedicated to crafting delicious, authentic, and memorable meals.
          </p>
        </div>
      </div>
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Why You'll Love Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We believe in the power of food to bring people together. Here’s what makes Urban Chowk special.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}