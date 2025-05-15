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

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            setMessage('Sign up successful! 🎉');
            setFormData({ name: '', email: '', password: '' });
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-200 px-4 py-12">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-3xl font-bold text-pink-600">
                        Create Account 🎉
                    </CardTitle>
                    <p className="text-sm text-gray-500">Join us and get started</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="bg-white"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white"
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>

                        {/* Message */}
                        {message && (
                            <p
                                className={`text-sm text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-500'
                                    }`}
                            >
                                {message}
                            </p>
                        )}

                        {/* Footer */}
                        <p className="text-sm text-center text-muted-foreground mt-2">
                            Already have an account?{' '}
                            <a
                                href="/signin"
                                className="text-pink-600 font-medium hover:underline"
                            >
                                Sign In
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpPage;
