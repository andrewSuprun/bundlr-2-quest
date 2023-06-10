import React from 'react';
import Publication from '../components/Publication';
import { useActiveProfile, useWalletLogin, useFeed } from '@lens-protocol/react';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import ProfileSwitcher from '../components/ProfileSwitcher';
import { SiSpringCreators } from 'react-icons/si';

const ContentFeedPage = () => {
  const { data: activeProfile, loading: profileLoading } = useActiveProfile();
  const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const { isConnected } = useAccount();

  const { data: feed, loading, hasMore, next } = useFeed({
    profileId: activeProfile?.id,
    limit: 10,
  });

  return (
    <div className="flex flex-col w-3/6 bg-background px-5 bg-white">
      {!isConnected && (
        <div className="flex flex-col items-center mt-10">
          <span className="flex justify-start font-logo text-2xl mb-3">
            Welcome to:
          </span>
          <div className="flex justify-center items-center font-logo text-6xl mb-3">
            <SiSpringCreators className="mr-2" /> OnlyBundlr
          </div>
          <LoginButton />
        </div>
      )}
      {!activeProfile && (
        <div className="font-main self-center mt-10 text-xl">
          You don't have an active profile, please{' '}
          <a href="/edit-profile" className="underline">
            create one
          </a>
        </div>
      )}
      {isConnected && activeProfile && (
        <div>
          <ProfileSwitcher showCreateNew={false} />

          {!feed || (feed.length === 0 && (
            <div className="font-main self-center mt-10 text-xl">
              Your feed appears to be empty, try following more accounts
            </div>
          ))}
          {feed &&
            feed.map((publication, id) => (
              <Publication
                key={publication.root.id}
                content={publication.root.metadata?.content}
                description={publication.root.metadata?.description}
                media={publication.root.metadata?.media}
                publisher={publication.root.profile}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ContentFeedPage;
