import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

export default function ImageGallery({productImages = []}) {
  return (
    <TabGroup className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {productImages.map((image, index) => (
            <Tab
              key={Math.random() * index}
              className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
            >
              <span className="sr-only">{image}</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <img
                  alt=""
                  src={image}
                  className="size-full object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
              />
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels>
        {productImages.map((image, index) => (
          <TabPanel 
          key={Math.random() * index}>
            <img
              alt={image}
              src={image}
              className="aspect-square w-full object-cover sm:rounded-lg"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
