import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BuMmG3gu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParticlePortrait() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		let points = [];
		let sx = /* @__PURE__ */ new Float32Array(0);
		let sy = /* @__PURE__ */ new Float32Array(0);
		let stars = [];
		let frame = 0;
		let start = 0;
		let dead = false;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const pointer = {
			x: 0,
			y: 0
		};
		const onMove = (e) => {
			pointer.x = e.clientX / window.innerWidth - .5;
			pointer.y = e.clientY / window.innerHeight - .5;
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		const fit = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			canvas.width = Math.max(1, Math.floor(w * dpr));
			canvas.height = Math.max(1, Math.floor(h * dpr));
		};
		const draw = (now) => {
			if (dead) return;
			frame = requestAnimationFrame(draw);
			const w = canvas.width;
			const h = canvas.height;
			ctx.fillStyle = "#070708";
			ctx.fillRect(0, 0, w, h);
			for (const star of stars) {
				star.y -= star.v;
				if (star.y < 0) star.y += 1;
				ctx.fillStyle = "rgba(243,241,236,0.35)";
				ctx.fillRect(star.x * w, star.y * h, star.s, star.s);
			}
			if (!points.length) return;
			const cssW = canvas.clientWidth;
			if (cssW < 1) return;
			const narrow = cssW < 900;
			const pw = narrow ? w * .72 : Math.min(w * .36, h * .52);
			const ph = pw / .8;
			const ox = (w - pw) / 2 + pointer.x * w * .02;
			const oy = (narrow ? h * .06 : (h - ph) * .46) + pointer.y * h * .015;
			const t = reduce ? 1 : Math.min(1, (now - start) / 2200);
			const e = 1 - Math.pow(1 - t, 3);
			const dot = Math.max(1.15, w / 780);
			const reach = 150 * (w / cssW);
			ctx.fillStyle = "#f3f1ec";
			const mx = (pointer.x + .5) * w;
			const my = (pointer.y + .5) * h;
			for (let i = 0; i < points.length; i++) {
				const [tx, ty, lum] = points[i];
				const x = sx[i] + (tx - sx[i]) * e;
				const y = sy[i] + (ty - sy[i]) * e;
				const drift = t >= 1 && !reduce ? Math.sin(now * .0011 + i * .37) * dot * .45 : 0;
				let px = ox + x * pw;
				let py = oy + y * ph + drift;
				const dx = px - mx;
				const dy = py - my;
				const dist = Math.hypot(dx, dy) || 1;
				if (!reduce && dist < reach) {
					const push = (1 - dist / reach) * reach * .22;
					px += dx / dist * push;
					py += dy / dist * push;
				}
				const size = lum < .35 ? dot * 1.35 : dot;
				ctx.globalAlpha = lum < .45 ? .95 : .7;
				ctx.fillRect(px, py, size, size);
			}
			ctx.globalAlpha = 1;
		};
		fit();
		const onResize = () => fit();
		window.addEventListener("resize", onResize);
		start = performance.now();
		frame = requestAnimationFrame(draw);
		fetch("/portrait-points.json").then((r) => r.json()).then((data) => {
			if (dead) return;
			points = data;
			sx = new Float32Array(data.length);
			sy = new Float32Array(data.length);
			for (let i = 0; i < data.length; i++) {
				const ang = Math.random() * Math.PI * 2;
				const rad = .55 + Math.random() * .9;
				sx[i] = .5 + Math.cos(ang) * rad;
				sy[i] = .45 + Math.sin(ang) * rad * .7;
			}
			start = performance.now();
		}).catch(() => {});
		stars = Array.from({ length: 90 }, () => ({
			x: Math.random(),
			y: Math.random(),
			s: Math.random() < .8 ? 1 : 1.6,
			v: 15e-5 + Math.random() * 35e-5
		}));
		return () => {
			dead = true;
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("pointermove", onMove);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "absolute inset-0 h-full w-full",
		"aria-hidden": true
	});
}
function SplitText({ text, className, play, delay = 0 }) {
	const words = text.split(" ");
	let index = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: words.map((word, wordIndex) => {
			const letters = word.split("").map((char) => {
				const at = index;
				index += 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: play ? "split-char play" : "split-char",
					style: play ? { animationDelay: `${delay + at * .028}s` } : void 0,
					"aria-hidden": true,
					children: char
				}, `${word}-${at}`);
			});
			index += 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-block whitespace-nowrap",
				children: [letters, wordIndex < words.length - 1 ? "\xA0" : null]
			}, `${word}-${wordIndex}`);
		})
	});
}
var wa = "https://wa.me/243972092957";
var github = "https://github.com/amanilwaboshi1-prog";
var nav = [
	["Accueil", "#accueil"],
	["À propos", "#apropos"],
	["Compétences", "#competences"],
	["Projets", "#projets"],
	["Contact", "#contact"]
];
var pillars = [
	{
		title: "Présence web",
		copy: "Des interfaces modernes qui donnent une image professionnelle."
	},
	{
		title: "Technologies",
		copy: "Développement, automatisation et découverte de l'IA."
	},
	{
		title: "Approche",
		copy: "Écouter, concevoir, développer et améliorer progressivement."
	},
	{
		title: "Expérience mobile",
		copy: "Une expérience soignée sur téléphone, tablette et ordinateur."
	}
];
var skills = [
	{
		title: "Frontend",
		copy: "Création d'interfaces web modernes et responsives.",
		tags: [
			"HTML5",
			"CSS3",
			"JavaScript"
		]
	},
	{
		title: "Backend",
		copy: "Développement côté serveur et gestion des données.",
		tags: [
			"Python",
			"Node.js",
			"Laravel",
			"MySQL"
		]
	},
	{
		title: "IA & automatisation",
		copy: "Exploration de Python, IA et automatisation de tâches.",
		tags: [
			"Python",
			"Automation",
			"IA"
		]
	},
	{
		title: "Outils",
		copy: "Les outils utilisés pour développer et organiser mes projets.",
		tags: [
			"Git",
			"GitHub",
			"VS Code"
		]
	}
];
var works = [
	{
		title: "VELORA",
		role: "Expérience automobile · Kolwezi",
		copy: "Un site vitrine de location automobile à Kolwezi, avec une ouverture animée, une interface adaptée au téléphone et à la tablette, et une simulation de location avec estimation du prix.",
		tags: [
			"HTML",
			"CSS",
			"JavaScript",
			"Animation",
			"Responsive"
		],
		image: "/work-velora.webp",
		live: "/velora.html",
		source: "https://github.com/amanilwaboshi1-prog/m-portfolio"
	},
	{
		title: "Orbita",
		role: "Exploration 3D · Éducatif",
		copy: "Explorer les 8 planètes, découvrir leurs secrets et apprendre en jouant.",
		tags: [
			"3D interactive",
			"Fiches pédagogiques",
			"Quiz"
		],
		image: "/work-orbita.png",
		live: "https://amanilwaboshi1-prog.github.io/orbita/",
		source: "https://github.com/amanilwaboshi1-prog/orbita"
	},
	{
		title: "Green Space",
		role: "Site web associatif",
		copy: "Un site engagé pour protéger les forêts et mobiliser une communauté.",
		tags: [
			"HTML",
			"CSS",
			"JavaScript",
			"Responsive"
		],
		image: "/work-greenspace.png",
		live: "https://amanilwaboshi1-prog.github.io/Green-space/",
		source: "https://github.com/amanilwaboshi1-prog/Green-space"
	}
];
function Home() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [pct, setPct] = (0, import_react.useState)(0);
	const [menu, setMenu] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = menu ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menu]);
	(0, import_react.useEffect)(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const root = document.documentElement;
		let frame = 0;
		const measure = () => {
			frame = 0;
			const max = root.scrollHeight - window.innerHeight;
			root.style.setProperty("--scroll", max > 0 ? String(window.scrollY / max) : "0");
			const hero = document.getElementById("accueil");
			if (hero) {
				const rect = hero.getBoundingClientRect();
				const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
				hero.style.setProperty("--hero", progress.toFixed(3));
				root.style.setProperty("--hero", progress.toFixed(3));
			}
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		if (reduce) {
			setPct(100);
			setReady(true);
			document.querySelectorAll(".rise").forEach((node) => node.classList.add("is-in"));
			return;
		}
		let n = 0;
		const id = window.setInterval(() => {
			n = Math.min(100, n + Math.ceil(Math.random() * 8 + 3));
			setPct(n);
			if (n >= 100) {
				window.clearInterval(id);
				window.setTimeout(() => setReady(true), 260);
			}
		}, 36);
		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				io.unobserve(entry.target);
			}
		}, { threshold: .16 });
		document.querySelectorAll(".rise").forEach((node) => io.observe(node));
		return () => {
			window.clearInterval(id);
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			io.disconnect();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "noise",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll-line",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: ready ? "loader loader-out" : "loader",
			"aria-hidden": ready,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pct })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#accueil",
					className: "text-sm tracking-wide text-paper",
					children: "Amani.Dev"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-5 md:flex",
					children: nav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						className: "text-xs tracking-wide text-mute hover:text-paper",
						children: label
					}, href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: wa,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hidden text-xs tracking-wide text-paper sm:inline",
						children: "Me contacter →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm tracking-wide text-paper md:hidden",
						"aria-expanded": menu,
						onClick: () => setMenu((open) => !open),
						children: menu ? "Fermer" : "Menu"
					})]
				})
			]
		}),
		menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "menu-panel md:hidden",
			children: [nav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				onClick: () => setMenu(false),
				children: label
			}, href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: wa,
				target: "_blank",
				rel: "noopener noreferrer",
				onClick: () => setMenu(false),
				children: "Me contacter"
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "accueil",
			className: "relative h-dvh min-h-[640px] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticlePortrait, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.28em] text-mute uppercase",
						children: "Bonjour, je suis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitText, {
						text: "Amani Alain",
						className: "hero-name",
						play: ready,
						delay: .15
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitText, {
						text: "Développeur Web & passionné de technologie",
						className: "hero-role",
						play: ready,
						delay: .45
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.35em] text-mute uppercase",
					children: "Disponible"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise border-t border-line px-6 py-20 md:px-16 md:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-3xl text-lg leading-relaxed text-paper md:text-2xl",
				children: "Je transforme une idée, un besoin ou un projet en une expérience web claire, moderne et professionnelle. Mon objectif : créer des solutions utiles, crédibles et pensées pour donner envie d’aller plus loin."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-6 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#projets",
					className: "border-b border-line pb-1 text-paper",
					children: "Découvrir mon travail ↗"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: wa,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "border-b border-line pb-1 text-paper",
					children: "Parlons de votre projet"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "apropos",
			className: "rise border-t border-line px-6 py-24 md:px-16 md:py-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.35em] text-mute uppercase",
					children: "À propos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl",
					children: "Des idées aux solutions, je construis avec intention."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-12 md:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl space-y-5 text-base leading-relaxed text-mute md:col-span-6 md:text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Je suis ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-paper",
									children: "Amani Alain"
								}),
								", développeur web basé en République démocratique du Congo."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Je travaille autour du développement logiciel, de l’intelligence artificielle, de l’automatisation et de la création de produits numériques. Je cherche surtout à comprendre le besoin avant de penser au code." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Chaque projet doit être simple à comprendre, agréable à utiliser et adapté à tous les écrans. Le but n’est pas seulement de faire joli : c’est de créer une présence web qui peut réellement servir votre activité." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								className: "inline-block border-b border-line pb-1 text-paper",
								children: "Travaillons ensemble ↗"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-8 sm:grid-cols-2 md:col-span-5 md:col-start-8",
						children: pillars.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl text-paper",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-mute",
							children: item.copy
						})] }, item.title))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "competences",
			className: "rise border-t border-line px-6 py-24 md:px-16 md:py-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.35em] text-mute uppercase",
					children: "Compétences"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl",
					children: "Les compétences au service de vos projets."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl leading-relaxed text-mute",
					children: "Une base technique que je développe continuellement pour construire des expériences web fiables, modernes et adaptées aux besoins réels."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-12 md:grid-cols-2",
					children: skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "skill-card border-t border-line pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl text-paper",
								children: skill.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-mute",
								children: skill.copy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs tracking-[0.18em] text-paper uppercase",
								children: skill.tags.join("  ·  ")
							})
						]
					}, skill.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "projets",
			className: "rise border-t border-line px-6 py-24 md:px-16 md:py-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.35em] text-mute uppercase",
						children: "Projets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl",
						children: "Des projets concrets, pas seulement des promesses."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: github,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-sm text-paper",
						children: "Voir GitHub ↗"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "works",
					children: works.map((work, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "work",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "project-frame work-visual block",
							href: work.live,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: work.image,
								alt: work.title,
								className: "project-shot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "work-index",
								children: ["0", index + 1]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "work-copy md:col-span-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.28em] text-mute uppercase",
									children: work.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-serif text-4xl text-paper",
									children: work.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 leading-relaxed text-mute",
									children: work.copy
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-xs tracking-[0.16em] text-paper uppercase",
									children: work.tags.join("  ·  ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex gap-5 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: work.live,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-paper",
										children: "Voir le projet ↗"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: work.source,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-mute",
										children: "Code source ↗"
									})]
								})
							]
						})]
					}, work.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-sm text-mute",
					children: "D’autres projets arrivent."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "contact",
			className: "rise border-t border-line px-6 py-28 md:px-16 md:py-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.35em] text-mute uppercase",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl",
					children: "Vous avez une idée ? Construisons-la ensemble."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-xl leading-relaxed text-mute",
					children: "Vous avez besoin d’un site web, d’une application ou d’une solution numérique ? Décrivez-moi votre idée et voyons ensemble comment la transformer en projet concret."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: wa,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "font-serif text-3xl text-paper md:text-5xl",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: github,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "font-serif text-3xl text-paper md:text-5xl",
						children: "GitHub"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-mute",
					children: "République démocratique du Congo · +243 972 092 957"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "flex flex-col gap-2 border-t border-line px-6 py-8 text-xs text-mute md:flex-row md:justify-between md:px-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Amani Alain. Tous droits réservés." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amani.Dev — basé en RDC. Disponible." })]
		})
	] });
}
//#endregion
export { Home as component };
