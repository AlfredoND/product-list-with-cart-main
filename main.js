const render = document.getElementById('render');

fetch('data.json')
  .then(res => res.json())
  .then(data => renderHtml(data))
  .catch(err => console.log(err));

function renderHtml(data) {

  //generate a counter for each element in the data array
  let counters = Array(data.length).fill(0).map(() => ({ counter: 0 }));

  // image renderer depending on width of the screen
  function rendererImg(index) {
    //! añadir validacion de 'data' y  'data[index]'
    //! hacer que el cambio de url no dependa de refrescar la pagina
    //TODO refactorizar la validación de tamaña de pantalla
    //* añadir a la validacion de tamaño de pantalla la imagen para tablet
    //TODO aplicar destructuracion a el 'elemnent'

    let element = data[index]
    if (window.innerWidth >= 1440) {
      console.log(element.image.desktop || ' ')
      return element.image.desktop || ' '
    } else if (window.innerWidth <= 375) {
      console.log(element.image.mobile || ' ')
      return element.image.mobile || ' '
    } else {
      console.error('no se pudo renderizar la imagen')
    }


  }

  render.innerHTML = ''; // clean before rendering


  data.forEach((element, index) => {
    //create card, asign class and id
    const card = document.createElement('article');
    card.className = 'card';
    card.id = index;
    //TODO añadir precisión de doble cero al precio
    // create template
    card.innerHTML = `
      <img src=${rendererImg(index)} alt="img" />

      <div class="card_buttons">
        <button class="card_button subtract" data-index="${index}">
          <img src="assets/images/icon-decrement-quantity.svg" alt="Subtract" />
        </button>
        <span class="amount" data-index="${index}">${counters[index].counter}</span>
        <button class="card_button add" data-index="${index}">
          <img src="assets/images/icon-increment-quantity.svg" alt="Add" />
        </button>
      </div>

      <div class="card_info">
        <span>${element.category}</span>
        <h5>${element.name}</h5>
        <span>$${element.price}</span>
      </div>
    `;
    //render card in 'render'
    render.appendChild(card);
  });
  //! por documentar 
  //TODO implementar localStorage para guardar los datos de los contadores
  
  render.addEventListener('click', (e) => {
    if (e.target.closest('.add')) {
      const index = e.target.closest('.add').dataset.index;
      counters[index].counter++;
      document.querySelector(`.amount[data-index="${index}"]`).innerText = counters[index].counter;
    } else if (e.target.closest('.subtract')) {
      const index = e.target.closest('.subtract').dataset.index;
      counters[index].counter = Math.max(0, counters[index].counter - 1);
      document.querySelector(`.amount[data-index="${index}"]`).innerText = counters[index].counter;
    }
  });
}


// * add to button_add 
{/* <button class="button_add_cart">
<img src="assets/images/icon-add-to-cart.svg" alt="" />
</button> */}