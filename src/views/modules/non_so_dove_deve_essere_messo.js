app.get('/dashboard/:module', (req, res) => {
	const module = req.params.module

	const allowed = ['gestione_utenti'] // da caricare in qualche modo al login

	if (!allowed.includes(module)) {
		return res.status(404).send('Modulo non trovato')
	}

	res.send(renderPage(module))
})
