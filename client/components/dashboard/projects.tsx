import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const Projects: React.FC = () => {
  return (
    <section className="mt-12 px-20">
      <div>
        <h1 className="text-4xl">Projects</h1>
        <div className="flex py-8">
          <Card className="w-96 h-max">
            <CardHeader>
              <CardTitle className="text-2xl font-bold border-b py-2">
                Project Name
              </CardTitle>
            </CardHeader>
            <CardDescription className="px-6 max-w-2xl text-md">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </CardDescription>
            <CardFooter>
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="text-navy-blue">Know more</button>
                </DrawerTrigger>
                <DrawerContent className="px-20">
                  <DrawerHeader>
                    <DrawerTitle className="text-navy-blue text-3xl">
                      Project Title
                    </DrawerTitle>
                    <DrawerDescription className="max-w-2xl text-lg pt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus luctus urna sed urna ultricies ac tempor dui
                      sagittis. In condimentum facilisis porta.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="w-max text-lg">
                    <div className="w-full flex gap-x-10 items-center">
                      <button className="text-white bg-navy-blue px-10 py-2 rounded-md">
                        Visit Site
                      </button>
                      <button className="text-white bg-green-600 px-10 py-2 rounded-md">
                        Fund
                      </button>

                      <DrawerClose>
                        <button className="bg-red-600 text-white px-10 py-2 rounded-md">
                          Cancel{" "}
                        </button>
                      </DrawerClose>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
