const weatherList = JSON.parse(localStorage.getItem('weatherList')) || [];

const form = document.querySelector("#search-form")
const input = document.querySelector("#search-term")
const list = document.querySelector(".cities")

const apiKey = "5786b43150323446c372fc5c6b4db5ba"

form.addEventListener('submit', e => {
	e.preventDefault();

	let inputVal = input.value;

	const listItemsArray = Array.from(list.querySelectorAll('.cities li'));

	if (listItemsArray.length > 0) {
		const filteredArray = listItemsArray.filter(el => {
			let content = '';
			let cityName = el.querySelector('.cityName').textContent.toLowerCase();
			content = cityName;
			return content == inputVal.toLowerCase();
		})
	}

	// AJAX magic
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const {main, name, weather} = data
			const icon = `img/${weather[0]['icon']}.svg`
			const li = document.createElement('li')
			li.innerHTML = `
				<figure>
					<img src="${icon}" alt="${weather[0]['description']}">
				</figure>

				<div>
				<h2><span class="cityName">${name}</span></h2>
				<h3>Temperature: ${Math.round(main.temp)}<sup>°C</sup></h3>
					<h3>Humidity: ${main.humidity}</h3>
					<p>${weather[0]['description'].toUpperCase()}</p>
				</div>
			`
			list.appendChild(li)
		});
	form.reset();
	input.focus();
	console.log(list);
	localStorage.setItem('weatherList', JSON.stringify(weatherList));
})