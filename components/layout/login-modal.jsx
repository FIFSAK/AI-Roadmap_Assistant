"use client";

import {
  useState,
  useCallback,
  useMemo,
  Fragment
} from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
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
      const response = await axios.post('http://127.0.0.1:8000/user/login', data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem('jwt', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        setShowLoginModal(false);
        setEmail('');
        setPassword('');
      }

    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Transition appear show={showLoginModal} as={Fragment}>
      <Dialog as="div" className="relative z-40" open={showLoginModal} onClose={() => setShowLoginModal(false)}>
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
                      {error && <p>{error}</p>}
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                     <button type="submit">log in</button>
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

export function useLoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const LoginModalCallback = useCallback(() => {
    return (
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    );
  }, [showLoginModal, setShowLoginModal]);

  return useMemo(
    () => ({ setShowLoginModal, LoginModal: LoginModalCallback }),
    [setShowLoginModal, LoginModalCallback],
  );
}
