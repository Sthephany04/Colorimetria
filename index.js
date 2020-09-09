const canvas = document.getElementById('miGrafica').getContext('2d');
let myChart;

const colors = {
  Blanco: [100, 100, 100],
  Rojo: [100, 0, 0],
  Verde: [0, 100, 0],
  Azul: [0, 0, 100],
  Amarillo: [100, 100, 0],
  Turquesa: [0, 100, 100],
  Morado: [100, 0, 100],
  Negro: [0, 0, 0]
}

const btnCalcular = document.getElementById('submit');
const resultado = document.getElementById('solucion');
const respuesta = document.getElementById('respuesta');
const grafica = document.getElementById('grafica');


const calculate = () => {
  const color = document.getElementById('select__color');
  const selectColor = color.value;
  const percent = document.getElementById('porcentaje').value;  
 
  for (const prop in colors) {
    if (selectColor === prop){
      const porcent = colors[prop].map(elem => {
        if (selectColor == 'Negro') {
        return 0;
        }
        else{
      if (elem === 100) {
        return 100
      } else {
        return (100-percent)
      }
  }
      });      
      const y = calculateY(porcent)
      resultado.style.display = "block";
      grafica.style.display = "block";  
      respuesta.innerHTML = y
      graph(porcent, colors[prop], selectColor, percent);
    };
  };
};  

color.addEventListener("change", () => calculate())
const calculateY = porcent =>{
console.log(porcent);
return ((0.3 * porcent[0]/100) + (0.59 * porcent[1]/100) + (0.11 * porcent[2]/100)).toFixed(3);
}

btnCalcular.addEventListener('click', (e) => { e.preventDefault(); calculate(); });

const graph = (arrNew, arrOriginal, color, percent) => {
const yNew = calculateY(arrNew);
const yOr = calculateY(arrOriginal);
myChart = new Chart(canvas, {
type: 'line',

   // The data for our dataset
  data: {
      labels: ['0', '1'],
      datasets: [{
          label: 'Blanco',          
          backgroundColor: 'rgba(100%, 100%, 100%, 0)',
          borderColor: 'rgb(100%, 100%, 100%)',
          data: [1, 1]
      },{
          label: color+' '+percent+'%',
          backgroundColor: 'rgba(100%, 100%, 100%, 0)',
          borderColor: 'rgb('+arrNew[0]+'%, '+arrNew[1]+'%, '+arrNew[2]+'%)',
          data: [yNew, yNew]
      },{
          label: color+' 100%',
          backgroundColor: 'rgba(100%, 100%, 100%, 0)',
          borderColor: 'rgb('+arrOriginal[0]+'%, '+arrOriginal[1]+'%, '+arrOriginal[2]+'%)',
          data: [yOr, yOr]
      }]

  },

   // Configuration options go here
  options: {
  responsive:true,
  legend: {
          display: true,
          position: 'right',
          labels: {
              fontSize: 16,
          }
      },
    scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  max:1.1
              }
          }]
      }}
});
}