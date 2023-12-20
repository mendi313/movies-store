'use client';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';
import { ContextValue } from '../context/Context';
import updateUser from '@/lib/updateUser';

const EditUser = () => {
  const { editedUser, setEditedUser } = ContextValue();
  const router = useRouter();

  const submitHandler = async (formInputsData: { role: string; name: string }) => {
    const { name, role } = formInputsData;

    if (editedUser?._id && name) {
      const userData = await updateUser({ id: editedUser._id, name, role });
      router.push('/userManagment');
      setEditedUser(null);
    } else {
      // Handle the case when _id or name is missing
      console.error('Invalid user data or _id missing.');
    }
  };

  const formState: FormInputsData = {
    state: 'editUser',
    title: 'Edit User Page',
    func: submitHandler,
  };

  return (
    <div>
      {editedUser && <RegisterForm formData={formState} userData={editedUser} />}
    </div>
  );
};

export default EditUser;
