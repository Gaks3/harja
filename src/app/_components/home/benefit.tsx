import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type Props = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
};

export default function Benefit({ Icon, title, description }: Props) {
  return (
    <div className={"flex gap-3"}>
      <div>
        <Icon size={36} />
      </div>
      <div className="mt-1 space-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
