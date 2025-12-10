// Zoom controls using the CSS `zoom` property with spam-safe, smooth tweening
(function () {
	const modulesEl = document.querySelector(".modules");
	const range = document.getElementById("zoom-range");
	const valueEl = document.getElementById("zoom-value");
	const btnIn = document.getElementById("zoom-in");
	const btnOut = document.getElementById("zoom-out");

	if (!modulesEl || !range || !valueEl) return;

	const STEP = parseFloat(range.step || "0.1");
	const MIN = parseFloat(range.min || "0.5");
	const MAX = parseFloat(range.max || "2");

	function clamp(n) {
		return Math.min(MAX, Math.max(MIN, n));
	}
	function round2(n) {
		return Math.round(n * 100) / 100;
	}
	const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

	let current = clamp(
		parseFloat(localStorage.getItem("zoomScale") || range.value || "1") || 1
	);
	let displayed = current; // last rendered value (updates every frame)
	let target = current; // goal value
	let rafId = 0;
	let animStart = 0;
	let animFrom = current;
	let userSliding = false; // true while the user holds the thumb

	function render(scale) {
		modulesEl.style.zoom = String(scale);
		displayed = scale;
		if (!userSliding) {
			range.value = String(scale);
		}
		valueEl.textContent = `${Math.round(scale * 100)}%`;
	}

	function persist(scale) {
		localStorage.setItem("zoomScale", String(scale));
	}

	// Read durations from CSS vars (with fallbacks)
	function readMsVar(name, fallbackMs) {
		const val = getComputedStyle(document.documentElement)
			.getPropertyValue(name)
			.trim();
		if (!val) return fallbackMs;
		if (val.endsWith("ms")) return parseFloat(val);
		if (val.endsWith("s")) return parseFloat(val) * 1000;
		const n = parseFloat(val);
		return isNaN(n) ? fallbackMs : n;
	}
	const BUTTON_MS = readMsVar("--zoom-tween-duration", 120);
	const INPUT_MS = readMsVar("--zoom-input-duration", 100);

	function startAnimation(to, duration = BUTTON_MS) {
		// Rebase animation from the currently displayed value for smooth chaining
		animFrom = displayed;
		target = clamp(round2(to));
		if (rafId) cancelAnimationFrame(rafId);
		animStart = performance.now();

		function step(now) {
			const t = Math.min(1, (now - animStart) / duration);
			const v = animFrom + (target - animFrom) * ease(t);
			render(v);
			if (t < 1 && Math.abs(v - target) > 1e-4) {
				rafId = requestAnimationFrame(step);
			} else {
				rafId = 0;
				current = target;
				render(current);
				persist(current);
			}
		}

		rafId = requestAnimationFrame(step);
	}

	// Initial paint
	render(current);

	// Range interactions
	range.addEventListener("pointerdown", () => {
		userSliding = true;
	});
	range.addEventListener("pointerup", () => {
		userSliding = false;
	});
	range.addEventListener("change", () => {
		userSliding = false;
	});
	range.addEventListener("input", () => {
		const val = parseFloat(range.value);
		if (!isNaN(val)) startAnimation(val, INPUT_MS);
	});

	// Buttons: add from the latest target/displayed to handle spam smoothly
	btnIn?.addEventListener("click", () => {
		const base = rafId ? target : displayed;
		startAnimation(base + STEP, BUTTON_MS);
	});
	btnOut?.addEventListener("click", () => {
		const base = rafId ? target : displayed;
		startAnimation(base - STEP, BUTTON_MS);
	});

	// Keyboard on range
	range.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight" || e.key === "+") {
			e.preventDefault();
			const base = rafId ? target : displayed;
			startAnimation(base + STEP, BUTTON_MS);
		} else if (e.key === "ArrowLeft" || e.key === "-") {
			e.preventDefault();
			const base = rafId ? target : displayed;
			startAnimation(base - STEP, BUTTON_MS);
		}
	});
})();
