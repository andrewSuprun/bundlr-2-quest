import React, { useState, useEffect } from 'react';
import { useProfile } from '@lens-protocol/react';

const SuggestedProfile = ({ handle }) => {
  const { data: profile, loading } = useProfile({ handle });
  const [profilePicture, setProfilePicture] = useState('');
  const [coverPicture, setCoverPicture] = useState('');

  useEffect(() => {
    if (profile) {
      setProfilePicture(profile.picture?.original.url);
      setCoverPicture(profile.coverPicture?.original.url);
      console.log(profile);
    }
  }, [loading]);

  return (
    <div className="relative" key={profile?.id}>
      {coverPicture && (
        <img
          className="rounded-lg w-full h-40 object-cover px-1 py-1"
          src={coverPicture}
          alt="Cover Picture"
        />
      )}

      <div className="bg-white rounded-lg shadow-lg mt-2">
        <div className="p-4 flex items-center">
          {profilePicture && (
            <div className="w-12 h-12 overflow-hidden rounded-full mr-4">
              <img
                className="h-full w-full object-cover"
                src={profilePicture}
                alt={handle}
              />
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-1">
              <a href={`/${handle}`} className="hover:underline">
                {handle}
              </a>
            </h2>
            <p className="text-gray-600 text-sm">Followers: {profile?.followers || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedProfile;
