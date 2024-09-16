import CreateToolForm from "../create-tool-form";

export default function EmptyTool() {
  return (
    <div className="flex h-auto min-h-full flex-1 flex-col items-center justify-center space-y-2">
      <h2 className="text-2xl font-bold">Start by creating your first tool</h2>
      <p className="max-w-80 text-center">
        Set up your dashboard by starting with your first tool. Explore and
        innovate with your new creation.
      </p>
      <CreateToolForm />
    </div>
  );
}
