import { createContext, useContext } from "react";

const ProfileContext = createContext();

function ProfileProvider(props) {
  return <ProfileContext.Provider {...props} />;
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (!context || context === undefined) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}

export { ProfileContext, ProfileProvider, useProfile };
