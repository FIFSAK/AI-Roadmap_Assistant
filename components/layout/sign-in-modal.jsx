import {
  useState,
  useCallback,
  useMemo,
  Fragment
} from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post('https://roadmap-back-zntr.onrender.com/user/signup', data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem('jwt', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        setShowSignInModal(false);
        setEmail('');
        setPassword('');
      }

    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Transition appear show={showSignInModal} as={Fragment}>
      <Dialog as="div" className="relative z-40" open={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 transition-all">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
                  <h3 className="font-display text-2xl font-bold">Sign In</h3>
                </div>

                <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
                  <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="p-3 w-full rounded-md border-2 border-gray-300 outline-none focus:border-indigo-500"
                    />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="p-3 w-full rounded-md border-2 border-gray-300 outline-none focus:border-indigo-500"
                    />
                    <button 
                      type="submit" 
                      className="bg-indigo-500 text-white w-full p-3 rounded-md hover:bg-indigo-600 transition-all"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
