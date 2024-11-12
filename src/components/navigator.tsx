"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigator() {
  const pathname = usePathname();
  const pathArray = [
    { path: "/", name: "캔버스" },
    { path: "/posts", name: "박물관" },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <nav>
        <ul className="flex gap-8 text-lg font-medium">
          {pathArray.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`p-2 hover:text-blue-500 transition-colors ${
                  pathname === item.path
                    ? "text-blue-500 font-bold"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
