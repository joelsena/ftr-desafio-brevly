import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import LogoIcon from "../assets/logo_icon.svg";
import { getLink } from "../services/links";

export default function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["link"],
    queryFn: async () => getLink(shortUrl!),
  });

  if (query.isSuccess && query.data.originalUrl) {
    queryClient.invalidateQueries({ queryKey: ["links"] });
    window.location.href = query.data.originalUrl;
  } else {
    window.location.href = "/not/found";
  }

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-[min(580px,100%)] bg-gray-100 py-12 px-5 sm:py-16 sm:px-12 rounded-lg mt-44 mb-auto flex flex-col items-center gap-y-6">
        <img className="w-12 h-auto" src={LogoIcon} />
        <p className="text-xl text-gray-600 text-center">Redirecionando...</p>

        <div>
          <p className="text-md text-gray-500 text-center">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-md text-gray-500 text-center">
            Não foi redirecionado?{" "}
            <a href="/" className="text-blue-base underline">
              Acesse aqui{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
