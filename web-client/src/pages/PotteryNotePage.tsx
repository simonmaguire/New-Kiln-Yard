import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"


const formSchema = z.object({clay: z.string().max(60, {message: 'Max 60 characters'}) })

export const PotForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clay: ''
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
                    name="clay"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Clay</FormLabel>
                            <FormControl>
                                <Input placeholder="Which Clay?" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Which clay did you use for this piece?
                            </FormDescription>
                            <FormMessage/>
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