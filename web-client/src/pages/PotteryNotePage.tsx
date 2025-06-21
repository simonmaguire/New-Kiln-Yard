import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"

const formSchema = z.object({
    clay: z.string().max(60, {message: 'Max 60 characters'}),
    description: z.string().max(60, {message: 'Max 60 characters'}),
    category: z.string().optional(),
    stage: z.string().optional(),

    throwDate: z.date().optional(),
    clayWeight: z.string().max(10, {message: 'Max 10 characters'}),
    throwHeight: z.string().max(10, {message: 'Max 10 characters'}),
    throwWidth: z.string().max(10, {message: 'Max 10 characters'}),
    throwNotes: z.string().max(150, {message: 'Max 150 characters'}),
    //throwPics

    trimDate: z.date().optional(),
    greenDecor: z.string().max(10, {message: 'Max 60 characters'}),
    trimNotes: z.string().max(10, {message: 'Max 150 characters'}),

    glazes: z.string().max(60, {message: 'Max 60 characters'}),
    glazeNotes: z.string().max(150, {message: 'Max 150 characters'}),

    finishedDate: z.date().optional(),
    finishedHeight: z.string().max(10, {message: 'Max 10 characters'}),
    finishedWidth: z.string().max(10, {message: 'Max 10 characters'}),
    finishedNotes: z.string().max(150, {message: 'Max 150 characters'}),
    //finishedPics


})

export const PotForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            clay: '',
            category: '',
            stage: '',
            clayWeight: '',
            throwHeight: '',
            throwWidth: '',
            throwNotes: '',
            greenDecor: '',
            trimNotes: '',
            glazes: '',
            glazeNotes: '',
            finishedHeight: '',
            finishedWidth: '',
            finishedNotes: '',
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
{/* Figure out how I want to do multiselect */}
                <FormField
                    control={form.control}
                    name="clay"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clay</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mug">Mug</SelectItem>
                  <SelectItem value="cup">Cup</SelectItem>
                  <SelectItem value="bowl">Bowl</SelectItem>
                  <SelectItem value="plate">Plate</SelectItem>
                  <SelectItem value="pitcher">Pitcher</SelectItem>
                  <SelectItem value="planter">Planter</SelectItem>
                  <SelectItem value="sculpture">Sculpture</SelectItem>
                  <SelectItem value="vase">Vase</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wet">Wet</SelectItem>
                  <SelectItem value="leather-hard">Leather Hard</SelectItem>
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="bisque">Bisque</SelectItem>
                  <SelectItem value="glazed-bisque">Glazed Bisque</SelectItem>
                  <SelectItem value="glazeware">Glazeware</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="throwDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Thrown on</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

                <FormField
                    control={form.control}
                    name="clayWeight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clay Weight</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="throwHeight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Throw Height</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="throwWidth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Throw Width</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="throwNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Throw Notes</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

<FormField
          control={form.control}
          name="trimDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Trimmed on</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
                    control={form.control}
                    name="greenDecor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Green Decor</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="trimNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trim Notes</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

<FormField
                    control={form.control}
                    name="glazes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Glaze</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="glazeNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Glaze Notes</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

<FormField
          control={form.control}
          name="finishedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Finished on</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

                <FormField
                    control={form.control}
                    name="finishedHeight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Finished Height</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="finishedWidth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Finished Width</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="finishedNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Finished Notes</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>

        </Form>
    )

}

export const PotteryNotePage = () => {
  return (
    <div>
      <PotForm/>
    </div>
  )
}