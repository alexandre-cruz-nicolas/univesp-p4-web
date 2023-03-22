import React, { useState } from 'react';

import { TfiAngleDoubleDown, TfiAngleDoubleUp, TfiCheckBox } from "react-icons/tfi";

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
          <div>ADRIANO MARTINS TEZA</div>
          <div>ALEXANDRE CRUZ NICOLAS</div>
          <div>RENAN CRISTIAN BOAVENTURA</div>
          <div>SELIANE ROBLES TEZA</div>
        </p>
        <h3>Orientador deste projeto:</h3>
        <p>
          Prof. Felipe Augusto Aureliano
        </p>
        <button onClick={props.close}>Fechar</button>
      </div>
  )
}

export const MultiCheckBox = (props) =>{
  const [ colapsed , setColapsed ] = useState(true);
  const caption=props.caption;
  const options=props.options;
  const onclick=props.onClick;
  const onclickall=props.onClickAll;
  const fontsize = props.optionsFontSize === undefined ? "calc(10px + 1vmin)" : props.optionsFontSize;

  return(
    <div className="div-multicheckbox" 
      style={{width: `${props.width}`}} 
    >
      <div className="div-multicheckbox-caption">
          <span onClick={() => setColapsed(!colapsed) }>
            {colapsed ? <TfiAngleDoubleDown /> : <TfiAngleDoubleUp />}
          </span>
          {caption}
          <span onClick={() => onclickall()}>
             <TfiCheckBox />
          </span>
      </div>
      <div className="div-multicheckbox-options"
            style={{display: colapsed ? 'none' : 'grid',
            fontSize: `${fontsize}`
          }}
      >
          {options.map((item,indice)=>
            <label key={item[props.id]}>
              <input type="checkbox"
                onClick = {() => onclick(item[props.id]) }
              />
              {item[props.label]}
              
            </label>
          )
          }
      </div>
    </div>
  )
}

