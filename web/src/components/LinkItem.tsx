import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

import { deleteLink } from "../services/links";
import { Button } from "./Button";
import { useToast } from "../context/toast";

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

  const { addToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.host}/${shortUrl}`,
      );

      addToast({
        title: "Link copiado com sucesso",
        detail: `O link "${shortUrl}" foi copiado para a área de transferência.`,
        type: "info",
      });
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
        "flex justify-between items-center text-sm text-gray-500 gap-2",
        className,
      )}
    >
      <div>
        <a
          className="block text-md text-blue-base w-35 sm:w-auto truncate"
          href={`/${shortUrl}`}
          target="_blank"
          rel="noreferer noopener"
        >
          {window.location.host}/{shortUrl}
        </a>
        <p className="w-35 sm:w-auto truncate">{originalUrl}</p>
      </div>

      <div className="flex items-center gap-5 flex-none">
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
