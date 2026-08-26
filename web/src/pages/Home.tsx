import { LinkIcon } from "@phosphor-icons/react";

import Logo from "../assets/logo.svg";

function Home() {
  return (
    <div className="flex flex-col flex-1 pt-8 sm:pt-22 text-gray-500">
      <img className="mb-6 sm:mb-8 w-24 h-auto mx-auto" src={Logo} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 flex-none">
        <div className="flex flex-col bg-gray-100 rounded-lg w-[min(380px,100%)] p-6 sm:p-8 gap-y-5 mb-auto">
          <p className="text-lg text-gray-600">Novo link</p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <small className="text-xs uppercase">Link Original</small>
              <input placeholder="www.exemplo.com.br" />
            </div>

            <div className="flex flex-col">
              <small className="text-xs uppercase">Link encurtado</small>
              <input placeholder="brev.ly/" />
            </div>
          </div>

          <button className="mt-5">Salvar link</button>
        </div>

        <div className="bg-gray-100 rounded-lg w-[min(580px,100%)] p-6 sm:p-8 mb-auto">
          <div className="flex justify-between">
            <p className="text-lg text-gray-600">Meus links</p>

            <button>Baixar CSV</button>
          </div>

          <span className="block h-px w-full bg-gray-200 my-4" />

          <div className="flex flex-col justify-center items-center">
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
