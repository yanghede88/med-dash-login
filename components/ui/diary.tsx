import * as React from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { DatePickerWithPresets } from '@/components/ui/datepick'

import entries from '@/Sam';


export function CarouselDemo() {

  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {entries.map(entry => (
          <CarouselItem key={entry.timestamp}>
            <div className="p-1">
              <Card>
                <CardHeader>
                    <CardTitle className="flex justify-center p-6"><DatePickerWithPresets givenDate={new Date(entry.timestamp)}/></CardTitle>
                </CardHeader>
                <CardContent className="flex aspect-square p-6">
                  <span>{entry.entry}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
