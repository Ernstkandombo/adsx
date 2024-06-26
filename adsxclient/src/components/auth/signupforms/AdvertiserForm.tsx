'use client'



import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react'; 


interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
}

export default function AdvertiserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.trim().length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const advertiserhandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/advertiser/`, { name, email, password, role: "advertiser" });
                // Clear form fields
                setName('');
                setEmail('');
                setPassword('');
                // Sign in the user after successful registration
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false, // Prevent automatic redirection
                });
                // Show success toast
                toast.success('Your Account has been successfully created');
                // Redirect to '/advertisers'
                router.push('/advertisers');
            } catch (error: any) {
                if (error.response) {
                    // Server responded with a status code different from 2xx
                    const errorData = error.response.data;
                    if (errorData.message === "Email already exists. Please use another one.") {
                        // Show message in toast
                        toast.error(errorData.message);
                    } else {
                        setErrors(errorData.errors || {});
                        // Show error toast
                        toast.error('Failed to create user. Please check the form and try again.');
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error:', error.message);
                    // Show generic error toast
                    toast.error('An unexpected error occurred. Please try again later.');
                }
            }
        }
    };

    return (
        <div>
            <form onSubmit={advertiserhandleSubmit}>
                <div className="grid gap-4 pt-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Robinson Company"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Create an account
                    </Button>
                </div>
            </form>
        </div>
    );
}
