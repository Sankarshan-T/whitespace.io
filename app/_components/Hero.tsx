import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
    return (
        <section className="bg-transparent w-screen h-[calc(100vh-66px)] flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-4xl font-bold text-primary sm:text-5xl">
                        Design ideas at the
                        <strong className="text-violet-900"> speed </strong>
                        of thought
                    </h1>

                    <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg/relaxed">
                        An all-in-one collaborative canvas, markdown editor and diagram editor.
                    </p>

                    <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                        <Button size={"lg"} className="hover:scale-105 transition rounded-md py-5 px-3 text-md">
                            <Link href={'/dashboard'}>
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;