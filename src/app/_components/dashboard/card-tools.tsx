import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { type Tool } from "@prisma/client";
import { formatDistance } from "date-fns";

export default function CardTools({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tools.map((value, index) => (
        <CardTool key={index} tool={value} />
      ))}
    </div>
  );
}

export function CardTool({ tool }: { tool: Tool }) {
  return (
    <Link href={`/dashboard/tools/${tool.id}`}>
      <Card className="group transition-colors duration-200 hover:bg-background/40">
        <CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image
              src={"/tool.png"}
              alt="Tool Image"
              width={200}
              height={200}
            />
          </CardContent>
          <CardTitle className="transition-colors duration-200 group-hover:text-blue-500">
            {tool.name}
          </CardTitle>
          <CardDescription>
            {formatDistance(tool.createdAt, new Date(), { addSuffix: true })}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
