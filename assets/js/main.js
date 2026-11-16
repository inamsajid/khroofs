// KH Roofing Contractors - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add('translate-x-full');
    mobileBackdrop.classList.remove('opacity-100');
    setTimeout(() => {
      mobileBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // --- Sticky Header Scroll Effect ---
  const header = document.getElementById('mainHeader');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('shadow-md', 'bg-white/98');
      header.classList.remove('bg-white/95');
    } else {
      header.classList.remove('shadow-md', 'bg-white/98');
      header.classList.add('bg-white/95');
    }

    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Hero Quote Form & Dynamic Estimate ---
  const quoteForm = document.getElementById('heroQuoteForm');
  const quoteServiceSelect = document.getElementById('quoteService');
  const quotePropertySelect = document.getElementById('quoteProperty');
  const estimateBadge = document.getElementById('estimateBadge');
  const estimateAmount = document.getElementById('estimateAmount');
  const quoteSuccessCard = document.getElementById('quoteSuccessCard');
  const resetQuoteBtn = document.getElementById('resetQuoteBtn');

  // Pricing guide estimations
  const pricingData = {
    'repairs': {
      'terraced': '£50 - £160',
      'semi': '£80 - £220',
      'detached': '£120 - £290',
      'commercial': 'Custom Survey'
    },
    'slating-tiling': {
      'terraced': '£180 - £450',
      'semi': '£240 - £650',
      'detached': '£350 - £850',
      'commercial': 'Custom Survey'
    },
    'flat-roof': {
      'terraced': '£950 - £1,800',
      'semi': '£1,400 - £2,600',
      'detached': '£1,900 - £3,400',
      'commercial': 'Custom Survey'
    },
    're-roof': {
      'terraced': '£3,800 - £5,800',
      'semi': '£4,900 - £7,500',
      'detached': '£6,500 - £11,500',
      'commercial': 'Custom Survey'
    },
    'fascia-gutters': {
      'terraced': '£350 - £700',
      'semi': '£550 - £950',
      'detached': '£850 - £1,450',
      'commercial': 'Custom Survey'
    },
    'emergency': {
      'terraced': 'From £50 (No Callout Fee)',
      'semi': 'From £50 (No Callout Fee)',
      'detached': 'From £50 (No Callout Fee)',
      'commercial': 'Immediate Dispatch'
    }
  };

  function updateEstimateBadge() {
    if (!quoteServiceSelect || !quotePropertySelect || !estimateBadge || !estimateAmount) return;
    const service = quoteServiceSelect.value;
    const property = quotePropertySelect.value;

    if (service && pricingData[service]) {
      const propKey = property || 'semi';
      const range = pricingData[service][propKey] || 'Free Consultation';
      estimateAmount.textContent = range;
      estimateBadge.classList.remove('hidden');
    } else {
      estimateBadge.classList.add('hidden');
    }
  }

  if (quoteServiceSelect) quoteServiceSelect.addEventListener('change', updateEstimateBadge);
  if (quotePropertySelect) quotePropertySelect.addEventListener('change', updateEstimateBadge);

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-950 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Generating Quote Request...
      `;

      // Simulate instantaneous realistic server response
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        quoteForm.classList.add('hidden');
        quoteSuccessCard.classList.remove('hidden');

        // Populate dynamic details
        const nameVal = document.getElementById('quoteName')?.value || 'Valued Customer';
        const serviceText = quoteServiceSelect.options[quoteServiceSelect.selectedIndex]?.text || 'Roofing Service';
        const phoneVal = document.getElementById('quotePhone')?.value || 'Your phone';
        const refNumber = 'KH-' + Math.floor(100000 + Math.random() * 900000);

        document.getElementById('successClientName').textContent = nameVal;
        document.getElementById('successService').textContent = serviceText;
        document.getElementById('successRef').textContent = refNumber;
        document.getElementById('successPhone').textContent = phoneVal;

        if (window.lucide) window.lucide.createIcons();
      }, 800);
    });
  }

  if (resetQuoteBtn) {
    resetQuoteBtn.addEventListener('click', () => {
      quoteSuccessCard.classList.add('hidden');
      quoteForm.reset();
      quoteForm.classList.remove('hidden');
      updateEstimateBadge();
    });
  }

  // --- Project Gallery Filter & Data ---
  const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active styling
      galleryFilters.forEach(b => {
        b.classList.remove('bg-brand-gold', 'text-slate-950', 'font-bold', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      btn.classList.add('bg-brand-gold', 'text-slate-950', 'font-bold', 'shadow-md');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.classList.remove('hidden-item');
          item.style.display = 'block';
        } else {
          item.classList.add('hidden-item');
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Project Lightbox Modal ---
  const projectModal = document.getElementById('projectModal');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectInspectBtns = document.querySelectorAll('.inspect-project-btn');

  const modalImg = document.getElementById('modalProjectImg');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalLocation = document.getElementById('modalProjectLocation');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalDuration = document.getElementById('modalProjectDuration');
  const modalWarranty = document.getElementById('modalProjectWarranty');
  const modalDescription = document.getElementById('modalProjectDescription');

  function openProjectModal(data) {
    if (!projectModal) return;
    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalLocation.textContent = data.location;
    modalCategory.textContent = data.category;
    modalDuration.textContent = data.duration || '3 Days';
    modalWarranty.textContent = data.warranty || '15-Year Guarantee';
    modalDescription.textContent = data.description || 'Full roofing project carried out by K.H. Roofing master tradesmen to British Standards BS 5534.';

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  projectInspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.gallery-item');
      if (!card) return;

      const projectData = {
        title: card.querySelector('.project-title')?.textContent || 'Roofing Project',
        location: card.querySelector('.project-location')?.textContent || 'Manchester',
        category: card.querySelector('.project-badge')?.textContent || 'Roofing',
        duration: card.getAttribute('data-duration') || '3 Working Days',
        warranty: card.getAttribute('data-warranty') || '15-Year Workmanship Guarantee',
        description: card.getAttribute('data-desc') || 'High standard installation by K.H. Roofing Contractors using premium materials.',
        img: card.querySelector('img')?.src || ''
      };

      openProjectModal(projectData);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeEmergencyModal();
      closeMobileMenu();
    }
  });

  // --- Emergency Hotline Modal ---
  const emergencyModal = document.getElementById('emergencyModal');
  const emergencyModalBackdrop = document.getElementById('emergencyModalBackdrop');
  const emergencyModalClose = document.getElementById('emergencyModalClose');
  const emergencyTriggers = document.querySelectorAll('.open-emergency-modal');

  function openEmergencyModal() {
    if (!emergencyModal) return;
    emergencyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  function closeEmergencyModal() {
    if (!emergencyModal) return;
    emergencyModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  emergencyTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openEmergencyModal();
    });
  });

  if (emergencyModalClose) emergencyModalClose.addEventListener('click', closeEmergencyModal);
  if (emergencyModalBackdrop) emergencyModalBackdrop.addEventListener('click', closeEmergencyModal);

  // --- Interactive Estimator Calculator ---
  const calcService = document.getElementById('calcService');
  const calcProperty = document.getElementById('calcProperty');
  const calcCondition = document.getElementById('calcCondition');
  const calcResultPrice = document.getElementById('calcResultPrice');
  const calcResultWarranty = document.getElementById('calcResultWarranty');
  const calcResultTime = document.getElementById('calcResultTime');
  const calcApplyBtn = document.getElementById('calcApplyBtn');

  function calculateEstimate() {
    if (!calcService || !calcProperty || !calcResultPrice) return;
    const s = calcService.value;
    const p = calcProperty.value;
    const c = calcCondition ? calcCondition.value : 'normal';

    let baseMin = 150;
    let baseMax = 400;
    let warranty = '10-Year Guarantee';
    let time = '1-2 Days';

    if (s === 'repairs') {
      baseMin = p === 'terraced' ? 50 : p === 'semi' ? 80 : 130;
      baseMax = p === 'terraced' ? 180 : p === 'semi' ? 240 : 350;
      warranty = 'Workmanship Guaranteed';
      time = 'Same Day / 2-4 Hours';
    } else if (s === 're-roof') {
      baseMin = p === 'terraced' ? 3800 : p === 'semi' ? 4900 : 6800;
      baseMax = p === 'terraced' ? 5600 : p === 'semi' ? 7600 : 11000;
      warranty = '15-Year Full Guarantee (Up to 50yr Lifespan)';
      time = '3 - 6 Working Days';
    } else if (s === 'flat-roof') {
      baseMin = p === 'terraced' ? 950 : p === 'semi' ? 1400 : 2100;
      baseMax = p === 'terraced' ? 1650 : p === 'semi' ? 2400 : 3600;
      warranty = '15-Year GRP / EPDM Guarantee';
      time = '1 - 2 Days';
    } else if (s === 'fascia-gutters') {
      baseMin = p === 'terraced' ? 380 : p === 'semi' ? 580 : 920;
      baseMax = p === 'terraced' ? 680 : p === 'semi' ? 980 : 1450;
      warranty = '10-Year UPVC Guarantee';
      time = '1 Working Day';
    }

    if (c === 'urgent') {
      // emergency dispatch
      time = 'Immediate / Same-Day Service';
    }

    calcResultPrice.textContent = `£${baseMin.toLocaleString()} - £${baseMax.toLocaleString()}`;
    if (calcResultWarranty) calcResultWarranty.textContent = warranty;
    if (calcResultTime) calcResultTime.textContent = time;
  }

  if (calcService) calcService.addEventListener('change', calculateEstimate);
  if (calcProperty) calcProperty.addEventListener('change', calculateEstimate);
  if (calcCondition) calcCondition.addEventListener('change', calculateEstimate);

  if (calcApplyBtn) {
    calcApplyBtn.addEventListener('click', () => {
      // Pre-select service in Hero Quote Form and scroll
      if (quoteServiceSelect && calcService) {
        quoteServiceSelect.value = calcService.value;
      }
      if (quotePropertySelect && calcProperty) {
        quotePropertySelect.value = calcProperty.value;
      }
      updateEstimateBadge();

      const heroSection = document.getElementById('get-quote');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
        // highlight form briefly
        const formCard = document.getElementById('heroQuoteCard');
        if (formCard) {
          formCard.classList.add('ring-4', 'ring-brand-gold');
          setTimeout(() => formCard.classList.remove('ring-4', 'ring-brand-gold'), 1800);
        }
      }
    });
  }

  // --- Areas Search & Filter ---
  const areaSearchInput = document.getElementById('areaSearchInput');
  const areaPills = document.querySelectorAll('.area-tag');
  const areaSearchResult = document.getElementById('areaSearchResult');

  if (areaSearchInput) {
    areaSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      areaPills.forEach(pill => {
        const text = pill.textContent.toLowerCase();
        if (!term || text.includes(term)) {
          pill.classList.remove('opacity-25', 'grayscale');
          pill.classList.add('opacity-100');
          if (term && text.includes(term)) {
            pill.classList.add('bg-brand-gold', 'text-slate-950', 'font-bold');
            matchCount++;
          } else {
            pill.classList.remove('bg-brand-gold', 'text-slate-950', 'font-bold');
          }
        } else {
          pill.classList.add('opacity-25', 'grayscale');
          pill.classList.remove('opacity-100', 'bg-brand-gold', 'text-slate-950', 'font-bold');
        }
      });

      if (areaSearchResult) {
        if (term) {
          areaSearchResult.classList.remove('hidden');
          if (matchCount > 0) {
            areaSearchResult.innerHTML = `<span class="text-emerald-700 font-semibold">✓ Yes, we service "${term}"!</span> Our mobile roofing team is active in your area with zero call-out fees.`;
          } else {
            areaSearchResult.innerHTML = `<span class="text-amber-700 font-medium">Looking for "${term}"?</span> We cover all surrounding areas in the North West. Call us directly on <a href="tel:+447522613823" class="font-bold underline text-amber-900">07522 613 823</a> to confirm same-day availability!`;
          }
        } else {
          areaSearchResult.classList.add('hidden');
        }
      }
    });
  }

  // Quick Service to Quote pre-fill buttons
  const serviceQuoteBtns = document.querySelectorAll('.service-quote-trigger');
  serviceQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceType = btn.getAttribute('data-service');
      if (serviceType && quoteServiceSelect) {
        quoteServiceSelect.value = serviceType;
        updateEstimateBadge();
      }
      const quoteTarget = document.getElementById('get-quote');
      if (quoteTarget) {
        quoteTarget.scrollIntoView({ behavior: 'smooth' });
        const formCard = document.getElementById('heroQuoteCard');
        if (formCard) {
          formCard.classList.add('ring-4', 'ring-brand-gold');
          setTimeout(() => formCard.classList.remove('ring-4', 'ring-brand-gold'), 1600);
        }
      }
    });
  });

  // Calculate default values on load
  calculateEstimate();
  updateEstimateBadge();
});

