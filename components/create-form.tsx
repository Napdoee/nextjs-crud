"use client";

import { saveContact } from "@/lib/actions";
import { useFormState } from "react-dom";

const CreateForm = () => {
  const [state, formAction] = useFormState(saveContact, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block font-medium text-gray-900 text-sm"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
            placeholder="Full Name..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block font-medium text-gray-900 text-sm"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-sm focus:ring-blue-500 w-full text-gray-900 text-sm"
            placeholder="Phone Number..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-sm w-full font-medium text-white text-sm text-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
