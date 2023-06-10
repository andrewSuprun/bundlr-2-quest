import React, { useState, useEffect } from "react";

import {
  useActiveProfile,
  useCreateProfile,
  useProfilesOwnedByMe,
  useActiveProfileSwitch,
} from "@lens-protocol/react";

const ProfileSwitcher = ({ showCreateNew }) => {
  const [message, setMessage] = useState("");
  const [txActive, setTxActive] = useState(false);
  const [createProfileMode, setCreateProfileMode] = useState(false);
  const [newProfileHandle, setNewProfileHandle] = useState("");
  const {
    data: profiles,
    loading: profilesLoading,
    hasMore,
    next,
  } = useProfilesOwnedByMe();
  const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
  const { execute: switchProfile, isPending } = useActiveProfileSwitch();

  const {
    execute: createNewProfile,
    error: createNewProfileError,
    isPending: createNewProfilePending,
  } = useCreateProfile();

  // Called when the user clicks "save new profile"
  const doCreateProfile = async () => {
    setMessage("");
    setTxActive(true);
    try {
      setMessage("Creating profile ...");
      const tx = await createNewProfile(newProfileHandle);
      setMessage("Profile created.");
    } catch (e) {
      setMessage("Error creating profile " + e);
      console.log("Error on create profile ", e);
    }
    setTxActive(false);
    setCreateProfileMode(false);
  };

  useEffect(() => {
    if (!profiles || profiles.length === 0) setCreateProfileMode(true);
    else setCreateProfileMode(false);
  }, [profilesLoading]);

  return (
    <div className="w-fit mt-2 flex flex-col bg-primary px-1 py-1 rounded-lg">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full px-5 py-2">
          <label className="font-main block uppercase tracking-wide text-gray-700 text-sm font-bold">
            Handle:
          </label>
          {!createProfileMode && (
            <div className="relative">
              <select
                onChange={(val) => switchProfile(val.target.value)}
                className="font-main text-sm px-5 text-white rounded-lg bg-background hover:bg-secondary ml-2 appearance-none"
                value={activeProfile?.id}
              >
                {profiles &&
                  profiles
                    ?.filter(
                      (a, i) =>
                        profiles?.findIndex((s) => a.id === s.id) === i
                    )
                    .map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.handle}
                      </option>
                    ))}
              </select>
              {showCreateNew && (
                <button
                  className="ml-2 font-main px-4 py-1 text-white rounded-lg bg-background hover:bg-secondary"
                  onClick={() => setCreateProfileMode(true)}
                >
                  Create New
                </button>
              )}
            </div>
          )}
          {createProfileMode && (
            <div className="flex flex-row">
              <input
                className="bg-white ml-2 appearance-none block rounded focus:outline-none border border-gray-300 py-1 px-2 text-sm"
                id="newProfileHandle"
                type="text"
                onChange={(e) => setNewProfileHandle(e.target.value)}
              />

              <button
                className="ml-2 font-main px-4 py-1 text-white rounded-lg bg-background hover:bg-secondary border border-red-500 text-sm"
                disabled={txActive}
                onClick={doCreateProfile}
              >
                Save New Profile
              </button>
            </div>
          )}
        </div>
        <span className="font-main text-message mr-5 ml-5 text-sm">{message}</span>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
