'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
			router.push('/auth/login');
		} catch (error) {
			setError((error as Error).message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create a new account</CardDescription>
				</CardHeader>
				<form onSubmit={handleRegister}>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col">
						<Button className="w-full" type="submit">
							Register
						</Button>
						{error && <p className="text-red-500 mt-2">{error}</p>}
						<p className="mt-4">
							Already have an account?{' '}
							<Link href="/login" className="text-blue-500 hover:underline">
								Login
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
