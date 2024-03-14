import * as React from "react"
import { Button } from "../../components/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/carousel"
import { DatePickerWithPresets } from '../../components/datepick'
import {EntryForm} from './DiaryEntryAdd'
import DiaryEntryList from '../../components/sampleEntries.json'

function DiaryEntries() {
  const [showEntryForm, setShowEntryForm] = React.useState(false);
  const [entries, setEntries] = React.useState(DiaryEntryList);

  const toggleEntryForm = () => {
    setShowEntryForm(!showEntryForm);
  };

  const handleFormSubmit = (newEntry) => {
    setEntries([...entries, newEntry]); //Possible error: appends new entry to end of array so may not be in chronological order
    setShowEntryForm(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <div>
        {showEntryForm ? null : (
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {entries.map(entry => (
                <CarouselItem key={entry.timestamp}>
                  <div className="p-1">
                    <Card className="bg-white">
                      <CardHeader>
                          <CardTitle className="flex justify-center p-6"><DatePickerWithPresets givenDate={new Date(entry.timestamp)}/></CardTitle>
                      </CardHeader>
                      <CardContent className="flex aspect-[5/3] p-6">
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
        )}
      </div>
      {showEntryForm ? (
        <EntryForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="flex space-x-4">
          <Button className="bg-blue-500 text-white" onClick={toggleEntryForm}>Add Entry</Button>
          <Button className="bg-blue-500 text-white">Edit Entry</Button>
        </div>
      )}
    </div>
  );
}

export default DiaryEntries
