import * as React from "react"

import { Card, CardHeader, CardTitle, CardContent } from "./card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"
import { DatePickerWithPresets } from './datepick'

import entries from './sampleEntries.json'

entries.push({
  "entry": "Finished 2nd 181 midterm!!!",
  "timestamp": "2024-02-29T18:25:43.511Z" 
})

function DiaryEntries() {

  return (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-xl">
        <CarouselContent>
          {entries.map(entry => (
            <CarouselItem key={entry.timestamp}>
              <div className="p-1">
                <Card className="bg-white">
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
        <CarouselPrevious className="bg-white"/>
        <CarouselNext className="bg-white"/>
      </Carousel>
    </div>
  )
}

export default DiaryEntries
