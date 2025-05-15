'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.error) {
            alert(res.error);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-pink-100 px-4 py-12">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-3xl font-bold text-indigo-700">
                        Welcome Back 👋
                    </CardTitle>
                    <p className="text-sm text-gray-500">Sign in to access your account</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Google Login */}
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 text-sm font-medium"
                        onClick={() => signIn('google')}
                    >
                        <FcGoogle className="text-xl" />
                        Sign in with Google
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <div className="flex-1 h-px bg-gray-300" />
                        or continue with email
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Sign in Button */}
                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="text-sm text-center text-muted-foreground mt-2">
                        Don’t have an account?{' '}
                        <a href="/signup" className="text-indigo-600 font-medium hover:underline">
                            Sign Up
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;
