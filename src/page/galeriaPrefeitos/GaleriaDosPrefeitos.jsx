import { LuCalendar, LuFileText, LuHistory, LuUser } from "react-icons/lu";
import CardPrefeito from "./CardPrefeito";

import neto from "/images/prefeitos/neto.jpg";
import pino from "/images/prefeitos/pino.jpg";
import gilvan from "/images/prefeitos/gilvan.jpg";
import lucio from "/images/prefeitos/lucio.jpg";
import gervasio from "/images/prefeitos/gervasio.jpg";

const GaleriaDosPrefeitos = () => {
  const gestores = [
    {
      periodo: "1993 – 1996",
      nome: "Luciano Rufino da Silva",
      cargo: "Gestor de Transição",
      tituloSecao: "A Transição e a Emancipação",
      descricao:
        "Embora Campestre tenha conquistado sua emancipação política apenas no final de 1994, o período de mandato vigente no Brasil na época era de 1993 a 1996. Como a cidade ainda era um distrito de Jacuípe nas eleições de 1992, Lúcio Rufino atuou como o administrador provisório (ou gestor de transição). Seu papel histórico foi fundamental: ele estruturou a máquina administrativa primária do recém-criado município, preparando o terreno legal e burocrático para que Campestre pudesse realizar sua primeira eleição oficial para prefeito em 1996.",
      fontes:
        "Dados baseados nas leis estaduais de emancipação política de Alagoas (década de 90) e no rito padrão do Tribunal Superior Eleitoral (TSE) para a criação de novos municípios.",
      tituloBiografia: "O Gestor Pioneiro",
      biografia:
        "Figura central na fase embrionária do município, Lúcio Rufino tem sua trajetória intimamente ligada ao processo de independência de Campestre. Antes mesmo da cidade ter a chance de eleger seu primeiro representante pelas urnas, ele assumiu a responsabilidade de ser o administrador provisório (1993-1996) após a emancipação do município-mãe, Jacuípe. Sua biografia pública é a de um desbravador administrativo: foi ele quem organizou a papelada inicial, estruturou os primeiros serviços essenciais e preparou legalmente a cidade para existir como um município autônomo no mapa de Alagoas.",
      foto: lucio,
    },
    {
      periodo: "1997 – 2004",
      nome: "Gervásio de Oliveira Lins",
      cargo: "Primeiro Prefeito Eleito",
      tituloSecao: "O Primeiro Prefeito e o 'Prefeito Construtor'",
      descricao:
        "Gervásio Lins foi um dos grandes articuladores da independência de Campestre e teve a honra de ser eleito o primeiro prefeito da cidade em 1996, sendo reeleito nas eleições do ano 2000. Sua transição marcou o início de Campestre como uma cidade de fato, com autonomia financeira e administrativa. Ele ficou eternizado na memória local como o 'prefeito construtor', pois sua gestão foi responsável por tirar as primeiras grandes obras do papel, como a implantação da subestação de energia elétrica, o campo de futebol e o prédio da primeira Câmara de Vereadores.",
      fontes:
        "Registros históricos regionais e obituários oficiais publicados em portais de notícias de Alagoas (como Tribuna do Sertão, Francês News e Portal JG Notícias) em março de 2026, que resgataram toda a sua biografia após seu falecimento.",
      tituloBiografia: "O Construtor de Campestre (1997–2004)",
      biografia:
        "Patriarca de uma das famílias mais tradicionais da região e um dos maiores líderes do movimento emancipacionista. Gervásio Lins gravou seu nome na história ao ser o primeiro prefeito democraticamente eleito de Campestre (1996), alcançando também a primeira reeleição (2000). Sua biografia é marcada pelo perfil de 'fazedor de obras'. Transformou um recém-criado município em uma cidade de fato, liderando construções fundamentais como a primeira Câmara Municipal, o estádio de futebol e a subestação de energia. Faleceu em março de 2026, aos 85 anos, sendo reverenciado por todos os lados políticos como o grande construtor da fundação de Campestre",
      foto: gervasio,
    },
    {
      periodo: "2005 – 2008",
      nome: "Luciano Rufino da Silva",
      cargo: "Ex-Prefeito",
      tituloSecao: "A Consolidação Administrativa",
      descricao:
        "Eleito em 2004, Luciano Rufino sucedeu o mandato duplo de Gervásio Lins. A transição para o seu governo representou a primeira troca de poder pelo voto direto na história do município já estruturado. Seu mandato focou na consolidação dos serviços públicos e na ampliação de convênios federais, necessários para a manutenção da infraestrutura criada na década anterior.",
      fontes:
        "Repositório de dados eleitorais do Tribunal Superior Eleitoral (TSE) referente ao pleito municipal de 2004.",
      tituloBiografia: "O Articulador da Consolidação (2005–2008)",
      biografia:
        "Eleito em 2004, Luciano Rufino inaugurou a primeira alternância de poder via voto direto na jovem história da cidade. Sua biografia política é marcada por um perfil mais voltado à articulação institucional. Assumindo o município já com suas estruturas físicas básicas erguidas, seu foco foi a organização da máquina pública e a busca por convênios e parcerias em Brasília. Seu mandato foi o elo entre a fundação da cidade e a sua modernização administrativa, garantindo que os serviços públicos continuassem a funcionar na primeira década dos anos 2000.",
      foto: lucio,
    },
    {
      periodo: "2009 – 2016",
      nome: "Amaro Gilvan de Carvalho e Gilmar de Oliveira Lins",
      cargo: "Ex-Prefeito & Vice-Prefeito Interino",
      tituloSecao: "Dois Mandatos e a Intervenção Judicial",
      descricao:
        "Amaro Gilvan (conhecido como Gilvan Cabeção) venceu as eleições de 2008 e foi reeleito em 2012, permanecendo no cargo até 2016. No entanto, o último ano de sua gestão marcou a transição mais turbulenta da história do município. Em 31 de março de 2016, a Justiça de Alagoas determinou o afastamento de Gilvan do cargo devido a investigações do Ministério Público sobre irregularidades administrativas e contratações ilegais. No dia 1º de abril de 2016, o vice-prefeito, Gilmar de Oliveira Lins, assumiu o comando do executivo de forma interina. Durante seus meses de gestão, Gilmar chegou a decretar estado de emergência para reorganizar a prefeitura. No final do ano, Gilvan conseguiu uma liminar e retornou ao cargo a tempo de concluir os últimos dias de mandato.",
      fontes:
        "Arquivos do portal G1 Alagoas (matérias 'Juiz afasta prefeito de Campestre por contratações irregulares de servidores' de 31/03/2016 e 'Campestre volta a decretar estado de emergência...' de julho de 2016), além de registros do Tribunal de Contas da União (TCU).",
      tituloBiografia: "O Gestor Longevo (2009–2016)",
      biografia:
        "Uma das figuras políticas mais duradouras do executivo municipal, Gilvan alcançou o notável feito de vencer duas eleições consecutivas (2008 e 2012). Sua trajetória é de forte apelo popular inicial, mantendo o comando da prefeitura por praticamente oito anos ininterruptos. Sua biografia, no entanto, também é marcada por resiliência e forte judicialização: enfrentou um duro processo de afastamento no último ano de seu mandato (2016), lutou nos tribunais para provar sua capacidade de gestão e conseguiu retomar o cargo nos meses finais para concluir legalmente seu ciclo na prefeitura.",
      tituloBiografia2: "O Prefeito das Crises (2016 - Interino)",
      biografia2:
        "Vice-prefeito eleito na chapa de 2012, Gilmar de Oliveira Lins teve uma passagem breve, porém das mais desafiadoras pelo cargo de prefeito. Sua biografia no executivo ocorreu sob o signo da emergência. Assumindo a prefeitura no dia 1º de abril de 2016 por determinação judicial, ele atuou como um 'gestor de crises'. Precisou decretar estado de emergência administrativa para reorganizar as contas e os serviços do município em meio a um dos períodos de maior instabilidade política e financeira da história recente de Campestre.",
      foto: gilvan,
    },
    {
      periodo: "2017 – 2024",
      nome: "Nielson Mendes da Silva (Pino)",
      cargo: "Ex-Prefeito",
      tituloSecao: "Estabilização e Aprovação Histórica",
      descricao:
        "Pino assumiu a prefeitura em janeiro de 2017, recebendo o município após o instável e politicamente agitado ano de 2016. Sua transição foi pautada por um forte trabalho de estabilização das contas públicas e retomada do desenvolvimento. Com entregas nas áreas de moradia, pavimentação e saúde, a gestão alcançou uma popularidade inédita na cidade, o que culminou em uma reeleição tranquila em 2020. Ele governou por oito anos e preparou a cidade para a sucessão aliada.",
      fontes:
        "Resultados de apuração das eleições de 2016 e 2020 via Tribunal Superior Eleitoral (TSE) e cobertura jornalística do portal Gazetaweb sobre o cenário político da Região Norte de Alagoas.",
      tituloBiografia: "O Pacificador e Desenvolvedor (2017–2024)",
      biografia:
        "Empresário e político com notável capacidade de articulação, Pino assumiu a prefeitura em 2017 com a missão de apaziguar a cidade após as turbulências de 2016. Sua biografia política é definida por recordes de aprovação. Com um perfil de liderança focado em estabilidade, pavimentação urbana, saúde e entrega de moradias, ele conquistou a confiança da população em níveis históricos. Esse forte reconhecimento transformou-se em uma reeleição arrasadora em 2020, com mais de 70% dos votos, consolidando-o como a principal força política da cidade na década de 2020.",
      foto: pino,
    },
    {
      periodo: "2025 – Atualidade",
      nome: "Nelson Mendes da Silva Neto (Neto de Pino)",
      cargo: "Prefeito Atual",
      tituloSecao: "Renovação e Continuidade",
      descricao:
        "A mais recente transição política do município ocorreu de forma contínua, com a eleição de Neto de Pino em 2024. Apoiado pelo antecessor, sua posse em 2025 foi um marco não apenas local, mas regional: assumindo o executivo com expressivos 68,87% dos votos, ele se tornou o prefeito mais jovem de toda a Região Norte de Alagoas. Seu governo representa a promessa de modernização, aliada à continuidade dos projetos da gestão anterior.",
      fontes: "Divulgação de Resultados do TSE (Eleições Municipais de 2024).",
      tituloBiografia: "A Nova Geração (2025–Atualidade)",
      biografia:
        "Representante da renovação política no estado de Alagoas. Neto de Pino entrou para a biografia oficial de Campestre ao vencer as eleições de 2024 com 68,87% dos votos. Aos 27 anos, fez história como o prefeito mais jovem eleito em toda a Região Norte do estado. Seu perfil une a energia da juventude ao peso do legado político de seu antecessor e familiar, Pino. Seu mandato, iniciado em 2025, representa a promessa de continuidade do desenvolvimento urbano, alinhada à modernização administrativa que a nova geração exige",
      foto: neto,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* CABEÇALHO DA PÁGINA */}
      <div className=" pb-2">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">Galeria dos Gestores</h1>
        </div>
        <p className="text-sm text-zinc-500 ml-1">
          Um resgate histórico valioso da transição administrativa e do papel político de cada gestor do município de
          Campestre.
        </p>
      </div>

      {/* LINHA DO TEMPO */}
      <div className="relative border-l border-zinc-200 pl-6 ml-4 md:ml-8 space-y-10">
        {gestores.map((item, index) => {
          const isAtual = item.periodo.includes("Atualidade");

          return (
            <div key={index} className="relative group">
              {/* Ponto na Linha do Tempo */}
              <div
                className={`absolute -left-[35px] top-1.5 rounded-full w-4 h-4 border-4 border-white ring-4 transition-all ${
                  isAtual ? "bg-emerald-500 ring-emerald-50" : "bg-blue-600 ring-blue-50 group-hover:bg-blue-700"
                }`}
              />

              {/* CARD HISTÓRICO - Passando as props corretamente */}
              <CardPrefeito item={item} isAtual={isAtual} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GaleriaDosPrefeitos;
