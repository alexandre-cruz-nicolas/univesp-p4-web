import React, { useState } from "react";
import ReactModal from 'react-modal';
import {MultiCheckBox , About, BotaoTopo } from './components/compomentes';
import { TfiInfoAlt, TfiBarChart } from "react-icons/tfi";
import { Chart } from "react-google-charts";
import './App.css';

import jEstacoes from './data/estacoes.json';
import jMedicoes from './data/medicoes.json';
import jAnos from './data/anos.json';
import jMeses from './data/meses.json';

import logo from './assets/logo-smarteye-72.png';

function App() {
  const [ mesesChecked , setMesesChecked ] = useState([]);
  const [ anosChecked , setAnosChecked ] = useState([]);
  const [ estacoesChecked , setEstacoesChecked ] = useState([]);
  const [ isOpenAbout, setIsOpenAbout ] = useState(false);
  function abrirAbout() {
    setIsOpenAbout(true);
  }

  function fecharAbout() {
   setIsOpenAbout(false);
  }

  function clicouMeses(id) {
    let aNovo = [...mesesChecked];
    const indice = aNovo.indexOf(id);
    if(indice>-1){ aNovo.splice(indice,1)}
    else {aNovo.push(id)};
    setMesesChecked(aNovo);
  }

  function clicouTodosMeses() {
    const aNovo = jMeses.map((x) => x.key);
    setMesesChecked(aNovo);
    console.log(mesesChecked);
  }

  function clicouAnos(id) {
    let aNovo = [...anosChecked];
    const indice = aNovo.indexOf(id);
    if(indice>-1){ aNovo.splice(indice,1)}
    else {aNovo.push(id)};
    setAnosChecked(aNovo);
  }

  function clicouTodasEstacoes() {
    const aNovo = jEstacoes.map((x) => x.ano);
    setEstacoesChecked(aNovo);
    console.log(estacoesChecked);
  }

  function clicouEstacoes(id) {
    let aNovo = [...estacoesChecked];
    const indice = aNovo.indexOf(id);
    if(indice>-1){ aNovo.splice(indice,1)}
    else {aNovo.push(id)};
    setEstacoesChecked(aNovo);
  }

  function clicouTodosAnos() {
    const aNovo = jAnos.map((x) => x.ano);
    setAnosChecked(aNovo);
    console.log(anosChecked);
  }

  return (
    <div>
      <div className="App-top">
          <img src={logo} height="70px"/>
          <BotaoTopo icone={<TfiBarChart />} title="Gerar gráfico"/>
          <BotaoTopo icone={<TfiInfoAlt />} onClick={abrirAbout} title="Sobre o projeto"/>
      </div>
    <div id="page-home">


      <ReactModal 
              className="App-modal"
              overlayClassName="App-modal-overlay"
              isOpen={isOpenAbout}
              onRequestClose={fecharAbout}
              contentLabel="Modal de exemplo"
              closeTimeoutMS={200}
          >   
            <About close={fecharAbout} />
      </ReactModal>
     
      
      <div className="App-left">
        <MultiCheckBox caption="Anos"
                     options={jAnos}
                     label="ano"
                     id="ano"
                     width="90%"
                     onClick={clicouAnos}
                     onClickAll={clicouTodosAnos}
        />
        <MultiCheckBox caption="Meses"
                     options={jMeses}
                     label="mes"
                     id="key"
                     width="90%"
                     onClick={clicouMeses}
                     onClickAll={clicouTodosMeses}
        />
        <MultiCheckBox caption="Estações"
                     options={jEstacoes}
                     label="descricao"
                     id="id"
                     width="90%"
                     optionsFontSize="8px"
                     onClick={clicouEstacoes}
                     onClickAll={clicouTodasEstacoes}
        />
      </div>
      <div className="App-miolo">
          <div></div>
      </div>
    </div>
    </div>
  );
}

export default App;
