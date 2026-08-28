import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

import { deleteLink } from "../services/links";
import { Button } from "./Button";
import { env } from "../env";

interface LinkProps {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  className?: string;
}

export function LinkItem({
  id,
  originalUrl,
  shortUrl,
  accessCount,
  className,
}: LinkProps) {
  const queryClient = useQueryClient();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${env.VITE_FRONTEND_URL}/${shortUrl}`,
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  async function handleDeleteLink() {
    const confirmed = window.confirm(
      `Você realmente quer apagar o link ${shortUrl}?`,
    );

    if (confirmed) {
      await deleteLink(id);
      queryClient.invalidateQueries({ queryKey: ["links"] });
    }
  }

  return (
    <div
      className={twMerge(
        "flex justify-between items-center text-sm text-gray-500",
        className,
      )}
    >
      <div>
        <a
          className="text-md text-blue-base"
          href={`/${shortUrl}`}
          target="_blank"
          rel="noreferer noopener"
        >
          {env.VITE_FRONTEND_URL}/{shortUrl}
        </a>
        <p>{originalUrl}</p>
      </div>

      <div className="flex items-center gap-5">
        <p>{accessCount} acessos</p>

        <div className="flex gap-1 items-center">
          <Button className="p-2" variant="secondary" onClick={handleCopy}>
            <CopyIcon size={16} weight="bold" />
          </Button>

          <Button
            className="p-2"
            variant="secondary"
            onClick={handleDeleteLink}
          >
            <TrashIcon size={16} weight="bold" />
          </Button>
        </div>
      </div>
    </div>
  );
}
