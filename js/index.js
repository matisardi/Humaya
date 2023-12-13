const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=dulce%20de%20leche';
// const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=dessert';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ee3bed8dbfmsh94ecd8cf985cb31p1d3c70jsn2646eb148f29',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
var comienzo = 0;

btnAnterior.addEventListener("click", ()=>{
    comienzo -= 1;
    apiTasty();
});

btnSiguiente.addEventListener("click", ()=>{
    comienzo += 1;
    apiTasty();
});

const apiTasty = async() => {
	try {
		const respuesta = await fetch(url, options);
		console.log(respuesta);
        if (respuesta.status === 200) {
			const datos = await respuesta.json();
			console.log(datos);
			let recetas = "";
            let item = datos.results;
            let cantCards = 3;
            let j = 0;
            if (item.length < 3) cantCards = item.length;
            if (comienzo < 0) {
                comienzo = item.length - 1;
            } else if (comienzo == item.length) comienzo = 0;
            for (let i = comienzo; i < comienzo + cantCards; i++) {
                if (i == item.length) j = -i;
                recetas += `
                    <div class="col card rounded-0 bgP4 mx-4">
                        <img src="${item[i+j].thumbnail_url}" class="card-img-top rounded-0" alt="${item[i+j].name}">
                        <div class="card-body">
                            <h3 class="card-title colorP4 fw-light">${item[i+j].name}</h3>
                            <p class="card-text colorTextoCard">${item[i+j].description}</p>
                            <button class="btnP4 bg-transparent px-3 py-1">PREPARACIÓN</button>
                        </div>
                    </div>
                `;
            }
            document.getElementById("tasty").innerHTML = recetas;
        } else console.log("Error en la API");
	} catch (error) {
		console.error(error);
	}
}

apiTasty();