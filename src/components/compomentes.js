import React, { useState } from 'react';

import { TfiAngleDoubleDown, TfiAngleDoubleUp, TfiCheckBox } from "react-icons/tfi";
import logo from "../assets/logo_univesp.png";

export const BotaoTopo = (props) => {
  return (
    <div className="botaotopo" onClick={props.onClick}>
        <span>
           {props.icone}
        </span>
        {props.title}
    </div>
  )
}

export const About = (props) => {
  

  return (
      <div>
        <h2>smartEYE (2023)</h2>
        <img src={logo} width={200} />
        <h3>Site desenvolvido para a disciplina "Projeto Integrador em Engenharia de Computação IV".</h3>
        <p>
          O smartEYE é um dashboard de análise de dados meteorológicos, a partir de dados
          colhidos diariamente, de jan/2017 a dez/2022, via Iot em 43 Estações Meteorológicas Automáticas
          espalhadas pelo Estado de São Paulo e disponibilizados pelo Instituto Nacional de Meteorologia (INMET),
          do Ministério da Agricultura e Pecuária.
        </p>
        <a href="https://portal.inmet.gov.br/" target="_blank" rel="noreferrer">Site do INMET</a>
        <h3>Alunos participantes deste projeto:</h3>
          <p>
          ADRIANO MARTINS TEZA<br/>
          ALEXANDRE CRUZ NICOLAS<br/>
          CÍNDILA BERTOLUCCI<br/>
          RENAN CRISTIAN BOAVENTURA<br/>
          SELIANE ROBLES TEZA<br/>
          </p>
        <h3>Orientador deste projeto:</h3>
        <p>
          Prof. Felipe Augusto Aureliano
        </p>
        <button onClick={props.close}>Fechar</button>
      </div>
  )
}

export function MultiCheckBox({id,label,caption,options,optionsSelected,onClick,onClickAll,width,optionsFontSize,maxItems}) {
  const [ colapsed , setColapsed ] = useState(true);
  const fontsize = optionsFontSize === undefined ? "calc(10px + 1vmin)" : optionsFontSize;

  const isCheked = (item) => {
    const achou = optionsSelected.includes(item);
    return achou;
  }

  const handleSelected = (item) =>{
    const achou = optionsSelected.includes(item);
    let newSelectedItems = [...optionsSelected];
    if(achou){
      newSelectedItems.splice(newSelectedItems.indexOf(item), 1);
    } else { 
      if(maxItems==="1" && newSelectedItems.length===1) {

      } else {
        newSelectedItems.push(item);
      }
    }
    onClick(newSelectedItems);
  }

  const handleSelectAll = () => {
    onClickAll();
  };

  return(
    <div className="div-multicheckbox" 
      style={{width: `${width}`}} 
    >
      <div className="div-multicheckbox-caption">
          <span onClick={() => setColapsed(!colapsed)} className="spanEsquerda">
            {colapsed ? <TfiAngleDoubleDown /> : <TfiAngleDoubleUp />}
          </span>
          <div className='textoCentro'>{caption}</div>
          {maxItems!=="1" && (
            <span onClick={() => handleSelectAll()}  className="spanDireita">
              <TfiCheckBox />
            </span>
          )}
          
      </div>

      <div className="div-multicheckbox-options"
            style={{display: colapsed ? 'none' : 'grid',
            fontSize: `${fontsize}`
          }}
      >
          {options.map((item,indice)=>
            <label key={item[id]}>
              <input type="checkbox"
                onClick = {() => handleSelected(item[id])} 
                checked = { isCheked(item[id]) }
              />
              {item[label]}
            </label>
          )
          }
      </div>
    </div>
  )
}

