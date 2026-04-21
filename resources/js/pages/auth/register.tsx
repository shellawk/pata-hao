import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <h2 className="text-xl font-semibold mb-4">Create Account</h2>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel value="Name" />
                    <TextInput
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel value="Email" />
                    <TextInput
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel value="Phone" />
                    <TextInput
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} />
                </div>

                <div>
                    <InputLabel value="Role" />
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="mt-1 block w-full border-gray-200 rounded-lg p-2"
                    >
                        <option value="user">User</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>

                <div>
                    <InputLabel value="Password" />
                    <TextInput
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div>
                    <InputLabel value="Confirm Password" />
                    <TextInput
                        type="password"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                </div>

                <PrimaryButton className="w-full bg-[#0a3d62] text-white">
                    Register
                </PrimaryButton>

                <p className="text-sm text-center mt-2">
                    Already registered?{" "}
                    <Link href={route('login')} className="text-[#0a3d62] underline">
                        Login
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}