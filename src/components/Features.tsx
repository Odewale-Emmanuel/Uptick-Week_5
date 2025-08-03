import organizeIcon from "@/assets/feature-organize.jpg";
import searchIcon from "@/assets/feature-search.jpg";
import secureIcon from "@/assets/feature-secure.jpg";

const Features = () => {
  const features = [
    {
      icon: organizeIcon,
      title: "Smart Organization",
      description: "Organize your notes with tags, folders, and powerful search. Never lose track of your ideas again."
    },
    {
      icon: searchIcon,
      title: "Instant Search",
      description: "Find any note in milliseconds. Search through titles, content, and tags with lightning speed."
    },
    {
      icon: secureIcon,
      title: "Secure & Private",
      description: "Your notes are encrypted and stored securely. Only you have access to your thoughts and ideas."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            StarkNotes provides all the tools you need to capture, organize, and retrieve your thoughts effortlessly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-background border border-border rounded-lg p-8 h-full shadow-subtle hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;