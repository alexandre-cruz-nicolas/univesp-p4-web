import React, { useState, Alert } from "react";
import ReactModal from 'react-modal';
import {MultiCheckBox , About, BotaoTopo } from './components/compomentes';
import { TfiInfoAlt, TfiBarChart } from "react-icons/tfi";
import { Chart } from "react-google-charts";
import './App.css';

import jEstacoes from './data/estacoes.json';
import jMinMaxT from './data/minmaxt.json';
import jMediaT from './data/mediat.json';
import jAnos from './data/anos.json';
import jMeses from './data/meses.json';

import logo from './assets/logo-smarteye-72.png';

function App() {
  const [ mesesChecked , setMesesChecked ] = useState([]);
  const [ anosChecked , setAnosChecked ] = useState([]);
  const [ estacoesChecked , setEstacoesChecked ] = useState([]);
  const [ isOpenAbout, setIsOpenAbout ] = useState(false);
  const [ showChart , setShowChart ] = useState(false);

  function abrirAbout() {
    setIsOpenAbout(true);
  }

  function fecharAbout() {
   setIsOpenAbout(false);
  }

  function clicouAnos(aNovo) {
    let aNovoNovo = [...aNovo];
    setAnosChecked(aNovoNovo);
    setShowChart(false);
  }

  function clicouTodosAnos() {
    let todos = jAnos;
    const aVelho = [...anosChecked];
    let aNovo = [];
    if(todos.length !== aVelho.length) {
      aNovo = todos.map((x) => x.ano)
    }
    setAnosChecked(aNovo);
    setShowChart(false);
  }

  function clicouMeses(aNovo) {
    let aNovoNovo = [...aNovo];
    setMesesChecked(aNovoNovo);
    setShowChart(false);
  }

  function clicouTodosMeses() {
    let todos = jMeses;
    const aVelho = [...mesesChecked];
    let aNovo = [];
    if(todos.length !== aVelho.length) {
      aNovo = todos.map((x) => x.key)
    }
    setMesesChecked(aNovo);
    setShowChart(false);
  }

  function clicouEstacoes(aNovo) {
    let aNovoNovo = [...aNovo];
    setEstacoesChecked(aNovoNovo);
    setShowChart(false);
  }

  function clicouTodasEstacoes() {
    let todos = jEstacoes;
    const aVelho = [...estacoesChecked];
    let aNovo = [];
    if(todos.length !== aVelho.length) {
      aNovo = todos.map((x) => x.id)
    }
    setEstacoesChecked(aNovo);
    setShowChart(false);
  }

  const gerarGrafico = () =>{
    if(anosChecked.length===0) {
      alert("Escolha pelo menos 1 ano!");
    } else if(mesesChecked.length===0) {
      alert("Escolha pelo menos 1 mês!");
    } else if(estacoesChecked.length===0) {
      alert("Escolha pelo menos 1 estação medidora!");
    }
    else {
        setShowChart(!showChart);
    }
  }

  const MeusGraficos = () => {
    const filtro1 = jMinMaxT.filter((x) => estacoesChecked.includes(x.id) 
                                           && anosChecked.includes(x.Ano) 
                                           && mesesChecked.includes(x.Mes)
    );

    let data1 = [["ano/mês","menor Temp","maior Temp"]];
    filtro1.map((x) => {
      data1.push([x.Ano+'/'+x.Mes, x.tmin, x.tmax] );
    });

    const options1 = {
      title: "Temperaturas Ano/Mês",
      curveType: "function",
      legend: { position: "bottom" },
      is3D: true
    };

    const filtro2 = jMediaT.filter((x) => estacoesChecked.includes(x.id) 
                                          && anosChecked.includes(x.Ano) 
                                          && mesesChecked.includes(x.Mes)
    );
    console.log(estacoesChecked);
    console.log(filtro2);

    let aux1 = ["Ano"];
    let aux2 = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]
    mesesChecked.map((x) => aux1.push( aux2[x-1] ));
    let data2 = [];
    data2.push(aux1);
       
    anosChecked.map((x) => {
      let aux1 = [x];
      filtro2.map((z) => {
        if(z.Ano===x && mesesChecked.includes(z.Mes)) { aux1.push(z.Media)}
      });
      data2.push(aux1);
    });
    console.log(data2);

    const options2 = {
      title: "Temperaturas Médias Ano",
      subtitle: ""
    };
 
    return(
      <div className="chartRow">
        <Chart
          chartType="AreaChart"
          width="90vw"
          height="35vh"
         data={data1}
          options={options1}
          border="1px"
        />
        <Chart
          chartType="ColumnChart"
          width="90vw"
          height="35vh"
          data={data2}
          options={options2}
          border="1px"
    />
      </div>
    )
  }

  return (
    <div>
      <div className="App-top">
          <img src={logo} height="70px" alt="logotipo"/>
          <BotaoTopo icone={<TfiBarChart />} title="Gerar gráficos" onClick={gerarGrafico}/>
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
                     optionsSelected={anosChecked}
                     label="ano"
                     id="ano"
                     width="90%"
                     onClick={clicouAnos}
                     onClickAll={clicouTodosAnos}
        />
        <MultiCheckBox caption="Meses"
                     options={jMeses}
                     optionsSelected={mesesChecked}
                     label="mes"
                     id="key"
                     width="90%"
                     onClick={clicouMeses}
                     onClickAll={clicouTodosMeses}
        />
        <MultiCheckBox caption="Uma Estação"
                     options={jEstacoes}
                     optionsSelected={estacoesChecked}
                     label="descricao"
                     id="id"
                     width="90%"
                     optionsFontSize="8px"
                     onClick={clicouEstacoes}
                     onClickAll={clicouTodasEstacoes}
                     maxItems="1"
        />
        
        
      </div>
      
      <div className="App-miolo">
        
      {showChart && (
            <MeusGraficos />
      )}
        
      </div>
    </div>
    </div>
  );
}


/* 



        */

export default App;
