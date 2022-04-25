$(document).ready(() => {
	//Page Load event
	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		dataType: 'json',
	}).then((data) => {
		$('#showList').empty();
		$('#error').hide();
		$('#homeLink').hide();
		$('#show').hide();
		data.map((show) => {
			let link = `<li><a class='showLink' href= ${show._links.self.href}> ${show.name} </a></li>`;
			$('#showList').append(link);
		});
		$('#showList').show();

		//#3
		// Link Clicked event
		$('a.showLink').on('click', (event) => {
			event.preventDefault();
			$('#error').hide();
			var a_href = event.currentTarget.href;
			$('#showList').hide();
			$('#show').empty();
			$.ajax({
				url: `${a_href}`,
				contentType: 'application/x-www-form-urlencoded',
				method: 'GET',
				dataType: 'json',
			}).then((data) => {
				//setting h1 with show name and img with Src
				$('#homeLink').show();
				$('#show').empty();
				if (data) {
					

					if (data.name !== null) {
						let showNameH1 = `<h1>${data.name}</h1>`;
						$('#show').append(showNameH1);
					} else {
						let showNameH1 = `<h1>N/A</h1>`;
						$('#show').append(showNameH1);
					}
					if (
						!data.image ||
						!data.image.medium ||
						data.image === null
					) {
						let img = `<img src="public/assets/no_image.jpeg" alt='Movie Poster'>`;
						$('#show').append(img);
					} else {
						let img = `<img src="${data.image.medium}" alt='Movie Poster'>`;
						$('#show').append(img);
					}

					//dl with all the show details
					let dl = `<dl id='showDetails'></dl>`;
					$('#show').append(dl); //used to append the dl to #show
					//data for lang
					if (data.language !== null) {
						let language = `<dt>language</dt><dd>${data.language}</dd>`;
						$('#showDetails').append(language);
					} else {
						let language = `<dt>language</dt><dd>N/A</dd>`;
						$('#showDetails').append(language);
					}

					// data for genre in ul
					let genrehead = `<dt>Genres</dt><dd id='genreDes'></dd>`;
					$('#showDetails').append(genrehead);

					let ulgenre = `<ul id='genre'></ul>`;
					$('#genreDes').append(ulgenre);

					let genrearr = data.genres;
					if (genrearr !== null) {
						genrearr.map((gen) => {
							let ligenre = `<li>${gen}</li>`;
							$('#genre').append(ligenre);
						});
					} else {
						let ligenre = `<li>N/A</li>`;
						$('#genre').append(ligenre);
					}

					//data for ratingaverage
					if (
						!data.rating ||
						!data.rating.average ||
						data.rating === null
					) {
						let avgrating = `<dt>Average Rating</dt> <dd>N/A</dd>`;
						$('#showDetails').append(avgrating);
					} else {
						let avgrating = `<dt>Average Rating</dt> <dd>${data.rating.average}</dd>`;
						$('#showDetails').append(avgrating);
					}

					//data for network name
					if (
						!data.network ||
						!data.network.name ||
						data.network === null
					) {
						let network = ` <dt>Network</dt> <dd>N/A</dd>`;
						$('#showDetails').append(network);
					} else {
						let network = ` <dt>Network</dt> <dd>${data.network.name}</dd>`;
						$('#showDetails').append(network);
					}

					//data for summary  need to check for html in summary either regex or input directly
					if (data.summary !== null) {
						let summary = `<dt>Summary</dt><dd>${data.summary}</dd>`;
						$('#showDetails').append(summary);
					} else {
						let summary = `<dt>Summary</dt><dd>N/A</dd>`;
						$('#showDetails').append(summary);
					}
                    $('#show').show(); //push this down later
				} else {
					$('#error').empty();
					let errormessage = `<p>Something went wrong with the Ajax request/no Data</p>`;
					$('#error').append(errormessage);
					$('#error').show();
				}
			});
		});
	});
});

//#2
//Search Form Submission event
$('#searchForm').submit((event) => {
	event.preventDefault();
	$('#error').hide();
	var searchForm = document.getElementById('searchForm');
	try {
		if (searchForm) {
			var searchShowElement = document.getElementById('search_term');

			var searchTermValue = searchShowElement.value;
			//need to add form validation
			if (!searchTermValue) throw 'No Input Please enter a Value';
			if (typeof searchTermValue != 'string')
				throw 'Tried to Enter an invalid DataType';
			searchTermValue = searchTermValue.trim();
			if (searchTermValue.length === 0)
				throw 'Cannot have a empty Username';
			$('#showList').empty();
			$('#homeLink').show();
			$('#show').hide();
			$.ajax({
				url: `http://api.tvmaze.com/search/shows?q=${searchTermValue}`,
				contentType: 'application/x-www-form-urlencoded',
				method: 'GET',
				dataType: 'json',
			}).then((data) => {
				data.map((show) => {
					let li = `<li><a class='showLink' href= ${show.show._links.self.href}> ${show.show.name} </a></li>`;
					$('#showList').append(li);
				});
				$('#showList').show();
				//#3
				// Link Clicked event
				$('a.showLink').on('click', (event) => {
					event.preventDefault();
					$('#error').hide();
					var a_href = event.currentTarget.href;
					$('#showList').hide();
					$('#show').empty();
					$.ajax({
						url: `${a_href}`,
						contentType: 'application/x-www-form-urlencoded',
						method: 'GET',
						dataType: 'json',
					}).then((data) => {
						//setting h1 with show name and img with Src
						$('#homeLink').show();
						$('#show').empty();
						if (data) {
							

							if (data.name !== null) {
								let showNameH1 = `<h1>${data.name}</h1>`;
								$('#show').append(showNameH1);
							} else {
								let showNameH1 = `<h1>N/A</h1>`;
								$('#show').append(showNameH1);
							}
							if (
								!data.image ||
								!data.image.medium ||
								data.image === null
							) {
								let img = `<img src="public/assets/no_image.jpeg" alt='Movie Poster'>`;
								$('#show').append(img);
							} else {
								let img = `<img src="${data.image.medium}" alt='Movie Poster'>`;
								$('#show').append(img);
							}

							//dl with all the show details
							let dl = `<dl id='showDetails'></dl>`;
							$('#show').append(dl); //used to append the dl to #show
							//data for lang
							if (data.language !== null) {
								let language = `<dt>language</dt><dd>${data.language}</dd>`;
								$('#showDetails').append(language);
							} else {
								let language = `<dt>language</dt><dd>N/A</dd>`;
								$('#showDetails').append(language);
							}

							// data for genre in ul
							let genrehead = `<dt>Genres</dt><dd id='genreDes'></dd>`;
							$('#showDetails').append(genrehead);

							let ulgenre = `<ul id='genre'></ul>`;
							$('#genreDes').append(ulgenre);

							let genrearr = data.genres;
							if (genrearr !== null) {
								genrearr.map((gen) => {
									let ligenre = `<li>${gen}</li>`;
									$('#genre').append(ligenre);
								});
							} else {
								let ligenre = `<li>N/A</li>`;
								$('#genre').append(ligenre);
							}

							//data for ratingaverage
							if (
								!data.rating ||
								!data.rating.average ||
								data.rating === null
							) {
								let avgrating = `<dt>Average Rating</dt> <dd>N/A</dd>`;
								$('#showDetails').append(avgrating);
							} else {
								let avgrating = `<dt>Average Rating</dt> <dd>${data.rating.average}</dd>`;
								$('#showDetails').append(avgrating);
							}

							//data for network name
							if (
								!data.network ||
								!data.network.name ||
								data.network === null
							) {
								let network = ` <dt>Network</dt> <dd>N/A</dd>`;
								$('#showDetails').append(network);
							} else {
								let network = ` <dt>Network</dt> <dd>${data.network.name}</dd>`;
								$('#showDetails').append(network);
							}

							//data for summary  need to check for html in summary either regex or input directly
							if (data.summary !== null) {
								let summary = `<dt>Summary</dt><dd>${data.summary}</dd>`;
								$('#showDetails').append(summary);
							} else {
								let summary = `<dt>Summary</dt><dd>N/A</dd>`;
								$('#showDetails').append(summary);
							}
                            $('#show').show(); //push this down later
						} else {
							$('#error').empty();
							let errormessage = `<p>Something went wrong with the Ajax request/no Data</p>`;
							$('#error').append(errormessage);
							$('#error').show();
						}
					});
				});
			});
		}
	} catch (e) {
		$('#error').empty();
		let errormessage = `<p>${e}</p>`;
		$('#error').append(errormessage);
		$('#error').show();
	}
});