'use client'

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'


const profSchema = z.object({
    image: z.string().optional(),
    aboutme: z.string().optional(),
    favouriteGenres: z.array(z.string()).optional(),
    favouriteAnime: z.array(z.string()).optional(),
})

const GENRES = ['Action', 'Comedy', 'Isekai', 'Romance', 'Adventure']

export default function EditProfile() {
    const router = useRouter()
    const form = useForm<z.infer<typeof profSchema>>({
        resolver: zodResolver(profSchema),
        defaultValues: {
            image: '',
            aboutme: '',
            favouriteGenres: [],
            favouriteAnime: [],
        },
    })
    const { data: session } = useSession()
    const userId = session?.user?.id;

    async function onSubmit(values: z.infer<typeof profSchema>) {
        if (!userId) {
            console.log("No user ID found in session");
            alert("User not logged in");
            return;
        }


        try {
            const response = await axios.post('/api/updateprofile', { userId, ...values });

            if (response.status === 200) {
                alert('Profile updated successfully!');
                router.push(`/profile`);
            } else {
                alert('Failed to update profile.');
            }
        } catch (error: any) {
            console.log("API error:", error);
            alert('An error occurred while updating profile.');
        }
    }


    function MultiSelectGenres({
        selected,
        onChange,
    }: {
        selected: string[]
        onChange: (value: string[]) => void
    }) {
        const [open, setOpen] = useState(false)

        const toggleGenre = (genre: string) => {
            if (selected.includes(genre)) {
                onChange(selected.filter((g) => g !== genre))
            } else {
                onChange([...selected, genre])
            }
        }

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        {selected.length > 0 ? selected.join(', ') : 'Select Genres'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                    <div className="flex flex-col gap-2">
                        {GENRES.map((genre) => (
                            <label key={genre} className="flex items-center gap-2">
                                <Checkbox
                                    checked={selected.includes(genre)}
                                    onCheckedChange={() => toggleGenre(genre)}
                                />
                                <span>{genre}</span>
                            </label>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    form.setValue('image', event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className='w-full h-screen  bg-gray-950 p-20 '>

                <div className='w-full flex flex-col justify-evenly items-center'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-gray-950 w-[60vw] flex flex-col justify-evenly items-center h-[80vh]">

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-3xl text-red-500 font-semibold'>Image</FormLabel>
                                        <FormControl>
                                            <input
                                                className='bg-white rounded-2xl px-5 h-10 flex justify-center items-center'
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </FormControl>
                                        <FormDescription className='text-md font-semibold text-gray-300'>
                                            Upload your profile image
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="aboutme"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-3xl text-red-500 font-semibold'>About Me</FormLabel>
                                        <FormControl>
                                            <input
                                                className=' bg-white rounded-2xl px-5  h-10 flex justify-center items-center'
                                                type="text"
                                                placeholder="Enter About Yourself"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className='text-md font-semibold text-gray-300'>Write something about yourself</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="favouriteGenres"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-3xl text-red-500 font-semibold'>Favourite Genres</FormLabel>
                                        <FormControl>
                                            <MultiSelectGenres
                                                selected={field.value || []}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ✅ Favourite Anime — simple text input, comma separated */}
                            <FormField
                                control={form.control}
                                name="favouriteAnime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-3xl text-red-500 font-semibold'>Favourite Anime</FormLabel>
                                        <FormControl>
                                            <input
                                                className=" bg-white rounded-2xl px-5  h-10 text-center"
                                                type="text"
                                                placeholder="e.g. One Piece, Naruto"
                                                value={field.value?.join(', ') || ''}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value.split(',').map((s) => s.trim()))
                                                }
                                            />

                                        </FormControl>
                                        <FormDescription className='text-md font-semibold text-gray-300'>
                                            Enter multiple anime separated by commas.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-2xl text-2xl font-semibold ">
                                Submit
                            </button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}

