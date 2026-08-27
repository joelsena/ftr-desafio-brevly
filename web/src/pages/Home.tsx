import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { InputGroup } from "../components/InputGroup";

function Home() {
  return (
    <div className="flex flex-col flex-1 pt-8 sm:pt-22 text-gray-500">
      <img className="mb-6 sm:mb-8 w-24 h-auto mx-auto" src={Logo} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 flex-none">
        <div className="flex flex-col bg-gray-100 rounded-lg w-[min(380px,100%)] p-6 sm:p-8 gap-y-5 sm:gap-y-6 mb-auto">
          <p className="text-lg text-gray-600">Novo link</p>

          <div className="flex flex-col gap-4">
            <InputGroup
              label="Link original"
              placeholder="www.exemplo.com.br"
            />

            <InputGroup label="Link encurtado" placeholder="brev.ly/" />
          </div>

          <Button>Salvar link</Button>
        </div>

        <div className="bg-gray-100 rounded-lg w-[min(580px,100%)] p-6 sm:p-8 mb-auto">
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600">Meus links</p>

            <Button
              disabled
              className="flex items-center px-2.5 py-2"
              variant="secondary"
            >
              <DownloadSimpleIcon className="mr-1.5" size={16} />
              <p className="font-semibold">Baixar CSV</p>
            </Button>
          </div>

          <span className="block h-px w-full bg-gray-200 my-4" />

          <div className="flex flex-col justify-center items-center py-4">
            <LinkIcon className="mb-3" size={32} />

            <p className="text-xs uppercase text-center">
              ainda não existem links cadastrados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
