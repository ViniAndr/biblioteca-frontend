import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

// Ícones minimalistas para formalidade
import { LuDownload, LuFileText, LuMapPin, LuMail } from "react-icons/lu";

// IMPORTANTE: Importe o brasão do município aqui se tiver
// import brasaoMunicipio from "../../../assets/brasao_municipio.png";

const RelatorioFormal = () => {
  const componenteRef = useRef();
  const [carregandoPDF, setCarregandoPDF] = useState(false);

  const gerarPDF = () => {
    setCarregandoPDF(true);
    const elemento = componenteRef.current;

    // Configurações para um PDF Formal e de Alta Qualidade
    const opcoes = {
      margin: [8, 10, 15, 10], // top, left, bottom, right (em mm)
      filename: `relatorio_oficial_acervo_campestre_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opcoes)
      .from(elemento)
      .save()
      .finally(() => setCarregandoPDF(false));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-zinc-50 min-h-screen">
      {/* --- BARRA DE AÇÕES --- */}
      <div className="w-full max-w-[210mm] flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex items-center gap-3">
          <LuFileText className="w-6 h-6 text-zinc-500" />
          <div>
            <h2 className="font-semibold text-lg text-zinc-800">Visualização do Relatório Formal</h2>
            <p className="text-sm text-zinc-500">Confira a versão final para exportação em PDF A4.</p>
          </div>
        </div>
        <button
          onClick={gerarPDF}
          disabled={carregandoPDF}
          className="flex items-center gap-2.5 bg-zinc-800 hover:bg-zinc-950 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70"
        >
          {carregandoPDF ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Gerando...
            </>
          ) : (
            <>
              <LuDownload className="w-5 h-5" />
              Exportar PDF Oficial
            </>
          )}
        </button>
      </div>

      {/* --- A "FOLHA A4" OFICIAL --- */}
      <div className="overflow-x-auto w-full flex justify-center pb-12">
        <div
          ref={componenteRef}
          className="bg-white shadow-xl"
          style={{ width: "210mm", minHeight: "297mm", fontFamily: "serif" }}
        >
          <style>
            {`
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                }
                .relatorio-formal {
                  margin: 0;
                  padding: 0;
                }
                .page-footer {
                  position: fixed;
                  bottom: 0;
                  width: 100%;
                }
                main {
                  padding-bottom: 25mm;
                }
              }
            `}
          </style>

          <div className="relatorio-formal text-zinc-900 leading-normal p-[10mm] flex flex-col min-h-[297mm]">
            {/* CABEÇALHO FIXO */}
            <header className="flex justify-between items-start border-b border-zinc-300 pb-5 mb-8">
              <div className="flex items-center gap-4">
                {/* Se não tiver a imagem ainda, comente a tag <img> abaixo para não quebrar a tela */}
                {/* <img src={brasaoMunicipio} alt="Brasão de Campestre" className="w-16 h-16 object-contain" /> */}
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center text-xs text-zinc-500 border border-zinc-300">
                  Logo
                </div>
                <div>
                  <h1 className="text-xl font-semibold uppercase tracking-wide">ESTADO DE ALAGOAS</h1>
                  <h2 className="text-lg font-medium text-zinc-800">Prefeitura Municipal de Campestre</h2>
                  <p className="text-sm text-zinc-600 mt-1">Biblioteca Pública Municipal</p>
                </div>
              </div>
              <div className="text-right text-xs text-zinc-500">
                <p>Relatório Oficial #BM0192</p>
                <p>Gerado em: {new Date().toLocaleDateString("pt-BR")}</p>
                <p>Município de Campestre - AL</p>
              </div>
            </header>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="space-y-10 flex-1">
              <div className="text-center">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-zinc-950">
                  Relatório Consolidado de Acervo e Patrimônio
                </h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Dados acumulados até o período: {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>

              <section>
                <h4 className="text-lg font-bold border-b border-zinc-300 pb-2 mb-5 uppercase text-zinc-900 tracking-wide">
                  I. Resumo Geral do Acervo
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-md">
                    <p className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">
                      Total de Títulos (Catálogo)
                    </p>
                    <p className="text-4xl font-bold mt-1 text-zinc-950">1.245</p>
                    <p className="text-xs text-zinc-400 mt-1">Títulos únicos registrados</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-md">
                    <p className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">
                      Total de Exemplares Físicos (Patrimônio)
                    </p>
                    <p className="text-4xl font-bold mt-1 text-zinc-950">3.890</p>
                    <p className="text-xs text-zinc-400 mt-1">Soma de todas as cópias físicas</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold border-b border-zinc-300 pb-2 mb-5 uppercase text-zinc-900 tracking-wide">
                  II. Distribuição do Acervo por Autores (Top 5)
                </h4>
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 border border-zinc-300 bg-zinc-100 font-semibold text-zinc-800">#</th>
                      <th className="p-3 border border-zinc-300 bg-zinc-100 font-semibold text-zinc-800">Autor</th>
                      <th className="p-3 border border-zinc-300 bg-zinc-100 font-semibold text-zinc-800">Títulos</th>
                      <th className="p-3 border border-zinc-300 bg-zinc-100 font-semibold text-zinc-800">Exemplares</th>
                      <th className="p-3 border border-zinc-300 bg-zinc-100 font-semibold text-zinc-800">
                        % Representação (Ex.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3 border border-zinc-200">1</td>
                      <td className="p-3 border border-zinc-200 font-medium">Machado de Assis</td>
                      <td className="p-3 border border-zinc-200">45</td>
                      <td className="p-3 border border-zinc-200">135</td>
                      <td className="p-3 border border-zinc-200">12%</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3 border border-zinc-200">2</td>
                      <td className="p-3 border border-zinc-200 font-medium">Monteiro Lobato</td>
                      <td className="p-3 border border-zinc-200">38</td>
                      <td className="p-3 border border-zinc-200">114</td>
                      <td className="p-3 border border-zinc-200">10%</td>
                    </tr>
                    <tr className="bg-zinc-100 font-medium">
                      <td className="p-3 border border-zinc-300" colSpan={3}>
                        Outros Autores
                      </td>
                      <td className="p-3 border border-zinc-300">800</td>
                      <td className="p-3 border border-zinc-300">78%</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </main>

            {/* RODAPÉ FIXO */}
            <footer className="page-footer mt-auto pt-8 border-t-2 border-zinc-800 text-center text-xs text-zinc-500">
              <div className="flex justify-center gap-6 mb-3 text-sm">
                <p className="flex items-center gap-1.5">
                  <LuMapPin className="text-zinc-400" /> Rua Princesa Isabel, 50 - Centro
                </p>
                <p className="flex items-center gap-1.5">
                  <LuMail className="text-zinc-400" /> contato@campestre.al.gov.br
                </p>
              </div>
              <p className="uppercase font-semibold text-zinc-600">Município de Campestre - ESTADO DE ALAGOAS</p>
              <p className="text-xs text-zinc-400 mt-1">
                Este documento tem caráter exclusivamente informativo e patrimonial.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioFormal;
