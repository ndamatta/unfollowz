import { Link } from "@/src/i18n/navigations";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-zinc-900">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-rose-500 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
