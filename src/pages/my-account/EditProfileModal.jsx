import React from "react";
import { FiSave, FiX } from "react-icons/fi";

export const EditProfileModal = ({ profileForm, setProfileForm, onSave, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-primary-white border border-grey-200 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-grey-200">
          <h2 className="font-display text-2xl font-light text-black-charcoal">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300 rounded-full hover:bg-grey-50"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* First + Last */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                First Name <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, firstName: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Last Name <span className="text-accent-rose-600">*</span>
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lastName: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-light text-black-charcoal mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block font-body text-sm font-light text-black-charcoal mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={profileForm.dateOfBirth}
              onChange={(e) =>
                setProfileForm({ ...profileForm, dateOfBirth: e.target.value })
              }
              className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
            />
          </div>

          <button
            onClick={onSave}
            className="w-full px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FiSave className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
