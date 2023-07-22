// "use client";

// import { Fragment } from "react";
// import axios from 'axios';
// import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
// import Image from "next/image";
// import { Menu, Transition } from '@headlessui/react'
// import cx from 'classnames'

// export default function UserDropdown({ session }) {
//   const { email, image } = session?.user || {};

//   if (!email) return null;

//   const handleSignOut = () => {
//     axios.defaults.headers.common['Authorization'] = null;
//     localStorage.removeItem('jwt');
//     // Add other cleanup actions as necessary
//   }

//   return (
//       <button
//         className={cx(active ? 'bg-gray-100' : '', 'relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700')}
//         onClick={handleSignOut}
//       >
//        <ArrowRightOnRectangleIcon className="h-4 w-4" />
//        <p className="text-sm">Sign out</p>
//      </button>

//   );
// }
