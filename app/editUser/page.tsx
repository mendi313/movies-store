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
    let userData = null;
    if (name) userData = await updateUser({ _id: editedUser?._id, name, role });
    router.push('/userManagment');
    setEditedUser(null);
  };

  const formState: FormInputsData = {
    state: 'editUser',
    title: 'Edit User Page',
    func: submitHandler,
  };

  return <div>{editedUser && <RegisterForm formData={formState} userData={editedUser} />};</div>;
};

export default EditUser;
