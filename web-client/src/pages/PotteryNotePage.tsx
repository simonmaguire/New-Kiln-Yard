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
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"

interface IFormFields {
    description: string,
    clay: string,
    category?: string | undefined,
    stage?: string | undefined,
    clayWeight: string,
    throwHeight: string,
    throwWidth: string,
    throwNotes: string,
    greenDecor: string,
    trimNotes: string,
    glazes: string,
    glazeNotes: string,
    finishedHeight: string,
    finishedWidth: string,
    finishedNotes: string,
    throwDate?: Date | undefined,
    trimDate?: Date | undefined,
    finishedDate?: Date | undefined
}

const formSchema = z.object({
    clay: z.string().max(60, {message: 'Max 60 characters'}),
    description: z.string().max(60, {message: 'Max 60 characters'}),
    category: z.string().optional(),
    stage: z.string().optional(),

    throwDate: z.date().optional(),
    clayWeight: z.string().regex(/^\d*[.]?\d*$/),
    throwHeight: z.string().regex(/^\d*[.]?\d*$/),
    throwWidth: z.string().regex(/^\d*[.]?\d*$/),
    throwNotes: z.string().max(150, {message: 'Max 150 characters'}),
    //throwPics

    trimDate: z.date().optional(),
    greenDecor: z.string().max(60, {message: 'Max 60 characters'}),
    trimNotes: z.string().max(150, {message: 'Max 150 characters'}),

    glazes: z.string().max(60, {message: 'Max 60 characters'}),
    glazeNotes: z.string().max(150, {message: 'Max 150 characters'}),

    finishedDate: z.date().optional(),
    finishedHeight: z.string().regex(/^\d*[.]?\d*$/),
    finishedWidth: z.string().regex(/^\d*[.]?\d*$/),
    finishedNotes: z.string().max(150, {message: 'Max 150 characters'}),
    //finishedPics


})

export const PotForm = ({data}) => {
    const navigate = useNavigate()
    const {potID} = useParams()

    console.log(data);

    let initialValues: IFormFields = {
        description: data?.description || '',
        clay: data.clay || '',
        category: data.category || '',
        stage: data.stage || '',
        clayWeight: data.clay_weight || '',
        throwHeight: data.thrown_height || '',
        throwWidth: data.thrown_width || '',
        throwNotes: data.thrown_notes || '',
        greenDecor: data.green_decor || '',
        trimNotes: data.trim_notes || '',
        glazes: '',
        glazeNotes: data.glaze_notes || '',
        finishedWidth: data.finished_width || '',
        finishedHeight: data.finished_height || '',
        finishedNotes: data.finished_notes || '',
    }
    data.throw_date ? initialValues.throwDate = new Date(data.throw_date) : null;
    data.trim_date ? initialValues.trimDate = new Date(data.trim_date) : null;
    data.finished_date ? initialValues.finishedDate = new Date(data.finished_date) : null;
    
      
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })
    
    const createMutation = useMutation({
        mutationFn: async (data: IFormFields) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-pot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          response.json().then((data) => navigate(`./${data.id}`))
        }
      })

      const updateMutation = useMutation({
        mutationFn: async (data: IFormFields) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/update-pot/${potID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          return response.json()
        }
      })

      const onSubmit = (values: z.infer<typeof formSchema>) => {
          console.log(values);

          potID ? updateMutation.mutate((values)) : createMutation.mutate((values))
      }
      console.log(potID);
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
                                <Input type="number" {...field} />
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
    const {potID} = useParams()

    const {isPending, isError, error, data, isLoading} = useQuery({
        queryKey: ['pot'],
        queryFn: async () => {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pot/${potID}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        },
        enabled: !!potID
      });

      if (isPending || isLoading) return <span>Loading...</span>;

      if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      <PotForm data={data}/>
    </div>
  )
}