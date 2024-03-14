import * as React from "react"
import { cn } from "../../components/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../components/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/popover"
import { Button } from "../../components/button"
import { Calendar } from "../../components/calendar"
import { useForm } from "react-hook-form"
import { Textarea } from "../../components/Textarea"

interface EntryFormProps {
    onSubmit: (newEntry: object) => void;
}

const FormSchema = z.object({
    entry: z.string().min(1, { message: "A journal entry must have at least 1 character." }),
    timestamp: z.date({
      required_error: "A valid date is required.",
    }),
});
  
export function EntryForm({ onSubmit }: EntryFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function handleSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Submit button pressed");
        const submittedEntry = {
            "entry": data.entry,
            "timestamp": data.timestamp.toISOString()
        }
        onSubmit(submittedEntry);
    }

    return (
        <Card className="bg-white w-full max-w-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}> 
                    <CardHeader>
                        <CardTitle className="flex justify-center p-6">
                            <FormField
                                control={form.control}
                                name="timestamp"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex aspect-[5/3] p-6 w-full">
                        <FormField
                            control={form.control}
                            name="entry"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write about what happened today"
                                            className="resize-none h-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Card>
    )
}