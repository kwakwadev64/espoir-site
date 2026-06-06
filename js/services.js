// Configuration de votre numéro WhatsApp (Format international sans le +)
const WHATSAPP_NUMBER = "243841138532"; 

// Données des tarifs par service
const pricingData = {
    dev: {
        title: "Développement Web & Mobile",
        plans: [
            { name: "Pack Vitrine", price: "À partir de 150$", features: ["Site Responsive (1 page)", "Formulaire de contact", "Optimisation SEO de base", "Support 1 mois"] },
            { name: "Pack Business", price: "À partir de 350$", features: ["Site Multi-pages ou CMS", "Gestionnaire de contenu", "Sécurité renforcée", "Support 3 mois"] },
            { name: "Pack Application APK / Sur-mesure", price: "Sur Devis", features: ["Application Mobile Android", "Interface UI/UX Premium", "Base de données Cloud", "Maintenance incluse"] }
        ]
    },
    design: {
        title: "Design Graphique & Branding",
        plans: [
            { name: "Pack Logo", price: "50$", features: ["3 propositions uniques", "Formats vectoriels HD", "Modifications illimitées", "Livraison en 48h"] },
            { name: "Pack Identité Complète", price: "120$", features: ["Logo + Charte Graphique", "Design Cartes de visite", "Bannières Réseaux Sociaux", "Papier en-tête"] },
            { name: "Pack Publicitaire", price: "30$", features: ["Affiches d'événements", "Flyers promotionnels", "Formats Print & Web", "Haute Résolution"] }
        ]
    },
    marketing: {
        title: "Marketing & Social Media",
        plans: [
            { name: "Pack Starter", price: "80$/mois", features: ["Gestion d'un réseau social", "2 publications par semaine", "Réponses aux messages", "Rapport mensuel"] },
            { name: "Pack Croissance", price: "180$/mois", features: ["Gestion de 3 réseaux", "4 publications / semaine", "Création des visuels inclus", "Campagnes publicitaires"] },
            { name: "Pack Stratégie Digitale", price: "250$", features: ["Audit complet", "Plan de communication", "Calendrier éditorial", "Formation d'équipe"] }
        ]
    },
    bureautique: {
        title: "Bureautique & Données",
        plans: [
            { name: "Pack Numérisation", price: "0.5$ / page", features: ["Saisie de texte propre", "Formatage Word/PDF", "Classement structuré", "Correction orthographique"] },
            { name: "Pack Gestion de Données", price: "À partir de 60$", features: ["Tableaux Excel automatisés", "Analyse de données", "Nettoyage de fichiers", "Formules complexes"] }
        ]
    }
};

const modal = document.getElementById('pricing-modal');
const modalTitle = document.getElementById('modal-service-title');
const plansContainer = document.getElementById('modal-plans-container');

// Fonction pour ouvrir la modale avec les bons tarifs
function openPricingModal(serviceKey) {
    const service = pricingData[serviceKey];
    if (!service) return;

    modalTitle.innerText = service.title;
    plansContainer.innerHTML = ''; // Réinitialisation

    // Changement dynamique de la grille selon le nombre de plans (2 ou 3)
    if (service.plans.length === 2) {
        plansContainer.className = "p-6 grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-6 overflow-y-auto";
    } else {
        plansContainer.className = "p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto";
    }

    // Génération des cartes de tarification
    service.plans.forEach(plan => {
        let featuresList = plan.features.map(f => `
            <li class="flex items-start gap-2.5 text-sm text-gray-600">
                <svg class="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
            </li>
        `).join('');

        let planCard = `
            <div class="border border-gray-100 bg-gray-50/50 rounded-2xl p-6 flex flex-col justify-between hover:border-orange-200 hover:bg-white transition-all duration-300">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md inline-block mb-3">${plan.name}</span>
                    <div class="text-2xl font-black text-gray-900 mb-5">${plan.price}</div>
                    <ul class="space-y-3 mb-6">
                        ${featuresList}
                    </ul>
                </div>
                <button onclick="redirectToWhatsApp('${service.title}', '${plan.name}', '${plan.price}')" class="w-full bg-gray-900 hover:bg-orange-600 text-white text-sm font-semibold h-11 rounded-xl transition-all duration-300 shadow-md shadow-gray-900/5 hover:shadow-orange-600/10">
                    Commander ce pack
                </button>
            </div>
        `;
        plansContainer.innerHTML += planCard;
    });

    // Afficher la modale avec animation smooth
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.remove('scale-95');
    modal.firstElementChild.classList.add('scale-100');
}

// Fonction pour fermer la modale
function closePricingModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.remove('scale-100');
    modal.firstElementChild.classList.add('scale-95');
}

// Fermer la modale si on clique à l'extérieur du cadre blanc
modal.addEventListener('click', function(e) {
    if (e.target === modal) closePricingModal();
});

// Fonction d'envoi du message WhatsApp pré-rempli
function redirectToWhatsApp(service, pack, price) {
    let message = `Bonjour ! Je viens de voir vos services et je souhaite passer commande pour :\n\n` +
                    `🔹 *Service :* ${service}\n` +
                    `📦 *Formule :* ${pack}\n` +
                    `💰 *Tarif indiqué :* ${price}\n\n` +
                    `Pouvez-vous me recontacter pour lancer les détails du projet ?`;
    
    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    }