import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState('')
  const [valor, setValor] = useState()
  const [despesas, setDespesas] = useState([])
  const [entradas, setEntradas] = useState(0)
  const [saidas, setSaidas] = useState(0)
  const [saldo, setSaldo] = useState(0)
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    let totalEntradas = 0;
    let totalSaidas = 0;

    despesas.forEach((despesa) => {
      if (despesa.tipo === 'Credito') {
        totalEntradas += despesa.valor;
      } else {
        totalSaidas += despesa.valor;
      }
    });

    setEntradas(totalEntradas);
    setSaidas(totalSaidas);
  }, [despesas]);

  useEffect(() => {
    setSaldo(entradas - saidas);
  }, [entradas, saidas]);
  

  function sumbmitForm() {
    if (descricao.trim() === '' || tipo === '' || isNaN(parseFloat(valor))) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    const data = new Date().toLocaleDateString();
    if (editIndex !== null) {
      // Se editIndex não for nulo, significa que estamos editando uma despesa existente
      const newDespesas = [...despesas];
      newDespesas[editIndex] = {
        descricao,
        valor: parseFloat(valor),
        tipo,
        data
      };
      setDespesas(newDespesas);
      setEditIndex(null);
    } else {
      // Caso contrário, estamos adicionando uma nova despesa
      setDespesas([...despesas, {
        descricao,
        valor: parseFloat(valor),
        tipo,
        data
      }]);
    }
    setDescricao('');
    setValor('');
    setTipo('');
    setIsOpen(false);
  }

  function excluirDespesa(index) {
    const novasDespesas = [...despesas];
    novasDespesas.splice(index, 1);
    setDespesas(novasDespesas);
  }

   // Função para preencher os campos do modal com os dados da despesa em edição
   function editDespesa(index) {
    const despesa = despesas[index];
    setDescricao(despesa.descricao);
    setValor(despesa.valor.toString());
    setTipo(despesa.tipo);
    setEditIndex(index);
    setIsOpen(true);
  }

  return (
    <main className="min-h-screen bg-neutral-800">
      <ReactModal 
        isOpen={isOpen} 
        overlayClassName={"fixed inset-0 left-0 right-0 flex items-center justify-center bg-gray-700 bg-opacity-80"}
        className={"w-full max-w-lg bg-neutral-800 p-6 relative outline-none rounded"}>
        <button 
          className="absolute right-4 top-4"
          onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </button>
          <h2 className="text-3xl mb-4 text-white">Criar nova transação</h2>
            <label className="flex flex-col mb-2 text-white">
              Descrição
              <input type="text" className="py-2 px-3 mt-1 rounded text-black" placeholder="ex: Salario" value={descricao} onChange={(ev) => setDescricao(ev.target.value)}/>
            </label>
            <label className="flex flex-col mb-4 text-white">
              Valor
              <input className="py-2 px-3 mt-1 rounded text-black" type="number" min={0} placeholder="ex: 1200" value={valor} onChange={(ev) => setValor(ev.target.value)} />
              </label>
            <label className="text-white">Tipo</label>
              <div className="flex gap-4 mt-2">
                <button className={`flex-1 p-3 rounded ${tipo === 'Credito' ? 'bg-emerald-900 text-white' : 'bg-emerald-600 text-white'}`} onClick={() => setTipo('Credito')}>
                  Crédito
                </button>
                <button className={`flex-1 p-3 rounded ${tipo === 'Debito' ? 'bg-red-900 text-white' : 'bg-red-600 text-white'}`} onClick={() => setTipo('Debito')}>
                  Débito
                </button>
              </div>
              <div className="text-right">
              <button className="p-3 bg-blue-500 rounded text-white mt-5" onClick={() => sumbmitForm()}>
                Adicionar
              </button>
              </div>
      </ReactModal>
       <section className="h-60 bg-emerald-600 pt-8">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-white text-4xl font-semibold">Minhas Despesas</h1>
          <button className="flex items-center gap-2 rounded p-2 bg-emerald-500 text-white" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
            Nova Transação
          </button>
        </div>
       </section>
       <section className="max-w-5xl mx-auto">
        <div className="max-w-5xl mx-auto flex gap-5 h-28 -mt-[60px]">
          <div className="flex flex-col flex-1 bg-green-500 rounded p-3 justify-between">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl text-white font-semibold">Entradas</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <h1 className="text-white text-2xl font-semibold">
              R$ {entradas}
            </h1>
          </div>
          <div className="flex flex-col flex-1 bg-red-500 rounded p-3 justify-between">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl text-white font-semibold">Saidas</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <h1 className="text-white text-2xl font-semibold">
              R${saidas}
            </h1>
          </div>
          <div className="flex flex-col flex-1 bg-blue-500 rounded p-3 justify-between">
            <div className="flex justify-between items-center ">
                <h3 className="text-3xl font-semibold text-white">Saldo</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-yellow-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <h1 className="text-white text-2xl font-semibold">
              R${saldo}
            </h1>
          </div>
        </div>

        <table className="text-white max-w-5xl w-full mt-10 border-separate border-spacing-1 border-spacing-x-0">
          <thead className="text-left text-gray-300">
            <tr>
              <th className="px-3 py-4">Data</th>
              <th className="px-3 py-4">Descrição</th>
              <th className="px-3 py-4">Valor</th>
              <th className="px-3 py-4">Tipo</th>
              <th className="px-3 py-4">Excluir</th>
              <th className="py-4">Editar</th>
            </tr>
          </thead>
          <tbody className="text-gray-400">
          {despesas.map((item, index) => (
            <tr key={index} className="bg-neutral-700">
              <td className="px-3 py-4 rounded-l-lg">{item.data}</td>
              <td className="px-3 py-4">{item.descricao}</td>
              <td className="px-3 py-4">R${item.valor}</td>
              <td className={`px-3 py-4 font-semibold ${item.tipo === 'Credito' ? 'text-green-600' : 'text-red-600' }`}>{item.tipo}</td>
              <td className="px-5 pb-2">
              <button onClick={() => excluirDespesa(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 mt-3 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
              </td>
              <td className="px-3 pb-2 rounded-r-lg">
                <button onClick={() => editDespesa(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 mt-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
       </section>
    </main>
   
  );
}
