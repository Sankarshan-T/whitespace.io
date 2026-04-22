import { Edit3, Layout, Users, Zap, Shield, MousePointer2 } from "lucide-react";

const features = [
    {
        title: "MD Editor",
        desc: "A rich markdown experience with slash commands and real-time syncing.",
        icon: <Edit3 className="h-6 w-6 text-blue-600" />,
    },
    {
        title: "Infinite Canvas",
        desc: "Built-in Excalidraw for sketching diagrams and flowcharts alongside your docs.",
        icon: <Layout className="h-6 w-6 text-pink-600" />,
    },
    {
        title: "Team Collaboration",
        desc: "Work together in real-time with your team members on the same file.",
        icon: <Users className="h-6 w-6 text-orange-600" />,
    },
    {
        title: "Blazing Fast",
        desc: "Built with Next.js and Convex for instant database updates and zero lag.",
        icon: <Zap className="h-6 w-6 text-yellow-600" />,
    },
];

export function Features() {
    return (
        <section id="features" className="h-[calc(100vh-66px)] bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                        Everything you need to build faster
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Stop switching between Inkly, Corenote, and LucidCharts. Do it all in one tab.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="mb-4 p-3 rounded-lg bg-secondary w-fit group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}