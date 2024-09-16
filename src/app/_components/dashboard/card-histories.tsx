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

export default function CardHistories({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tools.map((value, index) => (
        <CardHistory key={index} tool={value} />
      ))}
    </div>
  );
}

export function CardHistory({ tool }: { tool: Tool }) {
  return (
    <Link href={`/dashboard/history/${tool.id}`}>
      <Card className="group transition-colors duration-200 hover:bg-background/40">
        <CardHeader>
          <CardContent>
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
            {formatDistance(tool.createdAt, new Date())}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
