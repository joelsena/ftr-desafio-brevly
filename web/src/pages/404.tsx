import I404 from "../assets/404.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-[min(580px,100%)] bg-gray-100 py-12 px-5 sm:py-16 sm:px-12 rounded-lg mt-44 mb-auto flex flex-col items-center gap-y-6">
        <img className="w-41 h-auto" src={I404} />
        <p className="text-xl text-gray-600 text-center">Link não encontrado</p>
        <p className="text-md text-gray-500 text-center">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <a href="/" className="text-blue-base underline">
            brev.ly
          </a>
          .
        </p>
      </div>
    </div>
  );
}
