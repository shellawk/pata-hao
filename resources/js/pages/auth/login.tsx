import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

type Props = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <h2 className="text-xl font-semibold mb-4">Welcome Back</h2>

            {status && (
                <div className="mb-3 text-green-600 text-sm">{status}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>

                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('email', e.target.value)
                        }
                    />

                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password">Password</InputLabel>

                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('password', e.target.value)
                        }
                    />

                    <InputError message={errors.password} />
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                        checked={data.remember}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    Remember me
                </label>

                <PrimaryButton
                    className="w-full bg-[#0a3d62] text-white"
                    disabled={processing}
                >
                    Login
                </PrimaryButton>

                <div className="text-center text-sm mt-2">
                    <Link href={route('register')} className="text-[#0a3d62] underline">
                        Create account
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}