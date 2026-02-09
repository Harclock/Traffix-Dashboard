<template>
	<div class="page-in">
		<header>
			<h1 class="traffix">TRAFFIX</h1>
		</header>

		<main>
			<div class="login-wrapper">
				<div class="login-box">
					<div class="logo-circle">
						<img src="Multimedial/Img/logo.png" alt="Traffix Logo" />
					</div>
					<h2>Accedi al tuo account</h2>

					<form action="/main-page.html" method="post">
						<input type="email" placeholder="Email" required />
						<input type="password" placeholder="Password" required />

						<div class="options">
							<label><input type="checkbox" /> Ricordami</label>
							<a href="#">Password dimenticata?</a>
						</div>

						<button type="submit">Login</button>
					</form>

					<div class="oauth-sep"><span>oppure</span></div>
					<div class="oauth-buttons">
						<a class="oauth-btn google" href="/auth/google">
							Continua con Google
						</a>
						<a class="oauth-btn cie" href="/auth/cie">Accedi con CIE</a>
					</div>

					<div class="signup">
						Non hai un account? <a href="#">Registrati</a>
					</div>
				</div>
				<div class="composite-visual" aria-hidden="true"></div>
			</div>
		</main>
	</div>
</template>