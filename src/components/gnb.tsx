import SocialLogin from "@/components/social-login";
import Navigator from "@/components/navigator";

export default function GNB() {
  return (
    <header className="flex fixed top-0 left-0 py-2 right-0 w-full bg-gray-100 z-10">
      <div className="flex items-center justify-between w-full  mx-auto px-4 max-w-[1200px] m-auto">
        <Navigator />
        <SocialLogin />
      </div>
    </header>
  );
}
