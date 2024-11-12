import Canvas from "@/components/canvas";

import { GoogleSessionProvider } from "@/context/google-session-context";

export default function Home() {
  return (
    <GoogleSessionProvider>
      <div className="mt-8">
        <Canvas />
      </div>
    </GoogleSessionProvider>
  );
}
