import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import { Head, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">

                    {/* PROFILE CARD */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Account Information</h3>

                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-semibold">Name:</span> {user.name}</p>
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">Phone:</span> {user.phone || 'Not set'}</p>
                            <p>
                                <span className="font-semibold">Role:</span>{' '}
                                <span className="capitalize">{user.role}</span>
                            </p>
                        </div>
                    </div>

                    {/* OPTIONAL: STATUS */}
                    {status && (
                        <div className="bg-green-100 text-green-700 p-3 rounded">
                            {status}
                        </div>
                    )}

                    {/* EXISTING BREEZE FORMS */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h3 className="font-semibold mb-3">Update Profile</h3>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h3 className="font-semibold mb-3">Change Password</h3>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 border border-red-100">
                        <h3 className="font-semibold mb-3 text-red-600">Danger Zone</h3>
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}