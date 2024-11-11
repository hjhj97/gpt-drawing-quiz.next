import SocialLogin from "@/components/social-login";
import Navigator from "@/components/navigator";

export default function GNB() {
  return (
    <header className="flex justify-between fixed top-0 left-0 pt-4 pb-2 right-0 w-full bg-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Navigator />
      </div>
      <SocialLogin />
    </header>
  );
}
