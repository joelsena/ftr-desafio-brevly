import {
  DownloadSimpleIcon,
  LinkIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import axios from "axios";
import * as z from "zod";

import { exportLinks, getLinks, postLink } from "../services/links";
import { InputGroup } from "../components/InputGroup";
import { LinkItem } from "../components/LinkItem";
import { Button } from "../components/Button";
import { useToast } from "../context/toast";
import Logo from "../assets/logo.svg";
import { twMerge } from "tailwind-merge";

const formSchema = z.object({
  originalUrl: z.url("Infome uma URL válida."),
  shortUrl: z
    .string("Url obrigatória")
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Informe uma url minúscula e sem espaço/caracter especial.",
    ),
});

type FormSchemaValues = z.infer<typeof formSchema>;

function Home() {
  const [isExporting, setIsExporting] = useState(false);

  const queryClient = useQueryClient();

  const { addToast } = useToast();

  const query = useQuery({ queryKey: ["links"], queryFn: getLinks });

  const postLinkMut = useMutation({
    mutationFn: postLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });

      addToast({
        title: "Link salvo",
        detail: "Link salvo com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError<{ message: string }>(error))
        addToast({
          title: "Erro no cadatro",
          detail: error.response?.data.message ?? "",
          type: "error",
        });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormSchemaValues) {
    const { originalUrl, shortUrl } = data;

    postLinkMut.mutate({ originalUrl, shortUrl });

    reset();
  }

  async function handleExport() {
    setIsExporting(true);
    const { publicUrl } = await exportLinks();
    setIsExporting(false);

    if (publicUrl) window.location.href = publicUrl;
  }

  return (
    <div className="flex flex-col pt-8 pb-2 sm:pt-22 text-gray-500 w-[min(1080px,100%)] mx-auto">
      <img className="mb-6 sm:mb-8 w-24 h-auto mx-auto sm:mx-0" src={Logo} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
        <div className="flex flex-col bg-gray-100 rounded-lg w-[min(380px,100%)] p-6 sm:p-8 gap-y-5 sm:gap-y-6 flex-none mb-auto">
          <p className="text-lg text-gray-600">Novo link</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputGroup
              label="Link original"
              placeholder="www.exemplo.com.br"
              error={errors.originalUrl?.message}
              {...register("originalUrl")}
            />

            <InputGroup
              label="Link encurtado"
              placeholder="brev.ly/"
              prefix="brev.ly/"
              error={errors.shortUrl?.message}
              {...register("shortUrl")}
            />

            <Button
              className="mt-2"
              type="submit"
              disabled={postLinkMut.isPending}
            >
              {postLinkMut.isPending ? "Salvando..." : "Salvar link"}
            </Button>
          </form>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 sm:p-8 mb-auto w-full relative">
          {query.isFetching && (
            <div className="w-full overflow-hidden absolute left-0 top-0 rounded-full">
              <motion.div
                className="h-1 w-1/3 bg-blue-base rounded-full"
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600">Meus links</p>

            <Button
              disabled={!query.data}
              className="flex items-center px-2.5 py-2"
              variant="secondary"
              onClick={handleExport}
            >
              {isExporting ? (
                <SpinnerIcon className="animate-spin mr-1.5" size={16} />
              ) : (
                <DownloadSimpleIcon className="mr-1.5" size={16} />
              )}
              <p className="font-semibold">Baixar CSV</p>
            </Button>
          </div>

          <span className="block h-px w-full bg-gray-200 my-4" />

          <div
            className={twMerge(
              "max-h-116 overflow-y-auto",
              "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-blue-base [&::-webkit-scrollbar-thumb:hover]:bg-blue-dark",
            )}
          >
            {query.data && query.data.length ? (
              <div className="flex flex-col">
                {query.data.map((link, idx) => (
                  <Fragment key={link.id}>
                    {idx > 0 && (
                      <span className="block h-px w-full bg-gray-200 my-4" />
                    )}
                    <LinkItem
                      id={link.id}
                      originalUrl={link.originalUrl}
                      shortUrl={link.shortUrl}
                      accessCount={link.accessCount}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-4">
                {query.isLoading ? (
                  <SpinnerIcon className="mb-3 animate-spin" size={32} />
                ) : (
                  <LinkIcon className="mb-3" size={32} />
                )}

                <p className="text-xs uppercase text-center">
                  {query.isLoading
                    ? "carregando links..."
                    : "ainda não existem links cadastrados"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
