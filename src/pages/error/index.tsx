import { SOMETHING_WENT_WRONG } from "../../constant/appConstant";

type ErrorPageProps = {
  error: string;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] bg-gray-100 text-center px-4">
      <h2 className="text-red-600 font-bold text-xl mb-2">
        {SOMETHING_WENT_WRONG}
      </h2>
      <p className="text-gray-600 text-sm">
        {error || "Unexpected error occurred."}
      </p>
    </div>
  );
}
