import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";





export default function ForgotPassword() {
    return (
        <div>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl mb-4">Forgot Password</CardTitle>
                    <CardDescription>
                        Do not fret!, Just type in your email and we will send you a code to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-4 pt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />

                                <span className="text-red-500 text-xs"></span>

                            </div>
                            <Button type="submit" className="w-full mt-4">
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
