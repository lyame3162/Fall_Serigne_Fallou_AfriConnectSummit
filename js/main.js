

/**
 * Technologies : JavaScript vanilla (DOM, Events, IntersectionObserver, localStorage)
 * Fonctionnalités : Dark mode, navbar dynamique, animations scroll, compte à rebours,
 *                   compteurs animés, onglets programme, filtrage intervenants,
 *                   validation formulaire, retour en haut, année dynamique
 */

'use strict';

// =========================================================================
// Attente du chargement complet du DOM avant d'exécuter le JS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    // 1. DARK MODE / LIGHT MODE — Persistance via localStorage
    // =====================================================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    /**
     * Fonction qui applique le thème (dark ou light)
     * et sauvegarde le choix dans localStorage.
     * @param {string} theme - 'dark' ou 'light'
     */
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('africonnect-theme', theme);

        // Mise à jour de l'icône et du label
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-moon-stars';
            themeToggle.setAttribute('aria-label', 'Activer le mode clair');
        } else {
            themeIcon.className = 'bi bi-sun';
            themeToggle.setAttribute('aria-label', 'Activer le mode sombre');
        }
    }

    // Récupération du thème sauvegardé ou défaut au dark
    const savedTheme = localStorage.getItem('africonnect-theme') || 'dark';
    setTheme(savedTheme);

    // Basculement au clic
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // =====================================================================
    // 2. NAVBAR DYNAMIQUE — Fond + ombre après 80px de scroll
    // =====================================================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Écouteur de scroll pour la navbar
    window.addEventListener('scroll', handleNavbarScroll);
    // Vérification initiale
    handleNavbarScroll();
    /*
    // =====================================================================
    // 3. MENU HAMBURGER — Ouverture/fermeture sur mobile
    // =====================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });

        // Fermeture du menu au clic sur un lien
        navLinks.querySelectorAll('.navbar__link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Fermeture en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // =====================================================================
    // 4. ANIMATIONS AU SCROLL — IntersectionObserver
    // =====================================================================
    /**
     * Observe les éléments avec la classe .animate-on-scroll
     * et ajoute la classe .visible quand ils entrent dans le viewport.
     */
  /*  const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois visible
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => scrollObserver.observe(el));

    // =====================================================================
    // 5. COMPTE À REBOURS — Jusqu'au 14 décembre 2026
    // =====================================================================
    const countdownDate = new Date('2026-12-14T09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Mise à jour toutes les secondes
    if (document.getElementById('countdown-days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // =====================================================================
    // 6. COMPTEURS ANIMÉS — Incrémentation au scroll
    // =====================================================================
    const statNumbers = document.querySelectorAll('.stats__number');

    /**
     * Anime le compteur d'un élément de 0 jusqu'à sa valeur cible.
     * @param {HTMLElement} element - L'élément contenant le nombre
     */
   /* function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const step = Math.ceil(target / (duration / 16)); // ~60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 16);
    }

    // Observer les compteurs pour les lancer quand ils deviennent visibles
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    // Ne lancer le compteur que s'il est encore à 0
                    if (targetElement.textContent === '0') {
                        animateCounter(targetElement);
                    }
                    counterObserver.unobserve(targetElement);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => counterObserver.observe(num));
    }

    // =====================================================================
    // 7. ONGLETS DU PROGRAMME — Affichage par jour
    // =====================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les onglets
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });

                // Masquer tous les contenus
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.hidden = true;
                });

                // Activer l'onglet cliqué
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Afficher le contenu correspondant
                const targetId = btn.getAttribute('aria-controls');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.hidden = false;
                }
            });
        });
    }

    // =====================================================================
    // 8. FILTRAGE DYNAMIQUE DES INTERVENANTS
    // =====================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('#speakersGrid .speaker-card');

    if (filterButtons.length > 0 && speakerCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Mettre à jour l'état actif des boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filtrer les cartes
                speakerCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-theme') === filterValue) {
                        card.style.display = 'block';
                        // Animation d'apparition
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // =====================================================================
    // 9. VALIDATION DE FORMULAIRE
    // =====================================================================
    const form = document.getElementById('registrationForm');

    if (form) {
        /**
         * Affiche une erreur de validation sur un champ.
         * @param {string} fieldId - ID du champ
         * @param {string} message - Message d'erreur
         */
      /*  function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorSpan = document.getElementById(`${fieldId}-error`);
            if (field && errorSpan) {
                field.classList.add('error');
                field.classList.remove('success');
                errorSpan.textContent = message;
            }
        }

        /**
         * Affiche un succès de validation sur un champ.
         * @param {string} fieldId - ID du champ
         */
      /*  function showSuccess(fieldId) {
            const field = document.getElementById(fieldId);
            const errorSpan = document.getElementById(`${fieldId}-error`);
            if (field && errorSpan) {
                field.classList.remove('error');
                field.classList.add('success');
                errorSpan.textContent = '';
            }
        }

        /**
         * Réinitialise les états visuels du formulaire.
         */
      /*  function resetFormStyles() {
            form.querySelectorAll('.form__input').forEach(input => {
                input.classList.remove('error', 'success');
            });
            form.querySelectorAll('.form__error').forEach(error => {
                error.textContent = '';
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            resetFormStyles();

            // Masquer le message de succès précédent
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.hidden = true;
            }

            let isValid = true;

            // 1. Nom complet — minimum 2 caractères
            const fullname = document.getElementById('fullname');
            if (!fullname.value.trim() || fullname.value.trim().length < 2) {
                showError('fullname', 'Veuillez entrer votre nom complet (min. 2 caractères).');
                isValid = false;
            } else {
                showSuccess('fullname');
            }

            // 2. Email — validation par regex
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                showError('email', 'Veuillez entrer une adresse email valide.');
                isValid = false;
            } else {
                showSuccess('email');
            }

            // 3. Téléphone — minimum 8 chiffres
            const phone = document.getElementById('phone');
            const phoneDigits = phone.value.replace(/\D/g, '');
            if (!phone.value.trim() || phoneDigits.length < 8) {
                showError('phone', 'Veuillez entrer un numéro de téléphone valide (min. 8 chiffres).');
                isValid = false;
            } else {
                showSuccess('phone');
            }

            // 4. Type de participation — sélection obligatoire
            const participation = document.getElementById('participation');
            if (!participation.value) {
                showError('participation', 'Veuillez sélectionner un type de participation.');
                isValid = false;
            } else {
                showSuccess('participation');
            }

            // 5. Pays — sélection obligatoire
            const country = document.getElementById('country');
            if (!country.value) {
                showError('country', 'Veuillez sélectionner votre pays.');
                isValid = false;
            } else {
                showSuccess('country');
            }

            // 6. Message — minimum 20 caractères
            const message = document.getElementById('message');
            if (!message.value.trim() || message.value.trim().length < 20) {
                showError('message', 'Veuillez entrer un message d\'au moins 20 caractères.');
                isValid = false;
            } else {
                showSuccess('message');
            }

            // Si tout est valide : succès
            if (isValid) {
                formSuccess.hidden = false;
                form.reset();
                resetFormStyles();

                // Faire défiler jusqu'au message de succès
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Masquer après 8 secondes
                setTimeout(() => {
                    formSuccess.hidden = true;
                }, 8000);
            }
        });
    }

    // =====================================================================
    // 10. BOUTON RETOUR EN HAUT — Apparaît après 300px de scroll
    // =====================================================================
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTopVisibility() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', handleBackToTopVisibility);

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Vérification initiale
        handleBackToTopVisibility();
    }

    // =====================================================================
    // 11. ANNÉE DYNAMIQUE DANS LE FOOTER
    // =====================================================================
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

//}); // Fin DOMContentLoaded