// hooks
import { useClients } from "../../hooks/useClients";

const Clients = () => {
  const { clients, loading } = useClients();

  return (
    <div>
      {loading ? (
        <div className="p-5 text-center">Carregando...</div>
      ) : clients.length === 0 ? (
        <div className="p-5 text-center">Nenhum cliente encontrado</div>
      ) : (
        <div>
          <table>
            {/* Cabeçario */}
            <thead>
              <tr>
                {Object.keys(clients[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            {/* Corpo */}
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  {/* Tranformo o objeto com os dados em Array */}
                  {Object.values(client).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clients;
