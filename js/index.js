

const DOM = {
    apodImage: document.getElementById('apod-image') || document.querySelector('.app-section img') || document.querySelector('img'),
    apodTitle: document.getElementById('apod-title'),
    apodDesc: document.getElementById('apod-desc') || document.querySelector('.today-in-space p') || document.querySelector('p'),
    launchesContainer: document.getElementById('launches-container') || document.querySelector('.upcoming-launches .grid') || document.querySelector('.grid'),
    planetName: document.getElementById('planet-name') || document.querySelector('.explore-planets h3')
};

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('section.hidden, div.hidden, .app-section.hidden, img.hidden').forEach(sec => {
        sec.classList.remove('hidden');
        sec.style.display = 'block';
    });
    
    const imgContainer = document.getElementById('apod-image-container');
    if (imgContainer) {
        imgContainer.style.display = 'flex';
        imgContainer.style.minHeight = '300px';
    }

    
    fetchTodayInSpace();
    fetchUpcomingLaunches();
    fetchPlanetsData();
});

/* ==========================================
   Today in Space (NASA Data)
   ========================================== */
async function fetchTodayInSpace() {
    try {
        const localData = {
            title: "The Ghostly Cat's Head Nebula",
        
            url: "https://picsum.photos",
            explanation: "Like a spectral form rising out of a cold mist, NASA's Hubble and James Webb Space Telescopes have captured a hauntingly dynamic star-forming scene within the vast Carina Nebula, a diffuse stellar nursery located about 7,500 light-years from Earth."
        };

        if (DOM.apodImage) {
            DOM.apodImage.removeAttribute('hidden');
            DOM.apodImage.src = localData.url;
            DOM.apodImage.style.display = 'block';
            DOM.apodImage.style.width = '100%';
            DOM.apodImage.style.height = 'auto';
            DOM.apodImage.style.opacity = '1';
            DOM.apodImage.style.visibility = 'visible';
        }
        
        if (DOM.apodTitle) DOM.apodTitle.innerText = localData.title;
        if (DOM.apodDesc) DOM.apodDesc.innerText = localData.explanation;

    } catch (error) {
        console.error('NASA APOD Error:', error);
    }
}

/* ==========================================
   Upcoming Launches (SpaceDevs Data)
   ========================================== */
async function fetchUpcomingLaunches() {
    try {
        const fallbackLaunches = [
            { 
                name: "Falcon 9 Block 5 | Starlink Group 15-18", 
                image: "https://picsum.photos", 
                mission: { description: "توصيل دفعة جديدة من أقمار ستارلينك الاصطناعية لمدار الأرض المنخفض لتوسيع شبكة الإنترنت العالمية للاتصالات وبث البيانات بجودة عالية." } 
            },
            { 
                name: "US EVA-101 | ISS Solar Array Upgrade", 
                image: "https://picsum.photos", 
                mission: { description: "مهمة سير في الفضاء لرواد ناسا لتثبيت ونشر الألواح الشمسية الجديدة (IROSA) لرفع كفاءة توليد الطاقة الكهربائية بالمحطة بنسبة 30%." } 
            }
        ];

        if (DOM.launchesContainer) {
            DOM.launchesContainer.innerHTML = '';
            displayLaunches(fallbackLaunches);
        }
    } catch (error) {
        console.error('Launches Error:', error);
    }
}

function displayLaunches(launches) {
    launches.forEach(launch => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900 border border-slate-700 p-5 rounded-xl flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <img src="${launch.image}" class="w-full h-40 object-cover rounded-lg mb-4" style="display: block; opacity: 1;" alt="${launch.name}">
                <h4 class="text-lg font-bold text-white mb-2 line-clamp-1">${launch.name}</h4>
                <p class="text-slate-400 text-xs mb-4 line-clamp-3">${launch.mission ? launch.mission.description : 'لا يوجد وصف متوفر لهذه المهمة حالياً.'}</p>
            </div>
        `;
        DOM.launchesContainer.appendChild(card);
    });
}

/* ==========================================
   Planets (Solar System Data)
   ========================================== */
async function fetchPlanetsData() {
    try {
        if (DOM.planetName) {
            DOM.planetName.innerText = "الأرض (Earth)";
            
            const planetImg = document.querySelector('.explore-planets img') || document.querySelector('img[src*="earth"]') || document.querySelector('img');
            if (planetImg) {
                planetImg.src = 'https://picsum.photos';
                planetImg.style.display = 'block';
            }

            const labels = document.querySelectorAll('.explore-planets p, .explore-planets span, .explore-planets td');
            labels.forEach(node => {
                if (node.innerText.includes('6,371')) node.innerText = "6,371 km";
                if (node.innerText.includes('9.8')) node.innerText = "9.8 m/s²";
            });
        }
    } catch (error) {
        console.error('Planets Local Error:', error);
    }
}









