
    /* ==========================================================================
       A. GLOBAL STATE & DATA DEFINITIONS
       ========================================================================== */
    // Urutan wali nasab mengikuti PMA Nomor 30 Tahun 2024 Pasal 12 ayat (3).
    // WALI_LEVELS is loaded from its page-specific data file.


    // MAHAR_DICTIONARY is loaded from its page-specific data file.


    // Current State Variables
    let currentWaliIndex = 0;
    let waliAnswers = { q1: true, q2: true, q3: true, q4: true, q5: true, qLocation: 'pending' };
    let waliHistory = [];

    /* ==========================================================================
       B. INITIALIZATION & NAVIGATION
       ========================================================================== */
    const SIDEBAR_SCROLL_KEY = 'asisten-penghulu.sidebar-scroll.v1';

    function initSidebarScrollPersistence() {
      const sidebarNav = document.querySelector('.sidebar-nav');
      if (!sidebarNav) return;

      // Restore only when the saved position belongs to the page being opened.
      // This also handles browser back/forward cache through the pageshow event.
      const restoreSidebarPosition = () => {
        let saved = null;
        try {
          saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
        } catch (error) {
          return;
        }
        if (!saved) return;

        let state = null;
        try {
          state = JSON.parse(saved);
        } catch (error) {
          try { sessionStorage.removeItem(SIDEBAR_SCROLL_KEY); } catch (_) {}
          return;
        }

        if (!state || state.destination !== window.location.pathname ||
            !Number.isFinite(Number(state.scrollTop))) {
          try { sessionStorage.removeItem(SIDEBAR_SCROLL_KEY); } catch (_) {}
          return;
        }

        // Wait for layout/fonts to settle, then restore the sidebar's own scroll area.
        const applyPosition = () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const maxScroll = Math.max(0, sidebarNav.scrollHeight - sidebarNav.clientHeight);
              sidebarNav.scrollTop = Math.min(Math.max(0, Number(state.scrollTop)), maxScroll);
              try { sessionStorage.removeItem(SIDEBAR_SCROLL_KEY); } catch (_) {}
            });
          });
        };

        if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
          document.fonts.ready.then(applyPosition).catch(applyPosition);
        } else {
          applyPosition();
        }
      };

      // Save the scroll position before a normal same-tab sidebar navigation.
      sidebarNav.addEventListener('click', event => {
        const link = event.target.closest('a.nav-item[href]');
        if (!link || event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target && link.target !== '_self') return;

        let destination;
        try {
          destination = new URL(link.href, window.location.href);
        } catch (error) {
          return;
        }
        if (destination.origin !== window.location.origin) return;

        try {
          sessionStorage.setItem(SIDEBAR_SCROLL_KEY, JSON.stringify({
            scrollTop: sidebarNav.scrollTop,
            destination: destination.pathname
          }));
        } catch (error) {
          // Navigation should continue even if browser storage is unavailable.
        }
      });

      window.addEventListener('pageshow', restoreSidebarPosition);
    }

    window.addEventListener('DOMContentLoaded', () => {
      initSidebarScrollPersistence();
      initAppDates();
      const page = document.body.dataset.page || 'dashboard';
      if (page === 'wali') { initWaliAvailabilityControls(); renderWaliTreeSidebar(); loadWaliStep(0); }
      if (page === 'iddah') { initIddahCalculator(); }
      if (page === 'mahar') { initMaharDictionary(); translateMaharNumber(); buildMaharSentence(); }
      if (page === 'akad') { renderAkadScripts(); }
      if (page === 'khutbah') { initKhutbahSection(); }
      if (page === 'nasihat') { initNasehatSection(); }
      if (page === 'konversi') { initConverters(); }
      if (page === 'dashboard') { updateDashboardStats(); }
      if (page === 'ensiklopedia' && typeof renderKnowledge === 'function') {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || 'regulasi';
        const allowed = ['regulasi','fikih','dalil','problematika','nasab-mahram'];
        if (typeof v4ActiveCategory !== 'undefined') v4ActiveCategory = allowed.includes(category) ? category : 'regulasi';
        const query = params.get('query') || '';
        if (typeof v4GlobalSearch !== 'undefined') v4GlobalSearch = !!query;
        const search = document.getElementById('knowledgeSearch');
        if (search) search.value = query;
        renderKnowledge();
      }
    });
    function switchSection(sectionId, navElement = null) {
      document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active'));
      const targetSec = document.getElementById(`section-${sectionId}`);
      if (targetSec) targetSec.classList.add('active');

      document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => item.classList.remove('active'));
      if (navElement) {
        navElement.classList.add('active');
      } else {
        const matchingNav = Array.from(document.querySelectorAll('.sidebar-nav .nav-item')).find(item => 
          item.getAttribute('onclick') && item.getAttribute('onclick').includes(sectionId)
        );
        if (matchingNav) matchingNav.classList.add('active');
      }

      // Update Top Header Title
      const titleMap = {
        'dashboard': { title: 'Beranda', icon: 'fa-house-chimney' },
        'wali': { title: 'Penentuan Wali Nikah', icon: 'fa-sitemap' },
        'iddah': { title: 'Kalkulator Masa Iddah', icon: 'fa-hourglass-half' },
        'mahar': { title: 'Terjemah & Perakit Mahar', icon: 'fa-coins' },
        'akad': { title: 'Lafaz Akad Nikah', icon: 'fa-scroll' },
        'khutbah': { title: 'Kumpulan Khutbah Nikah', icon: 'fa-microphone-lines' },
        'nasehat': { title: 'Bank Nasihat Perkawinan Pernikahan', icon: 'fa-comments' },
        'konversi': { title: 'Kalkulator & Konversi', icon: 'fa-calculator' },
        'referensi': { title: 'Referensi Fiqh & Regulasi', icon: 'fa-book-quran' },
        'knowledge': { title: 'Pusat Pengetahuan', icon: 'fa-book-open' }
      };

      const meta = titleMap[sectionId] || { title: 'Asisten Penghulu', icon: 'fa-mosque' };
      document.getElementById('topPageTitle').innerHTML = `<i class="fa-solid ${meta.icon}" style="color: var(--primary);"></i> <span>${meta.title}</span>`;

      // Close mobile sidebar if open
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      if (sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileSidebar() {
      const sidebar = document.getElementById('appSidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('active');
    }

    function showToast(msg = 'Teks berhasil disalin ke clipboard!') {
      const toast = document.getElementById('toast-notification');
      document.getElementById('toast-message').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    }

    async function copyText(elementId) {
      const el = document.getElementById(elementId);
      if (!el) { showToast('Teks yang akan disalin tidak ditemukan.'); return false; }
      const text = (typeof el.value === 'string' ? el.value : (el.innerText || el.textContent || '')).trim();
      if (!text) { showToast('Tidak ada teks untuk disalin.'); return false; }
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch (err) { copied = false; }
      if (!copied) {
        let helper = null;
        try {
          helper = document.createElement('textarea');
          helper.value = text;
          helper.setAttribute('readonly', '');
          helper.setAttribute('aria-hidden', 'true');
          helper.style.position = 'fixed';
          helper.style.left = '-9999px';
          helper.style.top = '0';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.focus();
          helper.select();
          helper.setSelectionRange(0, helper.value.length);
          copied = document.execCommand('copy');
        } catch (err) { copied = false; }
        finally { if (helper && helper.parentNode) helper.parentNode.removeChild(helper); }
      }
      showToast(copied ? 'Teks berhasil disalin.' : 'Penyalinan otomatis tidak didukung browser ini. Silakan salin teks secara manual.');
      return copied;
    }

    function toggleAccordion(headerEl) {
      const parent = headerEl.parentElement;
      parent.classList.toggle('open');
    }

    /* ==========================================================================
       C. DATE & HIJRI APPROXIMATION
       ========================================================================== */
    const HIJRI_MONTHS = [
      'Muharram', 'Shafar', 'Rabi\'ul Awwal', 'Rabi\'ul Akhir', 
      'Jumadil Ula', 'Jumadil Akhir', 'Rajab', 'Sya\'ban', 
      'Ramadhan', 'Syawwal', 'Dzulqa\'dah', 'Dzulhijjah'
    ];

    const HIJRI_MONTHS_AR = [
      'المحرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
      'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];

    const HARI_INDO = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const BULAN_INDO = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    // Kuwaiti Algorithm for Masehi to Hijri
    function gregorianToHijri(date) {
      let d = date.getDate();
      let m = date.getMonth();
      let y = date.getFullYear();

      if (m < 2) {
        y--;
        m += 12;
      }

      let a = Math.floor(y / 100);
      let b = 2 - a + Math.floor(a / 4);
      let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 2)) + d + b - 1524.5;

      // Konversi Julian Day ke bilangan bulat terlebih dahulu.
      // Tanpa pembulatan ini, JD berakhiran .5 membuat tanggal Hijriah
      // ikut menjadi pecahan (misalnya 5.5 Jumadil Akhir).
      jd = Math.floor(jd + 0.5);

      let l = jd - 1948440 + 10632;
      let n = Math.floor((l - 1) / 10631);
      l = l - 10631 * n + 354;
      let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
      l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
      
      let mHijri = Math.floor((24 * l) / 709);
      let dHijri = l - Math.floor((709 * mHijri) / 24);
      let yHijri = 30 * n + j - 30;

      return {
        day: dHijri,
        month: mHijri, // 1-12
        year: yHijri,
        monthName: HIJRI_MONTHS[mHijri - 1] || '',
        monthNameAr: HIJRI_MONTHS_AR[mHijri - 1] || ''
      };
    }

    function hijriToGregorian(hDay, hMonth, hYear) {
      let jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth - Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;
      
      let l = jd + 68569;
      let n = Math.floor((4 * l) / 146097);
      l = l - Math.floor((146097 * n + 3) / 4);
      let i = Math.floor((4000 * (l + 1)) / 1461001);
      l = l - Math.floor((1461 * i) / 4) + 31;
      let j = Math.floor((80 * l) / 2447);
      let d = l - Math.floor((2447 * j) / 80);
      l = Math.floor(j / 11);
      let m = j + 2 - 12 * l;
      let y = 100 * (n - 49) + i + l;

      return new Date(y, m - 1, d);
    }

    function formatIndoDate(date) {
      const hari = HARI_INDO[date.getDay()];
      const tgl = date.getDate();
      const bln = BULAN_INDO[date.getMonth()];
      const thn = date.getFullYear();
      return `${hari}, ${tgl} ${bln} ${thn}`;
    }

    function initAppDates() {
      const today = new Date();
      const indoStr = formatIndoDate(today);
      const hijri = gregorianToHijri(today);
      const hijriStr = `${hijri.day} ${hijri.monthName} ${hijri.year} H`;

      // Header Badges
      const elM = document.getElementById('currentDateMasehi');
      const elH = document.getElementById('currentDateHijri');
      if (elM) elM.innerText = indoStr;
      if (elH) {
        elH.innerText = hijriStr;
        elH.title = 'Tanggal Hijriah merupakan perkiraan berdasarkan algoritma kalender dan dapat berbeda dari penetapan rukyat atau otoritas setempat.';
        elH.setAttribute('aria-label', `Perkiraan tanggal Hijriah: ${hijriStr}`);
      }

      // Dashboard Banner
      const dashM = document.getElementById('dashMasehiText');
      const dashH = document.getElementById('dashHijriText');
      if (dashM) dashM.innerText = indoStr;
      if (dashH) dashH.innerText = hijriStr;
    }

    /* ==========================================================================
       D. FEATURE 2: CEK WALI NIKAH LOGIC
       ========================================================================== */
    function renderWaliTreeSidebar() {
      const container = document.getElementById('waliTreeListContainer');
      if (!container) return;
      container.replaceChildren();

      let previousGroup = null;
      WALI_LEVELS.forEach((level, idx) => {
        if (level.group !== previousGroup) {
          const groupHeading = document.createElement('li');
          groupHeading.className = 'wali-tree-group';
          groupHeading.textContent = level.group;
          container.appendChild(groupHeading);
          previousGroup = level.group;
        }

        const li = document.createElement('li');
        li.className = 'wali-tree-item';
        li.id = `tree-item-${idx}`;
        li.setAttribute('aria-current', idx === currentWaliIndex ? 'step' : 'false');

        const number = document.createElement('span');
        number.className = 'wali-node-number';
        number.textContent = String(idx + 1);

        const detail = document.createElement('span');
        detail.className = 'wali-node-detail';

        const name = document.createElement('strong');
        name.className = 'wali-node-name';
        name.textContent = level.name;

        const description = document.createElement('small');
        description.className = 'wali-node-description';
        description.textContent = level.desc || level.group;

        const status = document.createElement('span');
        status.className = 'wali-node-status';
        status.textContent = idx === currentWaliIndex ? 'Sedang diperiksa' : (idx < currentWaliIndex ? 'Sudah dilewati' : 'Urutan berikutnya');

        detail.append(name, description);
        li.append(number, detail, status);

        if (idx < currentWaliIndex) li.classList.add('bypassed');
        if (idx === currentWaliIndex) li.classList.add('current');

        container.appendChild(li);
      });
    }

    function loadWaliStep(index) {
      currentWaliIndex = index;
      const target = WALI_LEVELS[index];
      
      document.getElementById('waliStepPill').innerText = `Tingkat ${index + 1} dari ${WALI_LEVELS.length}`;
      document.getElementById('waliCurrentName').innerText = target.name;
      document.getElementById('waliRelationshipBadge').innerText = target.group;

      // Reset answers to YES
      waliAnswers = { q1: true, q2: true, q3: true, q4: true, q5: true, qLocation: 'pending' };
      setWaliLocationStatus('pending');
      for (let i = 1; i <= 5; i++) {
        document.getElementById(`btn-q${i}-yes`).classList.add('active', 'yes');
        document.getElementById(`btn-q${i}-no`).classList.remove('active');
        document.getElementById(`btn-q${i}-no`).classList.add('no');
      }

      document.getElementById('btnWaliPrev').disabled = (index === 0);
      document.getElementById('waliResultBox').style.display = 'none';
      document.getElementById('waliQuestionCard').style.display = 'block';

      // Update sidebar tree highlighting
      document.querySelectorAll('.wali-tree-item').forEach((el, idx) => {
        el.className = 'wali-tree-item';
        if (idx < currentWaliIndex) {
          el.classList.add('bypassed');
        } else if (idx === currentWaliIndex) {
          el.classList.add('current');
        }
      });
    }

    function showWaliResultModal(resultBox) {
      const oldModal = document.getElementById('waliResultModal');
      if (oldModal) oldModal.remove();

      const modal = document.createElement('div');
      modal.id = 'waliResultModal';
      modal.className = 'wali-result-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'waliModalTitle');

      const panel = document.createElement('div');
      panel.className = 'wali-result-modal-panel';

      const header = document.createElement('div');
      header.className = 'wali-result-modal-header';

      const heading = document.createElement('h3');
      heading.id = 'waliModalTitle';
      heading.textContent = 'Hasil Pemeriksaan Wali';

      const closeTop = document.createElement('button');
      closeTop.type = 'button';
      closeTop.className = 'wali-modal-close';
      closeTop.setAttribute('aria-label', 'Tutup hasil');
      closeTop.innerHTML = '&times;';
      closeTop.addEventListener('click', closeWaliResultModal);

      header.append(heading, closeTop);

      const content = document.createElement('div');
      content.className = 'wali-result-modal-content';
      const resultClone = resultBox.cloneNode(true);
      resultClone.removeAttribute('id');
      resultClone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
      resultClone.style.display = 'block';
      content.appendChild(resultClone);

      const footer = document.createElement('div');
      footer.className = 'wali-result-modal-footer';

      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'btn btn-primary';
      closeButton.textContent = 'Tutup';
      closeButton.addEventListener('click', closeWaliResultModal);
      footer.appendChild(closeButton);

      panel.append(header, content, footer);
      modal.appendChild(panel);
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeWaliResultModal();
      });
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    }

    function closeWaliResultModal() {
      const modal = document.getElementById('waliResultModal');
      if (modal) modal.remove();
      document.body.style.overflow = '';
      const questionCard = document.getElementById('waliQuestionCard');
      const resultBox = document.getElementById('waliResultBox');
      if (questionCard) questionCard.style.display = 'block';
      if (resultBox) resultBox.style.display = 'none';
    }

    function getWaliAvailabilityGuidance(status) {
      if (status === 'unknown') {
        return {
          title: 'Keberadaan Wali Tidak Diketahui',
          explanation: 'PMA Nomor 30 Tahun 2024 mengatur bahwa wali hakim dapat bertindak apabila wali nasab tidak diketahui keberadaannya. Keadaan ini harus diperiksa secara cermat; status “tidak diketahui” tidak boleh disamakan dengan wali yang hanya tinggal jauh, sedang tidak hadir, atau belum berhasil dihubungi.',
          notes: 'Persyaratan khusus: surat pernyataan bermeterai dari calon pengantin dan disaksikan oleh 2 (dua) orang saksi. Dasar: PMA Nomor 30 Tahun 2024 Pasal 13 ayat (5) huruf c jo. ayat (7). Aplikasi tidak menetapkan wali hakim secara otomatis; petugas tetap memeriksa fakta, pernyataan, saksi, dan ketentuan yang berlaku.',
          type: 'unknown'
        };
      }
      if (status === 'pending') {
        return {
          title: 'Keberadaan Wali Belum Terverifikasi',
          explanation: 'Pemeriksaan belum dapat disimpulkan. Lakukan klarifikasi kepada keluarga atau pihak yang mengetahui keadaan wali. Jangan menyatakan wali ghaib/tidak diketahui dan jangan mengalihkan kewalian hanya karena informasi belum lengkap.',
          notes: 'Jika lokasi wali diketahui tetapi ia tidak dapat hadir, periksa kemungkinan taukil wali menurut PMA Nomor 30 Tahun 2024 Pasal 12 ayat (5). Jika keberadaannya benar-benar tidak diketahui, periksa persyaratan Pasal 13 ayat (5) huruf c dan ayat (7).',
          type: 'pending'
        };
      }
      return null;
    }

    // Bind status controls through a delegated listener instead of relying on
    // inline onclick attributes. This is more robust across browser/PWA contexts.
    function initWaliAvailabilityControls() {
      const group = document.querySelector('.wali-availability-options');
      if (!group || group.dataset.waliAvailabilityBound === 'true') return;
      group.dataset.waliAvailabilityBound = 'true';
      group.addEventListener('click', (event) => {
        const button = event.target && typeof event.target.closest === 'function'
          ? event.target.closest('button[data-wali-location-status]')
          : null;
        if (!button || !group.contains(button)) return;
        event.preventDefault();
        setWaliLocationStatus(button.dataset.waliLocationStatus);
      });
    }

    function setWaliLocationStatus(status) {
      const allowed = ['known', 'unknown', 'pending'];
      if (!allowed.includes(status)) status = 'pending';
      waliAnswers.qLocation = status;
      const buttons = {
        known: document.getElementById('btn-location-known'),
        unknown: document.getElementById('btn-location-unknown'),
        pending: document.getElementById('btn-location-pending')
      };
      Object.entries(buttons).forEach(([key, button]) => {
        if (!button) return;
        const active = key === status;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      const selection = document.getElementById('waliAvailabilitySelection');
      if (selection) {
        const messages = {
          known: 'Dipilih: Keberadaan wali diketahui. Lanjutkan pemeriksaan syarat wali dan kehadiran atau taukil.',
          unknown: 'Dipilih: Keberadaan wali tidak diketahui. Evaluasi akan menampilkan ketentuan dan dokumen yang perlu diverifikasi.',
          pending: 'Status belum diverifikasi. Lengkapi informasi sebelum menyimpulkan keberadaan wali.'
        };
        selection.textContent = messages[status];
        selection.dataset.status = status;
        selection.hidden = false;
      }
    }

    function setWaliAnswer(qKey, isYes) {
      waliAnswers[qKey] = isYes;
      const btnYes = document.getElementById(`btn-${qKey}-yes`);
      const btnNo = document.getElementById(`btn-${qKey}-no`);

      btnYes.classList.toggle('active', isYes);
      btnNo.classList.toggle('active', !isYes);
      // Class yes/no tetap melekat agar warna status aktif konsisten: hijau untuk Ya, merah untuk Tidak.
      btnYes.classList.add('yes');
      btnNo.classList.add('no');

      // Jika wali dinyatakan wafat, lanjutkan otomatis ke urutan berikutnya.
      if (qKey === 'q1' && isYes === false) {
        const deceasedIndex = currentWaliIndex;
        const deceased = WALI_LEVELS[deceasedIndex];
        if (deceasedIndex < WALI_LEVELS.length - 1) {
          showToast(`${deceased.name} ditandai wafat. Pemeriksaan dilanjutkan ke urutan wali berikutnya.`);
          loadWaliStep(deceasedIndex + 1);
        } else {
          const resultBox = document.getElementById('waliResultBox');
          resultBox.className = 'wali-result-box hakim';
          document.getElementById('waliResultIcon').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
          document.getElementById('waliResultTitle').innerText = 'Seluruh Urutan Wali Nasab Telah Diperiksa';
          document.getElementById('waliResultExplanation').textContent = 'Wali pada urutan terakhir juga dinyatakan wafat. Lakukan verifikasi seluruh hubungan nasab dan dokumen, kemudian konsultasikan penggunaan wali hakim kepada pejabat yang berwenang sesuai PMA Nomor 30 Tahun 2024.';
          document.getElementById('waliResultNotes').textContent = 'Status wafat harus dibuktikan secara memadai. Aplikasi hanya membantu penyaringan awal dan tidak menetapkan wali hakim secara otomatis.';
          showWaliResultModal(resultBox);
        }
      }
    }

    function prevWaliLevel() {
      if (currentWaliIndex > 0) {
        loadWaliStep(currentWaliIndex - 1);
      }
    }

    function evaluateCurrentWali() {
      const allYes = waliAnswers.q1 && waliAnswers.q2 && waliAnswers.q3 && waliAnswers.q4 && waliAnswers.q5;
      const target = WALI_LEVELS[currentWaliIndex];
      const resultBox = document.getElementById('waliResultBox');
      const questionCard = document.getElementById('waliQuestionCard');

      // Status keberadaan diperiksa sebelum evaluasi syarat lainnya.
      const availabilityGuidance = getWaliAvailabilityGuidance(waliAnswers.qLocation);
      if (availabilityGuidance) {
        resultBox.className = availabilityGuidance.type === 'unknown' ? 'wali-result-box hakim' : 'wali-result-box';
        document.getElementById('waliResultIcon').innerHTML = availabilityGuidance.type === 'unknown'
          ? '<i class="fa-solid fa-location-crosshairs"></i>'
          : '<i class="fa-solid fa-circle-question"></i>';
        document.getElementById('waliResultTitle').textContent = availabilityGuidance.title;
        document.getElementById('waliResultExplanation').textContent = availabilityGuidance.explanation;
        const officialRegulation = 'https://peraturan.go.id/filespengundangan/permenag-no-30-tahun-2024.pdf';
        document.getElementById('waliResultNotes').innerHTML = `${availabilityGuidance.notes}<br><br><a href="${officialRegulation}" target="_blank" rel="noopener noreferrer">Buka naskah resmi PMA Nomor 30 Tahun 2024</a>`;
        showWaliResultModal(resultBox);
        return;
      }

      // Ketidakhadiran/jarak bukan dasar otomatis untuk melompati wali aqrab;
      // kemungkinan taukil wali dan ketentuan wali hakim harus diverifikasi petugas.
      if (!waliAnswers.q4 && waliAnswers.q1 && waliAnswers.q2 && waliAnswers.q3) {
        resultBox.className = 'wali-result-box hakim';
        document.getElementById('waliResultIcon').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        document.getElementById('waliResultTitle').innerText = 'Perlu Verifikasi Syarat Adil';
        document.getElementById('waliResultExplanation').textContent = 'Syarat adil belum dapat dipastikan melalui jawaban ya/tidak sederhana. Jangan otomatis melewati wali ini atau menetapkan wali hakim. Lakukan pemeriksaan dan dokumentasikan dasar penilaian oleh petugas berwenang.';
        document.getElementById('waliResultNotes').textContent = 'PMA Nomor 30 Tahun 2024 Pasal 12 ayat (2) mensyaratkan wali nasab berjenis kelamin laki-laki, beragama Islam, balig, berakal, dan adil. Penilaian syarat adil memerlukan verifikasi.';
        showWaliResultModal(resultBox);
        return;
      }
      if (allYes) {
        // SUCCESS: Valid Wali Found!
        resultBox.className = 'wali-result-box success';
        document.getElementById('waliResultIcon').innerHTML = '<i class="fa-solid fa-circle-check" style="color: #059669;"></i>';
        document.getElementById('waliResultTitle').innerText = `Calon Wali yang Memenuhi Kriteria Awal: ${target.name}`;
        document.getElementById('waliResultExplanation').innerHTML = `
          Berdasarkan tata urutan wali aqrab dan verifikasi 5 rukun/syarat sah fiqh munakahat, 
          <strong>${target.name}</strong> memenuhi seluruh kriteria tanpa adanya halangan syar'i. 
          Hasil ini merupakan penyaringan awal. Hubungan nasab, urutan wali, identitas, dokumen, dan ketentuan taukil tetap harus diverifikasi petugas sebelum penetapan.
        `;

        document.getElementById('waliResultNotes').innerHTML = `
          <div class="dalil-title"><i class="fa-solid fa-certificate"></i> Dalil & Ketentuan Perwalian</div>
          <div style="font-size: 0.85rem; color: var(--text-main);">
            Rasulullah SAW bersabda: <em>"Tidak ada pernikahan tanpa adanya wali dan dua orang saksi yang adil."</em> (HR. Abu Dawud & Tirmidzi).<br>
            PMA Nomor 30 Tahun 2024 Pasal 12 ayat (2): <em>"Yang bertindak sebagai wali nikah ialah seorang laki-laki yang memenuhi syarat hukum Islam yakni laki-laki, Islam, balig, berakal, dan adil."</em>
          </div>
        `;

        showWaliResultModal(resultBox);

        // Update tree
        const currentTreeEl = document.getElementById(`tree-item-${currentWaliIndex}`);
        if (currentTreeEl) {
          currentTreeEl.className = 'wali-tree-item eligible';
          const statusEl = currentTreeEl.querySelector('.wali-node-status');
          if (statusEl) {
            statusEl.className = 'wali-node-status';
            statusEl.innerText = 'Memenuhi kriteria awal';
          }
        }

        // Update dashboard status
        localStorage.setItem('penghulu_last_wali', target.name);
        updateDashboardStats();

      } else {
        if (!waliAnswers.q5 && waliAnswers.q1 && waliAnswers.q2 && waliAnswers.q3 && waliAnswers.q4) {
          resultBox.className = 'wali-result-box hakim';
          document.getElementById('waliResultIcon').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
          document.getElementById('waliResultTitle').innerText = 'Perlu Pemeriksaan Lanjutan: Wali Tidak Hadir/Jauh';
          document.getElementById('waliResultExplanation').textContent = 'Karena keberadaan wali diketahui, ketidakhadiran atau jarak tidak otomatis menjadikan wali tersebut tidak diketahui keberadaannya dan tidak otomatis memindahkan kewalian kepada wali hakim. Periksa kemungkinan taukil wali di hadapan PPN sesuai domisili/keberadaan wali dan disaksikan 2 orang sebagaimana PMA Nomor 30 Tahun 2024 Pasal 12 ayat (5).';
          document.getElementById('waliResultNotes').textContent = 'Hasil pemeriksaan awal saja. Jangan menetapkan wali hakim hanya berdasarkan jawaban ini. Konsultasikan dan dokumentasikan pemeriksaan oleh pejabat KUA yang berwenang.';
          showWaliResultModal(resultBox);
          return;
        }
        // Ketidaklayakan pada urutan tertentu tetap memerlukan verifikasi dasar dan bukti.
        let reasons = [];
        if (!waliAnswers.q1) reasons.push('Telah wafat');
        if (!waliAnswers.q2) reasons.push('Syarat laki-laki dan/atau beragama Islam tidak terpenuhi');
        if (!waliAnswers.q3) reasons.push('Belum baligh atau tidak berakal sehat');
        if (!waliAnswers.q4) reasons.push('Syarat adil belum terpenuhi/perlu verifikasi');
        if (!waliAnswers.q5) reasons.push('Ghaib / mafqud / tidak dapat dihubungi');

        // Check if there is a next level
        if (currentWaliIndex < WALI_LEVELS.length - 1) {
          const nextIndex = currentWaliIndex + 1;
          showToast(`Hak wali ${target.name} gugur (${reasons.join(', ')}). Beralih ke urutan ${nextIndex + 1}.`);
          loadWaliStep(nextIndex);
        } else {
          // Semua urutan telah ditapis; hasil tetap harus ditetapkan pejabat berwenang.
          resultBox.className = 'wali-result-box hakim';
          document.getElementById('waliResultIcon').innerHTML = '<i class="fa-solid fa-gavel" style="color: var(--gold-dark);"></i>';
          document.getElementById('waliResultTitle').innerText = 'Perlu Pemeriksaan Pejabat Berwenang: Kemungkinan Wali Hakim';
          document.getElementById('waliResultExplanation').innerHTML = `
            Seluruh 17 urutan wali nasab sebagaimana daftar Pasal 12 ayat (3) PMA Nomor 30 Tahun 2024 telah melalui penyaringan awal. 
            PMA Nomor 30 Tahun 2024 Pasal 13 membatasi penggunaan wali hakim pada keadaan tertentu, antara lain wali nasab tidak ada, adhal (ditetapkan pengadilan), tidak diketahui keberadaannya dengan dokumen yang dipersyaratkan, tidak dapat ditemui karena dipenjara, tidak ada wali nasab yang beragama Islam, atau wali adalah calon pengantin itu sendiri. Seluruh alasan, bukti, dan prosedur wajib diperiksa pejabat berwenang. Aplikasi tidak menetapkan perpindahan wali secara otomatis.
          `;

          document.getElementById('waliResultNotes').innerHTML = `
            <div class="dalil-title"><i class="fa-solid fa-book-open"></i> Dalil Syar'i Penetapan Wali Hakim</div>
            <div class="dalil-arabic">فَإِنِ اشْتَجَرُوا فَالسُّلْطَانُ وَلِيُّ مَنْ لَا وَلِيَّ لَهُ</div>
            <div class="dalil-translation">"Jika mereka berselisih (atau tidak ada wali nasab), maka penguasa (Sulthan/Hakim) adalah wali bagi siapa yang tidak memiliki wali." (HR. Tirmidzi, Abu Dawud, dan Ahmad)</div>
            <div class="dalil-source">Ketentuan wali hakim dalam PMA Nomor 30 Tahun 2024 dan KHI Pasal 23 (verifikasi pasal/prosedur oleh petugas)</div>
          `;

          showWaliResultModal(resultBox);
          

          localStorage.setItem('penghulu_last_wali', 'Perlu verifikasi wali hakim oleh pejabat berwenang');
          updateDashboardStats();
        }
      }
    }

    function resetWaliChecker() {
      loadWaliStep(0);
      showToast('Formulir penentuan wali telah direset ke awal.');
    }

    /* ==========================================================================
       E. FEATURE 3: KALKULATOR MASA IDDAH LOGIC
       ========================================================================== */
    // Tanggal lokal tanpa parsing UTC agar tidak bergeser satu hari pada zona waktu tertentu.
    function parseLocalISODate(value) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return null;
      const [y, m, d] = value.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
    }

    function formatLocalISODate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    function addCalendarMonths(date, months) {
      const result = new Date(date.getFullYear(), date.getMonth(), 1);
      const targetMonth = result.getMonth() + months;
      result.setMonth(targetMonth);
      const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
      result.setDate(Math.min(date.getDate(), lastDay));
      return result;
    }

    function initIddahCalculator() {
      // Set default date to today
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      const dateInput = document.getElementById('iddahStartDate');
      if (dateInput) dateInput.value = dateStr;
      calculateIddah();
    }

    function calculateIddah() {
      const reason = document.getElementById('iddahReason').value;
      const startDateVal = document.getElementById('iddahStartDate').value;
      const isDukhul = document.getElementById('iddahDukhul').value === 'yes';
      const isHamil = document.getElementById('iddahHamil').value === 'yes';
      const haidStatus = document.getElementById('iddahHaidStatus').value;
      const estimatedBirth = document.getElementById('iddahEstimatedBirth').value;

      const grpStatusHaid = document.getElementById('grpStatusHaid');
      const grpEstimatedBirth = document.getElementById('grpEstimatedBirth');

      // Conditional Form UI Display
      if (isHamil) {
        grpStatusHaid.style.display = 'none';
        grpEstimatedBirth.style.display = 'block';
      } else {
        grpStatusHaid.style.display = 'block';
        grpEstimatedBirth.style.display = 'none';
      }

      if (!startDateVal) return;
      const startDate = parseLocalISODate(startDateVal);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!startDate) { showToast('Tanggal awal tidak valid.'); return; }
      if (startDate > today) { showToast('Tanggal awal tidak boleh berada di masa depan.'); return; }
      if (isHamil && !isDukhul && reason !== 'mati') {
        showToast('Kombinasi hamil dan belum dukhul perlu diperiksa kembali. Kalkulator tidak akan memberikan hasil otomatis untuk kondisi yang tidak konsisten.');
        return;
      }

      let ruleTitle = '';
      let daysDuration = 0;
      let exactEndDate = null;
      let endDateDescription = '';
      let calculationIsProvisional = false;
      let isDeliveryBased = false;
      let isNoIddah = false;
      let dalilHeading = '';
      let dalilAr = '';
      let dalilTr = '';
      let dalilSrc = '';
      let legalNotes = [];

      // Evaluation Rules
      // 1. Qabla Dukhul on Living Divorce (Talak, Gugat, Fasakh, Khulu)
      if (!isDukhul && reason !== 'mati') {
        isNoIddah = true;
        ruleTitle = 'Tidak Ada Iddah (Qabla Dukhul)';
        daysDuration = 0;
        dalilHeading = 'QS. Al-Ahzab: 49 (Tidak Ada Iddah bagi Qabla Dukhul)';
        dalilAr = 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نَكَحْتُمُ ٱلْمُؤْمِنَٰتِ ثُمَّ طَلَّقْتُمُوهُنَّ مِن قَبْلِ أَن تَمَسُّوهُنَّ فَمَا لَكُمْ عَلَيْهِنَّ مِنْ عِدَّةٍ تَعْتَدُّونَهَا';
        dalilTr = '"Wahai orang-orang yang beriman! Apabila kamu menikahi perempuan-perempuan mukmin, kemudian kamu ceraikan mereka sebelum kamu mencampurinya, maka tidak ada masa iddah atas mereka yang perlu kamu perhitungkan..."';
        dalilSrc = 'QS. Al-Ahzab: 49 & KHI Pasal 153 ayat (1)';
        legalNotes = [
          'Wanita yang diceraikan sebelum dukhul (campur) tidak wajib menjalani masa iddah.',
          'Mantan istri berhak langsung menikah kembali dengan pria lain seketika setelah ikrar cerai / putusan BHT.',
          'Suami wajib membayar setengah mahar jika mahar telah ditentukan saat akad, atau memberikan mut\'ah yang pantas.'
        ];
      }
      // 2. Pregnant Woman (Cerai Hidup maupun Cerai Mati)
      else if (isHamil) {
        isDeliveryBased = true;
        ruleTitle = 'Sampai Melahirkan Kandungan';
        dalilHeading = 'QS. At-Talaq: 4 (Iddah Wanita Hamil)';
        dalilAr = 'وَأُو۟لَٰتُ ٱلْأَحْمَالِ أَجَلُهُنَّ أَن يَضَعْنَ حَمْلَهُنَّ';
        dalilTr = '"Dan perempuan-perempuan yang hamil, waktu iddah mereka itu ialah sampai mereka melahirkan kandungannya..."';
        dalilSrc = 'QS. At-Talaq: 4 & KHI Pasal 153 ayat (2) huruf c';

        if (estimatedBirth) {
          const birthDate = parseLocalISODate(estimatedBirth);
          if (!birthDate || birthDate < startDate) { showToast('Perkiraan persalinan harus berupa tanggal valid setelah tanggal awal.'); return; }
          exactEndDate = birthDate;
          endDateDescription = 'Perkiraan persalinan (bukan tanggal berakhir yang pasti)';
          calculationIsProvisional = true;
        } else {
          endDateDescription = 'Berakhir saat persalinan aktual';
          calculationIsProvisional = true;
        }

        legalNotes = [
          'Masa iddah berakhir seketika begitu janin lahir (atau gugur kandungan), baik persalinan terjadi sesaat setelah cerai maupun berbulan-bulan kemudian.',
          'Mantan suami wajib menanggung nafkah tempat tinggal, pakaian, makanan, dan biaya perawatan kehamilan hingga persalinan tuntas.'
        ];
      }
      // 3. Cerai Mati (Wafat) - Tidak Hamil
      else if (reason === 'mati') {
        ruleTitle = '4 Bulan 10 Hari';
        endDateDescription = 'Perlu penetapan berdasarkan kalender Hijriah dan tanggal awal iddah';
        calculationIsProvisional = true;
        dalilHeading = 'QS. Al-Baqarah: 234 (Iddah Ditinggal Wafat Suami)';
        dalilAr = 'وَٱلَّذِينَ يُتَوَفَّوْنَ مِنكُمْ وَيَذَرُونَ أَزْوَٰجًا يَتَرَبَّصْنَ بِأَنفُسِهِنَّ أَرْبَعَةَ أَشْهُرٍ وَعَشْرًا';
        dalilTr = '"Dan orang-orang yang mati di antara kamu serta meninggalkan istri-istri hendaklah mereka (istri-istri) menahan dirinya (beriddah) empat bulan sepuluh hari..."';
        dalilSrc = 'QS. Al-Baqarah: 234 & KHI Pasal 153 ayat (2) huruf a';
        legalNotes = [
          'Jangan menyamakan 4 bulan 10 hari dengan angka tetap 130 hari. Penetapan tanggal akhir harus memperhatikan kalender Hijriah dan ketentuan yang berlaku.',
          'Wajib menjalankan ihdad (berkabung) selama masa iddah: tidak berhias berlebihan, tidak memakai wewangian, dan tidak menerima pinangan sharih.'
        ];
      }
      // 4. Cerai Hidup - Masih Haid (3 Quru')
      else if (haidStatus === 'masih_haid') {
        ruleTitle = '3 Kali Suci (Quru’)';
        endDateDescription = 'Tidak dapat dipastikan hanya dengan hitungan 90 hari; verifikasi tiga masa suci aktual';
        calculationIsProvisional = true;
        dalilHeading = 'QS. Al-Baqarah: 228 (Iddah Cerai Haid 3 Quru\')';
        dalilAr = 'وَٱلْمُطَلَّقَٰتُ يَتَرَبَّصْنَ بِأَنفُسِهِنَّ ثَلَٰثَةَ قُرُوٓءٍ';
        dalilTr = '"Wanita-wanita yang ditalak hendaklah menahan diri (menunggu) tiga kali quru\'..."';
        dalilSrc = 'QS. Al-Baqarah: 228 & KHI Pasal 153 ayat (2) huruf b';
        legalNotes = [
          'Quru\' menurut madzhab Syafi\'i adalah masa suci di antara dua haid (3 kali suci).',
          'Aplikasi tidak menetapkan tanggal akhir berdasarkan 90 hari. Akhir iddah perlu diverifikasi dari siklus haid/suci aktual dan pedoman fikih yang digunakan.',
          'Jika ditalak raj\'i (talak 1 atau 2), mantan suami berhak merujuk kembali tanpa akad baru selama masa suci belum berakhir.'
        ];
      }
      // 5. Cerai Hidup - Menopause atau Belum Haid
      else {
        const isMeno = (haidStatus === 'menopause');
        ruleTitle = isMeno ? '3 Bulan (Menopause)' : '3 Bulan (Belum Haid)';
        exactEndDate = addCalendarMonths(startDate, 3);
        endDateDescription = 'Proyeksi tiga bulan kalender Masehi; verifikasi dasar hukum dan tanggal penetapan';
        calculationIsProvisional = true;
        dalilHeading = 'QS. At-Talaq: 4 (Iddah Menopause & Belum Pernah Haid)';
        dalilAr = 'وَٱلَّٰٓـِٔى يَئِسْنَ مِنَ ٱلْمَحِيضِ مِن نِّسَآئِكُمْ إِنِ ٱرْتَبْتُمْ فَعِدَّتُهُنَّ ثَلَٰثَةُ أَشْهُرٍ وَٱلَّٰٓـِٔى لَمْ يَحِضْنَ';
        dalilTr = '"Dan perempuan-perempuan yang tidak haid lagi (menopause) di antara perempuan-perempuanmu jika kamu ragu-ragu (tentang masa iddahnya), maka masa iddah mereka adalah tiga bulan; dan begitu (pula) perempuan-perempuan yang tidak haid..."';
        dalilSrc = 'QS. At-Talaq: 4 & KHI Pasal 153 ayat (2) huruf b';
        legalNotes = [
          'Gunakan tiga bulan kalender, bukan angka tetap 90 hari. Tanggal yang ditampilkan merupakan proyeksi kalender Masehi dan harus diverifikasi terhadap ketentuan yang berlaku.',
          'Berhak memperoleh nafkah iddah selama masa tunggu apabila perceraian bukan karena nusyuz (durhaka).'
        ];
      }

      // Tanggal akhir hanya dihitung untuk kasus yang memiliki dasar kalender yang dapat diproyeksikan.
      // Quru', iddah wafat, dan persalinan aktual tidak boleh dipaksakan menjadi angka hari tetap.
      const endDate = exactEndDate;
      const remainingDays = endDate ? Math.ceil((endDate - today) / 86400000) : null;
      const totalSpanMs = endDate ? endDate - startDate : 0;
      const elapsedMs = today - startDate;
      let percentElapsed = 0;
      if (isNoIddah) percentElapsed = 100;
      else if (endDate && totalSpanMs > 0) percentElapsed = Math.min(100, Math.max(0, Math.round((elapsedMs / totalSpanMs) * 100)));

      // DOM Updates
      document.getElementById('iddahDurationText').innerText = ruleTitle;
      document.getElementById('iddahEndDateText').innerText = isNoIddah ? 'Seketika (Tanpa Iddah)' : (endDate ? formatIndoDate(endDate) + (calculationIsProvisional ? ' (proyeksi)' : '') : endDateDescription);
      
      const elRemaining = document.getElementById('iddahRemainingDays');
      const elBadge = document.getElementById('iddahStatusBadge');

      if (isNoIddah) {
        elRemaining.innerText = '0 Hari';
        elBadge.className = 'badge badge-success';
        elBadge.innerText = 'Langsung Boleh Menikah';
      } else if (remainingDays === null) {
        elRemaining.innerText = 'Perlu verifikasi';
        elRemaining.style.color = 'var(--text-main)';
        elBadge.className = 'badge badge-warning';
        elBadge.innerText = 'Tidak dapat dipastikan otomatis';
      } else if (calculationIsProvisional) {
        elRemaining.innerText = remainingDays > 0 ? `${remainingDays} Hari menuju tanggal proyeksi` : 'Tanggal proyeksi terlewati';
        elRemaining.style.color = 'var(--text-main)';
        elBadge.className = 'badge badge-warning';
        elBadge.innerText = 'Proyeksi — wajib verifikasi';
      } else if (remainingDays <= 0) {
        elRemaining.innerText = 'Telah Tuntas';
        elRemaining.style.color = '#10b981';
        elBadge.className = 'badge badge-success';
        elBadge.innerText = 'Iddah Selesai';
      } else {
        elRemaining.innerText = `${remainingDays} Hari Lagi`;
        elRemaining.style.color = 'var(--primary-dark)';
        elBadge.className = 'badge badge-warning';
        elBadge.innerText = 'Sedang Berjalan';
      }

      // Timeline labels
      document.getElementById('timelineStartLabel').innerText = `Mulai: ${startDate.getDate()} ${BULAN_INDO[startDate.getMonth()]}`;
      document.getElementById('timelineEndLabel').innerText = isNoIddah ? 'Selesai: Hari Itu Juga' : (endDate ? `Proyeksi: ${endDate.getDate()} ${BULAN_INDO[endDate.getMonth()]}` : 'Akhir: perlu verifikasi');
      document.getElementById('timelineProgressFill').style.width = `${percentElapsed}%`;
      document.getElementById('timelinePercentLabel').innerText = isNoIddah ? 'Tidak ada masa tunggu yang perlu dihitung.' : (remainingDays === null ? 'Progres dan tanggal akhir tidak dapat ditetapkan otomatis untuk jenis iddah ini. Perlu pemeriksaan petugas.' : `Proyeksi progres ${percentElapsed}% (${remainingDays > 0 ? remainingDays + ' hari menuju tanggal proyeksi' : 'tanggal proyeksi terlewati'}). Bukan penetapan hukum final.`);

      // Dalil
      document.getElementById('iddahDalilHeading').innerText = dalilHeading;
      document.getElementById('iddahDalilArabic').innerText = dalilAr;
      document.getElementById('iddahDalilTranslation').innerText = dalilTr;
      document.getElementById('iddahDalilSource').innerText = dalilSrc;

      // Notes
      const notesUl = document.getElementById('iddahLegalNotes');
      notesUl.innerHTML = legalNotes.map(n => `<li>${n}</li>`).join('') + (!isNoIddah ? '<li><strong>Catatan penting:</strong> hasil ini hanya alat bantu awal, bukan penetapan hukum atau izin menikah. Verifikasi dokumen, tanggal mulai, kondisi faktual, dan ketentuan yang berlaku oleh petugas/pejabat berwenang.</li>' : '');
    }

    /* ==========================================================================
       F. FEATURE 4: TERJEMAH MAHAR LOGIC
       ========================================================================== */
    function toggleMaharDictionary(button) {
      const panel = document.getElementById('mahar-subtab-kamus');
      if (!panel || !button) return;
      const isOpen = panel.classList.toggle('mahar-dictionary-open');
      button.classList.toggle('active', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
      const chevron = button.querySelector('.mahar-toggle-chevron');
      if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      if (isOpen) {
        document.querySelectorAll('#section-mahar .subtab-pane').forEach(p => {
          if (p.id !== 'mahar-subtab-kamus') p.classList.remove('active');
        });
        panel.scrollIntoView({behavior:'smooth',block:'nearest'});
      }
    }

    function switchMaharSubtab(subtabKey, btnElement) {
      document.querySelectorAll('#section-mahar .subtabs-bar .subtab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('#section-mahar .subtab-pane').forEach(p => p.classList.remove('active', 'mahar-dictionary-open'));
      const dictionaryButton = document.getElementById('maharDictionaryToggle');
      if (dictionaryButton) {
        dictionaryButton.setAttribute('aria-expanded', 'false');
        const chevron = dictionaryButton.querySelector('.mahar-toggle-chevron');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
      if (btnElement) btnElement.classList.add('active');
      const pane = document.getElementById(`mahar-subtab-${subtabKey}`);
      if (pane) pane.classList.add('active');
    }

    // Indonesian Terbilang Algorithm (Up to Trillions)
    function terbilangIndo(n) {
      n = Math.floor(Math.abs(Number(n) || 0));
      if (n === 0) return 'Nol';

      const satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

      function baca(num) {
        if (num < 12) return satuan[num];
        if (num < 20) return baca(num - 10) + ' belas';
        if (num < 100) return baca(Math.floor(num / 10)) + ' puluh' + (num % 10 !== 0 ? ' ' + baca(num % 10) : '');
        if (num < 200) return 'seratus' + (num % 100 !== 0 ? ' ' + baca(num - 100) : '');
        if (num < 1000) return baca(Math.floor(num / 100)) + ' ratus' + (num % 100 !== 0 ? ' ' + baca(num % 100) : '');
        if (num < 2000) return 'seribu' + (num % 1000 !== 0 ? ' ' + baca(num - 1000) : '');
        if (num < 1000000) return baca(Math.floor(num / 1000)) + ' ribu' + (num % 1000 !== 0 ? ' ' + baca(num % 1000) : '');
        if (num < 1000000000) return baca(Math.floor(num / 1000000)) + ' juta' + (num % 1000000 !== 0 ? ' ' + baca(num % 1000000) : '');
        if (num < 1000000000000) return baca(Math.floor(num / 1000000000)) + ' miliar' + (num % 1000000000 !== 0 ? ' ' + baca(num % 1000000000) : '');
        return baca(Math.floor(num / 1000000000000)) + ' triliun' + (num % 1000000000000 !== 0 ? ' ' + baca(num % 1000000000000) : '');
      }

      const res = baca(n).trim();
      return res.charAt(0).toUpperCase() + res.slice(1);
    }

    // Convert Hindu-Arabic digits 0-9 to Eastern Arabic Numerals
    function toEasternArabicNumerals(num) {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      const formatted = Number(num).toLocaleString('en-US');
      return formatted.replace(/[0-9]/g, d => arabicDigits[d]).replace(/,/g, '٬');
    }

    // Arabic Tafqit (Arabic Number Words with Nahwu Sharaf Rules)
    function angkaKeTafqitArab(n, unitType = 'rupiah', inMajrur = false) {
      // Handle floating point for weight (e.g. 2.5, 5.5, 0.5)
      const numVal = Number(n) || 0;
      const isFloat = !Number.isInteger(numVal);
      if (isFloat && (unitType === 'gram' || unitType === 'mitsqal')) {
        const intPart = Math.floor(numVal);
        const frac = Number((numVal - intPart).toFixed(2));

        let fracText = '';
        if (frac === 0.5) fracText = inMajrur ? 'وَنِصْفٍ' : 'وَنِصْفٌ';
        else if (frac === 0.25) fracText = inMajrur ? 'وَرُبْعٍ' : 'وَرُبْعٌ';
        else if (frac === 0.75) fracText = inMajrur ? 'وَثَلَاثَةِ أَرْبَاعٍ' : 'وَثَلَاثَةُ أَرْبَاعٍ';

        if (fracText) {
          if (intPart === 0) {
            if (frac === 0.5) {
              return unitType === 'gram' 
                ? (inMajrur ? 'نِصْفِ غَرَامٍ' : 'نِصْفُ غَرَامٍ') 
                : (inMajrur ? 'نِصْفِ مِثْقَالٍ' : 'نِصْفُ مِثْقَالٍ');
            }
            if (frac === 0.25) {
              return unitType === 'gram'
                ? (inMajrur ? 'رُبْعِ غَرَامٍ' : 'رُبْعُ غَرَامٍ')
                : (inMajrur ? 'رُبْعِ مِثْقَالٍ' : 'رُبْعُ مِثْقَالٍ');
            }
          }
          const baseStr = angkaKeTafqitArab(intPart, unitType, inMajrur);
          return baseStr + ' ' + fracText;
        }
      }

      const numInt = Math.floor(Math.abs(numVal));

      // Determine gender of counted noun:
      // 'rupiah' -> mu'annats ('f')
      // 'gram', 'mitsqal', 'm' -> mudzakkar ('m')
      let gender = 'f';
      if (unitType === 'gram' || unitType === 'mitsqal' || unitType === 'm') {
        gender = 'm';
      }

      // Base 0
      if (numInt === 0) {
        if (unitType === 'rupiah') return 'صِفْرُ رُوبِيَّةٍ';
        if (unitType === 'gram') return inMajrur ? 'صِفْرِ غَرَامٍ' : 'صِفْرُ غَرَامٍ';
        if (unitType === 'mitsqal') return inMajrur ? 'صِفْرِ مِثْقَالٍ' : 'صِفْرُ مِثْقَالٍ';
        return 'صِفْرٌ';
      }

      // Special 1 and 2 (Na'at following noun)
      if (numInt === 1) {
        if (unitType === 'rupiah') return inMajrur ? 'رُوبِيَّةٍ وَاحِدَةٍ' : 'رُوبِيَّةٌ وَاحِدَةٌ';
        if (unitType === 'gram') return inMajrur ? 'غَرَامٍ وَاحِدٍ' : 'غَرَامٌ وَاحِدٌ';
        if (unitType === 'mitsqal') return inMajrur ? 'مِثْقَالٍ وَاحِدٍ' : 'مِثْقَالٌ وَاحِدٌ';
      }
      if (numInt === 2) {
        if (unitType === 'rupiah') return inMajrur ? 'رُوبِيَّتَيْنِ' : 'رُوبِيَّتَانِ';
        if (unitType === 'gram') return inMajrur ? 'غَرَامَيْنِ' : 'غَرَامَانِ';
        if (unitType === 'mitsqal') return inMajrur ? 'مِثْقَالَيْنِ' : 'مِثْقَالَانِ';
      }

      // Helper for 1-999 chunk conversion
      function convertChunk1to999(num, targetGender, isMajrurChunk) {
        if (num === 0) return '';
        const h = Math.floor(num / 100);
        const rem = num % 100;
        const parts = [];

        // Hundreds (مائة)
        if (h > 0) {
          const hundredsMap = {
            1: isMajrurChunk ? 'مِائَةِ' : 'مِائَةُ',
            2: isMajrurChunk ? 'مِائَتَيْ' : 'مِائَتَا',
            3: isMajrurChunk ? 'ثَلَاثِمِائَةِ' : 'ثَلَاثُمِائَةِ',
            4: isMajrurChunk ? 'أَرْبَعِمِائَةِ' : 'أَرْبَعُمِائَةِ',
            5: isMajrurChunk ? 'خَمْسِمِائَةِ' : 'خَمْسُمِائَةِ',
            6: isMajrurChunk ? 'سِتِّمِائَةِ' : 'سِتُّمِائَةِ',
            7: isMajrurChunk ? 'سَبْعِمِائَةِ' : 'سَبْعُمِائَةِ',
            8: isMajrurChunk ? 'ثَمَانِمِائَةِ' : 'ثَمَانِمِائَةِ',
            9: isMajrurChunk ? 'تِسْعِمِائَةِ' : 'تِسْعُمِائَةِ'
          };
          if (rem === 0) {
            const isolatedHundreds = {
              1: isMajrurChunk ? 'مِائَةٍ' : 'مِائَةٌ',
              2: isMajrurChunk ? 'مِائَتَيْنِ' : 'مِائَتَانِ',
              3: isMajrurChunk ? 'ثَلَاثِمِائَةٍ' : 'ثَلَاثُمِائَةٍ',
              4: isMajrurChunk ? 'أَرْبَعِمِائَةٍ' : 'أَرْبَعُمِائَةٍ',
              5: isMajrurChunk ? 'خَمْسِمِائَةٍ' : 'خَمْسُمِائَةٍ',
              6: isMajrurChunk ? 'سِتِّمِائَةٍ' : 'سِتُّمِائَةٍ',
              7: isMajrurChunk ? 'سَبْعِمِائَةٍ' : 'سَبْعُمِائَةٍ',
              8: isMajrurChunk ? 'ثَمَانِمِائَةٍ' : 'ثَمَانِمِائَةٍ',
              9: isMajrurChunk ? 'تِسْعِمِائَةٍ' : 'تِسْعُمِائَةٍ'
            };
            parts.push(isolatedHundreds[h]);
          } else {
            parts.push(hundredsMap[h].replace(/ِ$/, 'ٍ').replace(/ُ$/, 'ٌ'));
          }
        }

        // Remainder 1-99
        if (rem > 0) {
          if (rem <= 10) {
            if (targetGender === 'f') {
              // Mu'annats ma'dud: 1-2 mu'annats, 3-10 mudzakkar (opposite)
              const fUnits = {
                1: isMajrurChunk ? 'وَاحِدَةٍ' : 'وَاحِدَةٌ',
                2: isMajrurChunk ? 'اثْنَتَيْنِ' : 'اثْنَتَانِ',
                3: isMajrurChunk ? 'ثَلَاثِ' : 'ثَلَاثُ',
                4: isMajrurChunk ? 'أَرْبَعِ' : 'أَرْبَعُ',
                5: isMajrurChunk ? 'خَمْسِ' : 'خَمْسُ',
                6: isMajrurChunk ? 'سِتِّ' : 'سِتُّ',
                7: isMajrurChunk ? 'سَبْعِ' : 'سَبْعُ',
                8: isMajrurChunk ? 'ثَمَانِي' : 'ثَمَانِي',
                9: isMajrurChunk ? 'تِسْعِ' : 'تِسْعُ',
                10: isMajrurChunk ? 'عَشْرِ' : 'عَشْرُ'
              };
              parts.push(fUnits[rem]);
            } else {
              // Mudzakkar ma'dud: 1-2 mudzakkar, 3-10 mu'annats with ta marbutah (opposite)
              const mUnits = {
                1: isMajrurChunk ? 'وَاحِدٍ' : 'وَاحِدٌ',
                2: isMajrurChunk ? 'اثْنَيْنِ' : 'اثْنَانِ',
                3: isMajrurChunk ? 'ثَلَاثَةِ' : 'ثَلَاثَةُ',
                4: isMajrurChunk ? 'أَرْبَعَةِ' : 'أَرْبَعَةُ',
                5: isMajrurChunk ? 'خَمْسَةِ' : 'خَمْسَةُ',
                6: isMajrurChunk ? 'سِتَّةِ' : 'سِتَّةُ',
                7: isMajrurChunk ? 'سَبْعَةِ' : 'سَبْعَةُ',
                8: isMajrurChunk ? 'ثَمَانِيَةِ' : 'ثَمَانِيَةُ',
                9: isMajrurChunk ? 'تِسْعَةِ' : 'تِسْعَةُ',
                10: isMajrurChunk ? 'عَشَرَةِ' : 'عَشَرَةُ'
              };
              parts.push(mUnits[rem]);
            }
          } else if (rem >= 11 && rem <= 19) {
            if (targetGender === 'f') {
              const fTeens = {
                11: 'إِحْدَى عَشْرَةَ',
                12: isMajrurChunk ? 'اثْنَتَيْ عَشْرَةَ' : 'اثْنَتَا عَشْرَةَ',
                13: 'ثَلَاثَ عَشْرَةَ',
                14: 'أَرْبَعَ عَشْرَةَ',
                15: 'خَمْسَ عَشْرَةَ',
                16: 'سِتَّ عَشْرَةَ',
                17: 'سَبْعَ عَشْرَةَ',
                18: 'ثَمَانِيَ عَشْرَةَ',
                19: 'تِسْعَ عَشْرَةَ'
              };
              parts.push(fTeens[rem]);
            } else {
              const mTeens = {
                11: 'أَحَدَ عَشَرَ',
                12: isMajrurChunk ? 'اثْنَيْ عَشَرَ' : 'اثْنَا عَشَرَ',
                13: 'ثَلَاثَةَ عَشَرَ',
                14: 'أَرْبَعَةَ عَشَرَ',
                15: 'خَمْسَةَ عَشَرَ',
                16: 'سِتَّةَ عَشَرَ',
                17: 'سَبْعَةَ عَشَرَ',
                18: 'ثَمَانِيَةَ عَشَرَ',
                19: 'تِسْعَةَ عَشَرَ'
              };
              parts.push(mTeens[rem]);
            }
          } else {
            // 20-99
            const u = rem % 10;
            const t = Math.floor(rem / 10);
            const tensMap = {
              2: isMajrurChunk ? 'عِشْرِينَ' : 'عِشْرُونَ',
              3: isMajrurChunk ? 'ثَلَاثِينَ' : 'ثَلَاثُونَ',
              4: isMajrurChunk ? 'أَرْبَعِينَ' : 'أَرْبَعُونَ',
              5: isMajrurChunk ? 'خَمْسِينَ' : 'خَمْسُونَ',
              6: isMajrurChunk ? 'سِتِّينَ' : 'سِتُّونَ',
              7: isMajrurChunk ? 'سَبْعِينَ' : 'سَبْعُونَ',
              8: isMajrurChunk ? 'ثَمَانِينَ' : 'ثَمَانُونَ',
              9: isMajrurChunk ? 'تِسْعِينَ' : 'تِسْعُونَ'
            };

            if (u === 0) {
              parts.push(tensMap[t]);
            } else {
              let unitWord = '';
              if (targetGender === 'f') {
                const uF = {
                  1: 'إِحْدَى',
                  2: isMajrurChunk ? 'اثْنَتَيْنِ' : 'اثْنَتَانِ',
                  3: isMajrurChunk ? 'ثَلَاثٍ' : 'ثَلَاثٌ',
                  4: isMajrurChunk ? 'أَرْبَعٍ' : 'أَرْبَعٌ',
                  5: isMajrurChunk ? 'خَمْسٍ' : 'خَمْسٌ',
                  6: isMajrurChunk ? 'سِتٍّ' : 'سِتٌّ',
                  7: isMajrurChunk ? 'سَبْعٍ' : 'سَبْعٌ',
                  8: isMajrurChunk ? 'ثَمَانٍ' : 'ثَمَانٍ',
                  9: isMajrurChunk ? 'تِسْعٍ' : 'تِسْعٌ'
                };
                unitWord = uF[u];
              } else {
                const uM = {
                  1: isMajrurChunk ? 'وَاحِدٍ' : 'وَاحِدٌ',
                  2: isMajrurChunk ? 'اثْنَيْنِ' : 'اثْنَانِ',
                  3: isMajrurChunk ? 'ثَلَاثَةٍ' : 'ثَلَاثَةٌ',
                  4: isMajrurChunk ? 'أَرْبَعَةٍ' : 'أَرْبَعَةٌ',
                  5: isMajrurChunk ? 'خَمْسَةٍ' : 'خَمْسَةٌ',
                  6: isMajrurChunk ? 'سِتَّةٍ' : 'سِتَّةٌ',
                  7: isMajrurChunk ? 'سَبْعَةٍ' : 'سَبْعَةٌ',
                  8: isMajrurChunk ? 'ثَمَانِيَةٍ' : 'ثَمَانِيَةٌ',
                  9: isMajrurChunk ? 'تِسْعَةٍ' : 'تِسْعَةٌ'
                };
                unitWord = uM[u];
              }
              parts.push(unitWord + ' وَ' + tensMap[t]);
            }
          }
        }
        return parts.join(' وَ');
      }

      const billions = Math.floor(numInt / 1000000000);
      const millions = Math.floor((numInt % 1000000000) / 1000000);
      const thousands = Math.floor((numInt % 1000000) / 1000);
      const rest = numInt % 1000;

      const sections = [];

      // Billions (milyar is masculine)
      if (billions > 0) {
        if (billions === 1) sections.push(inMajrur ? 'مِلْيَارِ' : 'مِلْيَارُ');
        else if (billions === 2) sections.push(inMajrur ? 'مِلْيَارَيْ' : 'مِلْيَارَا');
        else if (billions >= 3 && billions <= 10) sections.push(convertChunk1to999(billions, 'm', inMajrur) + ' مِلْيَارَاتٍ');
        else sections.push(convertChunk1to999(billions, 'm', inMajrur) + ' مِلْيَارًا');
      }

      // Millions (milyun is masculine)
      if (millions > 0) {
        if (millions === 1) sections.push(inMajrur ? 'مِلْيُونِ' : 'مِلْيُونُ');
        else if (millions === 2) sections.push(inMajrur ? 'مِلْيُونَيْ' : 'مِلْيُونَانِ');
        else if (millions >= 3 && millions <= 10) sections.push(convertChunk1to999(millions, 'm', inMajrur) + ' مَلَايِينَ');
        else sections.push(convertChunk1to999(millions, 'm', inMajrur) + ' مِلْيُونًا');
      }

      // Thousands (alf is masculine)
      if (thousands > 0) {
        if (thousands === 1) sections.push(inMajrur ? 'أَلْفِ' : 'أَلْفُ');
        else if (thousands === 2) sections.push(inMajrur ? 'أَلْفَيْ' : 'أَلْفَا');
        else if (thousands >= 3 && thousands <= 10) sections.push(convertChunk1to999(thousands, 'm', inMajrur) + ' آلَافٍ');
        else sections.push(convertChunk1to999(thousands, 'm', inMajrur) + ' أَلْفًا');
      }

      // Remainder (1-999) follows the gender of the counted word
      if (rest > 0) {
        sections.push(convertChunk1to999(rest, gender, inMajrur));
      }

      const numberString = sections.join(' وَ');

      if (unitType === 'none' || unitType === 'f' || unitType === 'm') {
        return numberString;
      }

      // Determine Tamyiz Suffix
      const lastVal = rest > 0 ? rest : (thousands > 0 ? thousands : (millions > 0 ? millions : billions));
      const lastScale = rest > 0 ? 'units' : (thousands > 0 ? 'thousands' : (millions > 0 ? 'millions' : 'billions'));

      if (unitType === 'rupiah') {
        let tamyiz = 'رُوبِيَّةٍ';
        if (lastScale === 'units') {
          const rem100 = lastVal % 100;
          if (rem100 >= 3 && rem100 <= 10) {
            tamyiz = 'رُوبِيَّاتٍ'; // Plural genitive for 3-10
          } else if (rem100 >= 11 && rem100 <= 99) {
            tamyiz = 'رُوبِيَّةً'; // Singular accusative for 11-99
          } else {
            tamyiz = 'رُوبِيَّةٍ'; // Singular genitive for hundreds
          }
        }
        return numberString + ' ' + tamyiz;
      }

      if (unitType === 'gram') {
        let tamyiz = 'غَرَامٍ';
        if (lastScale === 'units') {
          const rem100 = lastVal % 100;
          if (rem100 >= 3 && rem100 <= 10) {
            tamyiz = 'غَرَامَاتٍ'; // Plural genitive for 3-10
          } else if (rem100 >= 11 && rem100 <= 99) {
            tamyiz = 'غَرَامًا'; // Singular accusative for 11-99
          } else {
            tamyiz = 'غَرَامٍ';
          }
        }
        return numberString + ' ' + tamyiz;
      }

      if (unitType === 'mitsqal') {
        let tamyiz = 'مِثْقَالٍ';
        if (lastScale === 'units') {
          const rem100 = lastVal % 100;
          if (rem100 >= 3 && rem100 <= 10) {
            tamyiz = 'مَثَاقِيلَ'; // Plural genitive mamnu' minash sharf
          } else if (rem100 >= 11 && rem100 <= 99) {
            tamyiz = 'مِثْقَالًا';
          } else {
            tamyiz = 'مِثْقَالٍ';
          }
        }
        return numberString + ' ' + tamyiz;
      }

      return numberString;
    }

    // English Number Words
    function numberToEnglishWords(n) {
      n = Math.floor(Math.abs(Number(n) || 0));
      if (n === 0) return 'Zero';

      const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

      function inWords(num) {
        if (num < 20) return a[num];
        if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + a[num % 10] : '');
        if (num < 1000) return a[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' and ' + inWords(num % 100) : '');
        if (num < 1000000) return inWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 !== 0 ? ' ' + inWords(num % 1000) : '');
        if (num < 1000000000) return inWords(Math.floor(num / 1000000)) + ' million' + (num % 1000000 !== 0 ? ' ' + inWords(num % 1000000) : '');
        return inWords(Math.floor(num / 1000000000)) + ' billion' + (num % 1000000000 !== 0 ? ' ' + inWords(num % 1000000000) : '');
      }

      const res = inWords(n).trim();
      return res.charAt(0).toUpperCase() + res.slice(1);
    }

    // MAHAR_CURRENCIES is loaded from its page-specific data file.


    function translateMaharNumber() {
      const input = document.getElementById('maharNumberInput');
      const raw = input.value;
      const num = Number(raw);
      const code = document.getElementById('maharCurrencySelect')?.value || 'IDR';
      const currency = MAHAR_CURRENCIES[code] || MAHAR_CURRENCIES.IDR;
      const symbol = document.getElementById('maharCurrencySymbol');
      if (symbol) symbol.textContent = currency.symbol;

      if (raw.trim() === '' || !Number.isFinite(num) || num < 0 || num > 999999999999) {
        ['resTerbilangId','resArabicNumerals','resArabicWords','resEnglishWords','resMalayWords'].forEach(id => {
          const el = document.getElementById(id); if (el) el.textContent = 'Masukkan nominal 0 sampai 999.999.999.999.';
        });
        return;
      }
      const amount = Math.floor(num);
      const indo = terbilangIndo(amount) + ' ' + currency.id;
      const arabNum = toEasternArabicNumerals(amount) + ' ' + currency.ar;
      const arabWords = `${angkaKeTafqitArab(amount, 'm', false)} ${currency.ar}`;
      const english = numberToEnglishWords(amount) + ' ' + (amount === 1 ? currency.en : currency.enPlural);
      const malay = terbilangIndo(amount) + ' ' + currency.id;

      document.getElementById('resTerbilangId').textContent = indo.charAt(0).toUpperCase() + indo.slice(1);
      document.getElementById('resArabicNumerals').textContent = arabNum;
      document.getElementById('resArabicWords').textContent = arabWords;
      document.getElementById('resEnglishWords').textContent = english;
      document.getElementById('resMalayWords').textContent = malay.charAt(0).toUpperCase() + malay.slice(1);
    }

    function setMaharPreset(val) {
      document.getElementById('maharNumberInput').value = val;
      translateMaharNumber();
    }

    // BUILDER
    function buildMaharSentence() {
      const shalatItem = document.getElementById('bldItemShalat').value;
      const cash = Number(document.getElementById('bldCashAmount').value) || 0;
      const cashCode = document.getElementById('bldCashCurrency')?.value || 'IDR';
      const cashCurrency = MAHAR_CURRENCIES[cashCode] || MAHAR_CURRENCIES.IDR;
      const goldType = document.getElementById('bldGoldType').value;
      const goldWeight = Number(document.getElementById('bldGoldWeight').value) || 0;
      const payStatus = document.getElementById('bldPayStatus').value;

      let partsId = [];
      let partsAr = [];
      let partsEn = [];

      // Component 1: Shalat / Quran
      if (shalatItem === 'sholat') {
        partsId.push('seperangkat alat shalat');
        partsAr.push('مَجْمُوعَةُ أَدَوَاتِ الصَّلَاةِ');
        partsEn.push('a set of prayer equipment');
      } else if (shalatItem === 'quran') {
        partsId.push('mushaf Al-Qur\'an');
        partsAr.push('مُصْحَفُ القُرْآنِ الكَرِيمِ');
        partsEn.push('the Holy Quran');
      } else if (shalatItem === 'sholat_quran') {
        partsId.push('seperangkat alat shalat dan mushaf Al-Qur\'an');
        partsAr.push('مَجْمُوعَةُ أَدَوَاتِ الصَّلَاةِ وَمُصْحَفُ القُرْآنِ الكَرِيمِ');
        partsEn.push('a set of prayer equipment and the Holy Quran');
      } else if (shalatItem === 'sajadah') {
        partsId.push('sajadah dan mukenah');
        partsAr.push('سَجَّادَةٌ وَثَوْبُ الصَّلَاةِ لِلْمَرْأَةِ');
        partsEn.push('a prayer mat and prayer garment');
      }

      // Component 2: Cash with Nahwu Sharaf
      if (cash > 0) {
        const cashFmt = cashCurrency.symbol + ' ' + cash.toLocaleString('id-ID');
        const cashWords = terbilangIndo(cash).toLowerCase();
        partsId.push(`uang tunai sebesar ${cashFmt} (${cashWords} ${cashCurrency.id})`);
        partsAr.push(`نَقْدٌ مَالِيٌّ قَدْرُهُ ${angkaKeTafqitArab(cash, 'm', false)} ${cashCurrency.ar}`);
        partsEn.push(`cash in the amount of ${cash.toLocaleString('en-US')} ${cashCurrency.enPlural}`);
      }

      // Component 3: Gold / Metal with Nahwu Sharaf
      if (goldType !== 'none' && goldWeight > 0) {
        const typeMap = {
          'cincin_emas': { id: 'cincin emas', ar: 'خَاتَمُ ذَهَبٍ', en: 'gold ring' },
          'logam_mulia': { id: 'logam mulia emas murni', ar: 'سَبِيكَةُ ذَهَبٍ خَالِصٍ', en: 'fine gold bullion' },
          'kalung_emas': { id: 'kalung emas', ar: 'قِلَادَةُ ذَهَبٍ', en: 'gold necklace' },
          'gelang_emas': { id: 'gelang emas', ar: 'سِوَارُ ذَهَبٍ', en: 'gold bracelet' },
          'cincin_perak': { id: 'cincin perak', ar: 'خَاتَمُ فِضَّةٍ', en: 'silver ring' }
        };
        const meta = typeMap[goldType] || { id: 'perhiasan', ar: 'حُلِيٌّ', en: 'jewelry' };
        partsId.push(`${meta.id} seberat ${goldWeight} gram`);
        // Gram counting in majrur position after preposition بِوَزْنِ
        const weightAr = angkaKeTafqitArab(goldWeight, 'gram', true);
        partsAr.push(`${meta.ar} بِوَزْنِ ${weightAr}`);
        partsEn.push(`a ${goldWeight}-gram ${meta.en}`);
      }

      if (partsId.length === 0) {
        partsId.push('seperangkat alat shalat');
        partsAr.push('مَجْمُوعَةُ أَدَوَاتِ الصَّلَاةِ');
        partsEn.push('a set of prayer equipment');
      }

      const joinId = partsId.join(', ');
      const joinAr = partsAr.join('، وَ');
      const joinEn = partsEn.join(', and ');

      const payId = (payStatus === 'tunai') ? 'dibayar tunai.' : 'dibayar hutang.';
      const payAr = (payStatus === 'tunai') ? 'حَالاً.' : 'مُؤَجَّلاً.';
      const payEn = (payStatus === 'tunai') ? 'paid in cash.' : 'deferred (credit).';

      const finalId = (joinId.charAt(0).toUpperCase() + joinId.slice(1)) + ' ' + payId;
      const finalAr = joinAr + ' ' + payAr;
      const finalEn = (joinEn.charAt(0).toUpperCase() + joinEn.slice(1)) + ' ' + payEn;

      document.getElementById('bldResultId').innerText = finalId;
      document.getElementById('bldResultAr').innerText = finalAr;
      document.getElementById('bldResultEn').innerText = finalEn;
    }

    // DICTIONARY
    function initMaharDictionary() {
      renderMaharDictionary(MAHAR_DICTIONARY);
    }

    function renderMaharDictionary(items) {
      const tbody = document.getElementById('maharDictBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding:20px;">Tidak ditemukan istilah yang cocok.</td></tr>`;
        return;
      }

      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <strong>${item.id}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.cat}</div>
          </td>
          <td class="ar">${item.ar}</td>
          <td>${item.en}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    function filterMaharDictionary() {
      const q = document.getElementById('maharSearchInput').value.toLowerCase().trim();
      if (!q) {
        renderMaharDictionary(MAHAR_DICTIONARY);
        return;
      }
      const filtered = MAHAR_DICTIONARY.filter(item => 
        item.id.toLowerCase().includes(q) || 
        item.en.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q) ||
        item.ar.includes(q)
      );
      renderMaharDictionary(filtered);
    }

    /* ==========================================================================
       H. FEATURE 6: LAFAZ AKAD NIKAH GENERATOR
       ========================================================================== */
    function renderAkadScripts() {
      const groom = document.getElementById('akadGroomName').value.trim() || 'Ahmad Fauzi bin Abdullah';
      const bride = document.getElementById('akadBrideName').value.trim() || 'Fatimah Azzahra binti Ridwan';
      const wali = document.getElementById('akadWaliName').value.trim() || 'Ridwan bin Hasan';
      const statusWali = document.getElementById('akadWaliStatus').value;
      const mahar = document.getElementById('akadMaharDetail').value.trim() || 'seperangkat alat shalat dan uang tunai Rp 1.000.000';
      const payMode = document.getElementById('akadPayMode').value;

      const payId = (payMode === 'tunai') ? 'dibayar tunai' : 'dibayar hutang';
      const payLatin = (payMode === 'tunai') ? 'haalan' : 'mu\'ajjalan';
      const payAr = (payMode === 'tunai') ? 'حَالاً' : 'مُؤَجَّلاً';

      // Status wali map
      const waliLabelMap = {
        'ayah': 'ayah kandung',
        'kakek': 'kakek kandung',
        'saudara_kandung': 'saudara laki-laki sekandung',
        'saudara_seayah': 'saudara laki-laki seayah',
        'paman': 'paman sekandung',
        'wali_hakim': 'Wali Hakim'
      };
      const relId = waliLabelMap[statusWali] || 'wali';

      // 1. Ijab Wali Sendiri
      document.getElementById('textIjabWaliId').innerText = 
        `"Saudara ${groom}, saya nikahkan dan saya kawinkan anak saya, ${bride} kepada engkau dengan maskawin ${mahar} ${payId}."`;
      document.getElementById('textIjabWaliLatin').innerText = 
        `"Yaa ${groom}, ankahtuka wa zawwajtuka bintii ${bride} 'alaa mahrin ${mahar} ${payLatin}."`;
      document.getElementById('textIjabWaliAr').innerText = 
        `يَا ${groom}، أَنْكَحْتُكَ وَزَوَّجْتُكَ بِنْتِي ${bride} عَلَى مَهْرِ ${mahar} ${payAr}`;

      // 2. Ijab Taukil Wali
      document.getElementById('textIjabTaukilId').innerText = 
        `"Saudara ${groom}, atas nama ${wali} sebagai ${relId} dari ${bride} yang telah berwakil kepada saya, saya nikahkan dan saya kawinkan ${bride} kepada engkau dengan maskawin ${mahar} ${payId}."`;
      document.getElementById('textIjabTaukilLatin').innerText = 
        `"Yaa ${groom}, ankahtuka wa zawwajtuka muwakkilatii ${bride} 'alaa mahrin ${mahar} ${payLatin}."`;
      document.getElementById('textIjabTaukilAr').innerText = 
        `يَا ${groom}، أَنْكَحْتُكَ وَزَوَّجْتُكَ مُوَكِّلَتِي ${bride} عَلَى مَهْرِ ${mahar} ${payAr}`;

      // 3. Ijab Wali Hakim
      document.getElementById('textIjabHakimId').innerText = 
        `"Saudara ${groom}, selaku Wali Hakim yang sah atas ${bride}, saya nikahkan dan saya kawinkan ${bride} kepada engkau dengan maskawin ${mahar} ${payId}."`;
      document.getElementById('textIjabHakimLatin').innerText = 
        `"Yaa ${groom}, ankahtuka wa zawwajtuka mauliyyatii ${bride} bi wilayatil haakim 'alaa mahrin ${mahar} ${payLatin}."`;
      document.getElementById('textIjabHakimAr').innerText = 
        `يَا ${groom}، أَنْكَحْتُكَ وَزَوَّجْتُكَ مَوْلِيَّتِي ${bride} بِوِلَايَةِ الحَاكِمِ عَلَى مَهْرِ ${mahar} ${payAr}`;

      // 4. Kabul Standar
      document.getElementById('textKabulStdId').innerText = 
        `"Saya terima nikah dan kawinnya ${bride} untuk diri saya sendiri dengan maskawin tersebut ${payId}."`;
      document.getElementById('textKabulStdLatin').innerText = 
        `"Qobiltu nikaahahaa wa tazwiijahaa li-nafsii 'alal mahril madzkuur ${payLatin}."`;
      document.getElementById('textKabulStdAr').innerText = 
        `قَبِلْتُ نِكَاحَهَا وَتَزْوِيجَهَا لِنَفْسِي عَلَى الْمَهْرِ الْمَذْكُورِ ${payAr}`;

      // 5. Kabul Full
      document.getElementById('textKabulFullId').innerText = 
        `"Saya terima nikah dan kawinnya ${bride} untuk diri saya sendiri dengan maskawin ${mahar} ${payId}."`;
      document.getElementById('textKabulFullLatin').innerText = 
        `"Qobiltu nikaahahaa wa tazwiijahaa li-nafsii 'alaa mahrin ${mahar} ${payLatin}."`;
      document.getElementById('textKabulFullAr').innerText = 
        `قَبِلْتُ نِكَاحَهَا وَتَزْوِيجَهَا لِنَفْسِي عَلَى مَهْرِ ${mahar} ${payAr}`;
    }

    /* ==========================================================================
       I. FEATURE 7: KALKULATOR & KONVERSI LOGIC
       ========================================================================== */
    function initConverters() {
      const today = new Date();
      const isoToday = formatLocalISODate(today);

      const elM = document.getElementById('convMasehiInput');
      if (elM) {
        elM.value = isoToday;
        convertMasehiToHijriCalc();
      }

      const elC = document.getElementById('cntTargetDate');
      if (elC) {
        const nextMonth = new Date(today);
        nextMonth.setDate(nextMonth.getDate() + 30);
        elC.value = formatLocalISODate(nextMonth);
        calculateDayCountdown();
      }

      const elBase = document.getElementById('cntAddBaseDate');
      if (elBase) {
        elBase.value = isoToday;
        calculateAddDays();
      }

      convertGramToMitsqal();
      calculatePureGold();
    }

    function convertMasehiToHijriCalc() {
      const val = document.getElementById('convMasehiInput').value;
      if (!val) return;
      // Parse tanggal input sebagai tanggal lokal agar tidak bergeser
      // akibat interpretasi string YYYY-MM-DD sebagai UTC oleh browser.
      const parts = val.split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
      const h = gregorianToHijri(d);

      document.getElementById('convHijriResult').innerText = `${h.day} ${h.monthName} ${h.year} H`;
      document.getElementById('convHijriResultAr').innerText = `${toEasternArabicNumerals(h.day)} ${h.monthNameAr} ${toEasternArabicNumerals(h.year)} هـ`;
    }

    function convertHijriToMasehiCalc() {
      const dayValue = document.getElementById('invHijriDay').value;
      const monthValue = document.getElementById('invHijriMonth').value;
      const yearValue = document.getElementById('invHijriYear').value;
      const day = Number(dayValue);
      const month = Number(monthValue);
      const year = Number(yearValue);
      const output = document.getElementById('invMasehiResult');

      if (!Number.isInteger(day) || day < 1 || day > 30 ||
          !Number.isInteger(month) || month < 1 || month > 12 ||
          !Number.isInteger(year) || year < 1 || year > 9999) {
        output.innerText = 'Masukkan tanggal Hijriah yang valid.';
        showToast('Periksa kembali hari, bulan, dan tahun Hijriah.');
        return;
      }

      const mDate = hijriToGregorian(day, month, year);
      const check = gregorianToHijri(mDate);
      if (check.day !== day || check.month !== month || check.year !== year) {
        output.innerText = 'Tanggal tersebut tidak tersedia pada perkiraan kalender Hijriah.';
        showToast('Tanggal Hijriah tidak valid pada algoritma kalender yang digunakan.');
        return;
      }
      output.innerText = `Perkiraan Masehi: ${formatIndoDate(mDate)}`;
    }

    function calculateDayCountdown() {
      const val = document.getElementById('cntTargetDate').value;
      if (!val) return;
      const target = parseLocalISODate(val);
      if (!target) { showToast('Tanggal tujuan tidak valid.'); return; }
      const today = new Date();

      target.setHours(0,0,0,0);
      today.setHours(0,0,0,0);

      const diffMs = target - today;
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      const el = document.getElementById('cntCountdownResult');
      if (diffDays === 0) {
        el.innerText = 'Hari Ini!';
        el.style.color = '#10b981';
      } else if (diffDays > 0) {
        el.innerText = `${diffDays} Hari Lagi`;
        el.style.color = 'var(--primary-dark)';
      } else {
        el.innerText = `${Math.abs(diffDays)} Hari yang Lalu`;
        el.style.color = '#ef4444';
      }
    }

    function calculateAddDays() {
      const baseVal = document.getElementById('cntAddBaseDate').value;
      const addAmount = Number(document.getElementById('cntAddDaysAmount').value) || 0;
      if (!baseVal) return;

      const base = parseLocalISODate(baseVal);
      if (!base) { showToast('Tanggal awal tidak valid.'); return; }
      base.setDate(base.getDate() + addAmount);

      document.getElementById('cntAddDaysResult').innerText = `Target Tanggal: ${formatIndoDate(base)}`;
    }

    function convertGramToMitsqal() {
      const g = Number(document.getElementById('goldGramInput').value) || 0;
      const mitsqal = (g / 4.25).toFixed(2);
      document.getElementById('goldMitsqalResult').innerText = `= ${mitsqal} Mitsqal Syar'i (Dinar Emas)`;
    }

    function calculatePureGold() {
      const karat = Number(document.getElementById('goldKaratSelect').value) || 24;
      const totalWeight = Number(document.getElementById('goldTotalWeight').value) || 0;

      const purityRatio = karat / 24;
      const pureWeight = (totalWeight * purityRatio).toFixed(2);

      document.getElementById('goldPureOutput').innerText = `${pureWeight} Gram`;
    }

    function updateDashboardStats() {
      const lastWali = localStorage.getItem('penghulu_last_wali');
      if (lastWali) {
        const el = document.getElementById('dashWaliStat');
        if (el) el.innerText = lastWali;
      }
    }

    /* ==========================================================================
       J. FEATURE 9: KUMPULAN KHUTBAH NIKAH
       ========================================================================== */
    // KHUTBAH_DATA is loaded from its page-specific data file.


    function initKhutbahSection() {
      renderKhutbahCards(KHUTBAH_DATA);
    }

    function renderKhutbahCards(list) {
      const container = document.getElementById('khutbahListContainer');
      if (!container) return;
      container.innerHTML = '';

      if (list.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">
            <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:12px; color:var(--text-light);"></i>
            <p>Tidak ditemukan naskah khutbah yang cocok dengan kata kunci pencarian.</p>
          </div>
        `;
        return;
      }

      list.forEach((k, idx) => {
        const card = document.createElement('div');
        card.className = `khutbah-card ${idx === 0 ? 'open' : ''}`;
        card.id = `khutbah-card-${k.id}`;

        card.innerHTML = `
          <div class="khutbah-header" onclick="toggleKhutbahCard(${k.id})">
            <div class="khutbah-header-main">
              <div class="khutbah-number">${k.id}</div>
              <div class="khutbah-title-box">
                <div class="khutbah-title">${k.title}</div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span class="khutbah-theme-badge"><i class="fa-solid fa-tag"></i> ${k.theme}</span>
                  <span style="font-size:0.78rem; color:var(--text-muted);">${k.subtitle}</span>
                </div>
              </div>
            </div>
            <div class="khutbah-header-actions">
              <button class="btn btn-outline btn-sm no-print" onclick="event.stopPropagation(); copyKhutbah(${k.id})" title="Salin Naskah Khutbah"><i class="fa-regular fa-copy"></i> Salin</button>
              <button class="btn btn-outline btn-sm no-print" onclick="event.stopPropagation(); printKhutbah(${k.id})" title="Cetak Naskah Khutbah"><i class="fa-solid fa-print"></i> Cetak</button>
              <div class="khutbah-chevron"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
          </div>

          <div class="khutbah-body">
            <!-- I. Muqaddimah -->
            <div class="khutbah-block">
              <div class="khutbah-block-title"><i class="fa-solid fa-star-and-crescent"></i> I. Muqaddimah (Pembukaan Khutbah)</div>
              <div class="khutbah-arabic-text" dir="rtl">${k.muqaddimah.ar}</div>
              <div class="khutbah-id-text"><em>Artinya:</em> "${k.muqaddimah.id}"</div>
            </div>

            <!-- II. Dalil Ayat & Hadits -->
            <div class="khutbah-block">
              <div class="khutbah-block-title"><i class="fa-solid fa-book-quran"></i> II. Ayat Al-Qur'an & Hadits Pernikahan</div>
              <div class="khutbah-arabic-text" dir="rtl">${k.dalil.ayatAr}</div>
              <div class="khutbah-id-text"><em>Terjemahan Ayat:</em> ${k.dalil.ayatTrans}</div>
              <div class="khutbah-arabic-text" dir="rtl" style="margin-top:14px;">${k.dalil.haditsAr}</div>
              <div class="khutbah-id-text"><em>Hadits Nabi SAW:</em> ${k.dalil.haditsTrans}</div>
            </div>

            <!-- III. Isi Khutbah -->
            <div class="khutbah-block">
              <div class="khutbah-block-title"><i class="fa-solid fa-scroll"></i> III. Naskah Khutbah / Mau'izhah Hasanah</div>
              <div class="khutbah-id-text" style="white-space: pre-line; line-height: 1.8;">${k.isi}</div>
            </div>

            <!-- IV. Doa Penutup -->
            <div class="khutbah-block">
              <div class="khutbah-block-title"><i class="fa-solid fa-hands-praying"></i> IV. Doa Penutup & Keberkahan Pengantin</div>
              <div class="khutbah-arabic-text" dir="rtl">${k.doa.ar}</div>
              <div class="khutbah-id-text"><em>Doa:</em> "${k.doa.id}"</div>
            </div>

            <div class="khutbah-actions-bar no-print">
              <button class="btn btn-outline btn-sm" onclick="copyKhutbah(${k.id})"><i class="fa-regular fa-copy"></i> Salin Seluruh Naskah Khutbah</button>
              <button class="btn btn-primary btn-sm" onclick="printKhutbah(${k.id})"><i class="fa-solid fa-print"></i> Cetak Format Resmi KUA</button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function toggleKhutbahCard(id) {
      const card = document.getElementById(`khutbah-card-${id}`);
      if (card) card.classList.toggle('open');
    }

    function expandAllKhutbah() {
      document.querySelectorAll('.khutbah-card').forEach(c => c.classList.add('open'));
    }

    function collapseAllKhutbah() {
      document.querySelectorAll('.khutbah-card').forEach(c => c.classList.remove('open'));
    }

    function copyKhutbah(id) {
      const k = KHUTBAH_DATA.find(item => item.id === id);
      if (!k) return;
      const fullText = `${k.title}
Tema: ${k.theme} (${k.subtitle})

--- I. MUQADDIMAH ---
${k.muqaddimah.ar}

Artinya:
"${k.muqaddimah.id}"

--- II. AYAT AL-QUR'AN & HADITS ---
${k.dalil.ayatAr}
${k.dalil.ayatTrans}

${k.dalil.haditsAr}
${k.dalil.haditsTrans}

--- III. ISI KHUTBAH NIKAH ---
${k.isi}

--- IV. DOA PENUTUP & PENGANTIN ---
${k.doa.ar}

Artinya:
"${k.doa.id}"
`;
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('Naskah khutbah lengkap berhasil disalin ke clipboard!');
      }).catch(() => {
        showToast('Gagal menyalin naskah khutbah.');
      });
    }

    function printKhutbah(id) {
      const k = KHUTBAH_DATA.find(item => item.id === id);
      if (!k) return;
      const printWindow = window.open('', '_blank', 'width=850,height=950');
      if (!printWindow) {
        showToast('Gagal membuka jendela cetak. Periksa izin pop-up peramban Anda.');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${k.title} - Standar KUA Kemenag RI</title>
          <style>
            @page { size: A4; margin: 20mm 15mm; }
            body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.7; color: #111; margin: 0; padding: 20px; }
            .kua-header { text-align: center; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 20px; }
            .kua-header h2 { font-size: 15pt; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
            .kua-header h3 { font-size: 13pt; margin: 4px 0; font-weight: normal; }
            .kua-header p { font-size: 10pt; margin: 0; color: #333; }
            .khutbah-title-box { text-align: center; margin: 18px 0; }
            .khutbah-title-box h1 { font-size: 14pt; margin: 0 0 6px; text-transform: uppercase; }
            .khutbah-title-box span { font-size: 11pt; font-style: italic; color: #444; }
            .sec-heading { font-size: 12pt; font-weight: bold; margin: 16px 0 6px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 3px; }
            .arabic { font-family: 'Amiri', 'Traditional Arabic', serif; font-size: 17pt; direction: rtl; text-align: right; line-height: 2.2; margin: 10px 0; }
            .translation { font-style: italic; font-size: 10.5pt; color: #222; margin-bottom: 12px; text-align: justify; }
            .body-content { font-size: 11.5pt; text-align: justify; white-space: pre-line; line-height: 1.75; margin-bottom: 16px; }
            .footer-sign { margin-top: 35px; display: flex; justify-content: space-between; page-break-inside: avoid; }
            .sign-box { text-align: center; width: 220px; font-size: 11pt; }
            @media print { .no-print { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="kua-header">
            <p>Lembar Naskah Khutbah Nikah Resmi &bull; Fiqh Munakahat Standar KUA</p>
          </div>

          <div class="khutbah-title-box">
            <h1>${k.title}</h1>
            <span>Tema: ${k.theme} &bull; ${k.subtitle}</span>
          </div>

          <div class="sec-heading">I. Muqaddimah (Pembukaan)</div>
          <div class="arabic">${k.muqaddimah.ar}</div>
          <div class="translation">"${k.muqaddimah.id}"</div>

          <div class="sec-heading">II. Ayat Al-Qur'an & Hadits Pernikahan</div>
          <div class="arabic">${k.dalil.ayatAr}</div>
          <div class="translation">${k.dalil.ayatTrans}</div>
          <div class="arabic">${k.dalil.haditsAr}</div>
          <div class="translation">${k.dalil.haditsTrans}</div>

          <div class="sec-heading">III. Naskah Khutbah / Pesan Mau'izhah Hasanah</div>
          <div class="body-content">${k.isi}</div>

          <div class="sec-heading">IV. Doa Penutup & Barakah Pengantin</div>
          <div class="arabic">${k.doa.ar}</div>
          <div class="translation">"${k.doa.id}"</div>

          <div class="footer-sign">
            <div class="sign-box">
              <br><br>
              <strong>Mempelai Berdua</strong>
            </div>
            <div class="sign-box">
              <div>Pegawai Pencatat Nikah / Penghulu,</div>
              <br><br><br>
              <div>( __________________________ )</div>
              <div style="font-size: 9pt; color: #555;">NIP. ........................................</div>
            </div>
          </div>
        


</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 350);
    }

    function filterKhutbah() {
      const q = (document.getElementById('searchKhutbahInput').value || '').trim().toLowerCase();
      if (!q) {
        renderKhutbahCards(KHUTBAH_DATA);
        return;
      }
      const filtered = KHUTBAH_DATA.filter(k => 
        k.title.toLowerCase().includes(q) || 
        k.theme.toLowerCase().includes(q) || 
        k.subtitle.toLowerCase().includes(q) || 
        k.isi.toLowerCase().includes(q) ||
        k.muqaddimah.id.toLowerCase().includes(q)
      );
      renderKhutbahCards(filtered);
    }

    /* ==========================================================================
       K. FEATURE 10: NASEHAT & ULAR-ULAR PERNIKAHAN
       ========================================================================== */
    // NASEHAT_DATA is loaded from its page-specific data file.


    let activeNasehatTab = 'quran';

    function initNasehatSection() {
      renderNasehatSection();
      switchNasehatTab('quran');
      selectNasehatScript('script-model-1');
      applyNasehatDeliveryStyle('formal');
    }

    function renderNasehatSection() {
      // 1. Quran
      const gridQuran = document.getElementById('gridNasehatQuran');
      if (gridQuran) {
        gridQuran.innerHTML = NASEHAT_DATA.quran.map(item => `
          <div class="nasehat-card" id="card-${item.id}">
            <div class="nasehat-card-header">
              <span class="nasehat-source-badge"><i class="fa-solid fa-book-quran"></i> ${item.source}</span>
              <span class="badge badge-gold">${item.badge}</span>
            </div>
            <h4 style="font-family:var(--font-heading); color:var(--primary-dark); font-size:1.02rem; margin-bottom:8px;">${item.title}</h4>
            <div class="nasehat-arabic" dir="rtl">${item.ar}</div>
            <div class="nasehat-latin">${item.latin}</div>
            <div class="nasehat-trans">"${item.trans}"</div>
            <div class="nasehat-hikmah">
              <strong><i class="fa-solid fa-lightbulb"></i> Mutiara Hikmah:</strong> ${item.hikmah}
            </div>
            <details class="nasehat-expanded-detail">
              <summary><i class="fa-solid fa-book-open"></i> Uraian nasihat untuk disampaikan</summary>
              <div class="nasehat-expanded-body">
                <p><strong>Pokok pesan:</strong> ${item.trans}</p>
                <p>Dalam kehidupan rumah tangga, pesan ini perlu diwujudkan melalui tindakan sehari-hari, bukan hanya diucapkan pada saat akad. Kedua pasangan dapat memulainya dengan membiasakan komunikasi yang jujur, menghargai perbedaan, menjaga kehormatan satu sama lain, dan mengambil keputusan melalui musyawarah.</p>
                <p><strong>Penguatan:</strong> ${item.hikmah}</p>
                <p>Karena itu, jadikan nasihat ini sebagai komitmen bersama. Ketika keadaan lapang, syukurilah dan gunakan untuk kebaikan. Ketika muncul kesulitan, hadapi sebagai tanggung jawab bersama dengan tetap menjaga adab, keselamatan, dan tuntunan agama.</p>
              </div>
            </details>
            <div class="nasehat-card-footer no-print">
              <button class="btn btn-outline btn-sm" onclick="copyNasehatText('${item.id}', '${item.source}', '${item.ar.replace(/'/g, "\\'")}', '${item.trans.replace(/'/g, "\\'")}')"><i class="fa-regular fa-copy"></i> Salin Ayat & Nasehat</button>
            </div>
          </div>
        `).join('');
      }

      // 2. Hadits
      const gridHadits = document.getElementById('gridNasehatHadits');
      if (gridHadits) {
        gridHadits.innerHTML = NASEHAT_DATA.hadits.map(item => `
          <div class="nasehat-card" id="card-${item.id}">
            <div class="nasehat-card-header">
              <span class="nasehat-source-badge" style="background:#e0f2fe; color:#0369a1; border-color:#bae6fd;"><i class="fa-solid fa-quote-left"></i> ${item.source}</span>
              <span class="badge badge-primary">${item.badge}</span>
            </div>
            <h4 style="font-family:var(--font-heading); color:var(--primary-dark); font-size:1.02rem; margin-bottom:8px;">${item.title}</h4>
            <div class="nasehat-arabic" dir="rtl">${item.ar}</div>
            <div class="nasehat-trans">"${item.trans}"</div>
            <div class="nasehat-hikmah">
              <strong><i class="fa-solid fa-heart-pulse"></i> Pesan Penghulu:</strong> ${item.hikmah}
            </div>
            <details class="nasehat-expanded-detail">
              <summary><i class="fa-solid fa-book-open"></i> Uraian nasihat untuk disampaikan</summary>
              <div class="nasehat-expanded-body">
                <p><strong>Pokok pesan:</strong> ${item.trans}</p>
                <p>Dalam kehidupan rumah tangga, pesan ini perlu diwujudkan melalui tindakan sehari-hari, bukan hanya diucapkan pada saat akad. Kedua pasangan dapat memulainya dengan membiasakan komunikasi yang jujur, menghargai perbedaan, menjaga kehormatan satu sama lain, dan mengambil keputusan melalui musyawarah.</p>
                <p><strong>Penguatan:</strong> ${item.hikmah}</p>
                <p>Karena itu, jadikan nasihat ini sebagai komitmen bersama. Ketika keadaan lapang, syukurilah dan gunakan untuk kebaikan. Ketika muncul kesulitan, hadapi sebagai tanggung jawab bersama dengan tetap menjaga adab, keselamatan, dan tuntunan agama.</p>
              </div>
            </details>
            <div class="nasehat-card-footer no-print">
              <button class="btn btn-outline btn-sm" onclick="copyNasehatText('${item.id}', '${item.source}', '${item.ar.replace(/'/g, "\\'")}', '${item.trans.replace(/'/g, "\\'")}')"><i class="fa-regular fa-copy"></i> Salin Hadits & Nasehat</button>
            </div>
          </div>
        `).join('');
      }

      // 3. Ulama
      const gridUlama = document.getElementById('gridNasehatUlama');
      if (gridUlama) {
        gridUlama.innerHTML = NASEHAT_DATA.ulama.map(item => `
          <div class="nasehat-card" id="card-${item.id}">
            <div class="nasehat-card-header">
              <span class="nasehat-source-badge" style="background:#fef3c7; color:#92400e; border-color:#fde68a;"><i class="fa-solid fa-feather-pointed"></i> ${item.source}</span>
              <span class="badge badge-gold">${item.badge}</span>
            </div>
            <h4 style="font-family:var(--font-heading); color:var(--primary-dark); font-size:1.02rem; margin-bottom:8px;">${item.title}</h4>
            <div class="nasehat-arabic" dir="rtl">${item.ar}</div>
            <div class="nasehat-trans">"${item.trans}"</div>
            <div class="nasehat-hikmah">
              <strong><i class="fa-solid fa-gem"></i> Kaidah Fiqh & Nasihat:</strong> ${item.hikmah}
            </div>
            <details class="nasehat-expanded-detail">
              <summary><i class="fa-solid fa-book-open"></i> Uraian nasihat untuk disampaikan</summary>
              <div class="nasehat-expanded-body">
                <p><strong>Pokok pesan:</strong> ${item.trans}</p>
                <p>Dalam kehidupan rumah tangga, pesan ini perlu diwujudkan melalui tindakan sehari-hari, bukan hanya diucapkan pada saat akad. Kedua pasangan dapat memulainya dengan membiasakan komunikasi yang jujur, menghargai perbedaan, menjaga kehormatan satu sama lain, dan mengambil keputusan melalui musyawarah.</p>
                <p><strong>Penguatan:</strong> ${item.hikmah}</p>
                <p>Karena itu, jadikan nasihat ini sebagai komitmen bersama. Ketika keadaan lapang, syukurilah dan gunakan untuk kebaikan. Ketika muncul kesulitan, hadapi sebagai tanggung jawab bersama dengan tetap menjaga adab, keselamatan, dan tuntunan agama.</p>
              </div>
            </details>
            <div class="nasehat-card-footer no-print">
              <button class="btn btn-outline btn-sm" onclick="copyNasehatText('${item.id}', '${item.source}', '${item.ar.replace(/'/g, "\\'")}', '${item.trans.replace(/'/g, "\\'")}')"><i class="fa-regular fa-copy"></i> Salin Kalam Ulama</button>
            </div>
          </div>
        `).join('');
      }

      // 4. Umum
      const gridUmum = document.getElementById('gridNasehatUmum');
      if (gridUmum) {
        gridUmum.innerHTML = NASEHAT_DATA.umum.map(item => `
          <div class="nasehat-card" id="card-${item.id}">
            <div class="nasehat-card-header">
              <span class="nasehat-source-badge" style="background:#ede9fe; color:#5b21b6; border-color:#ddd6fe;"><i class="fa-solid fa-lightbulb"></i> ${item.source}</span>
              <span class="badge badge-info">${item.badge}</span>
            </div>
            <h4 style="font-family:var(--font-heading); color:var(--primary-dark); font-size:1.02rem; margin-bottom:8px;">${item.title}</h4>
            <div class="nasehat-trans" style="font-size:0.92rem; line-height:1.75; margin-top:8px;">${item.trans}</div>
            <div class="nasehat-hikmah" style="margin-top:14px;">
              <strong><i class="fa-solid fa-hand-holding-heart"></i> Petuah Bijak:</strong> ${item.hikmah}
            </div>
            <details class="nasehat-expanded-detail">
              <summary><i class="fa-solid fa-book-open"></i> Uraian nasihat untuk disampaikan</summary>
              <div class="nasehat-expanded-body">
                <p><strong>Pokok pesan:</strong> ${item.trans}</p>
                <p>Dalam kehidupan rumah tangga, pesan ini perlu diwujudkan melalui tindakan sehari-hari, bukan hanya diucapkan pada saat akad. Kedua pasangan dapat memulainya dengan membiasakan komunikasi yang jujur, menghargai perbedaan, menjaga kehormatan satu sama lain, dan mengambil keputusan melalui musyawarah.</p>
                <p><strong>Penguatan:</strong> ${item.hikmah}</p>
                <p>Karena itu, jadikan nasihat ini sebagai komitmen bersama. Ketika keadaan lapang, syukurilah dan gunakan untuk kebaikan. Ketika muncul kesulitan, hadapi sebagai tanggung jawab bersama dengan tetap menjaga adab, keselamatan, dan tuntunan agama.</p>
              </div>
            </details>
            <div class="nasehat-card-footer no-print">
              <button class="btn btn-outline btn-sm" onclick="copyNasehatText('${item.id}', '${item.title}', '', '${item.trans.replace(/'/g, "\\'")}')"><i class="fa-regular fa-copy"></i> Salin Petuah Praktis</button>
            </div>
          </div>
        `).join('');
      }
    }

    function switchNasehatTab(tabId) {
      const allowedTabs = ['quran', 'hadits', 'ulama', 'umum', 'naskah', 'artikel'];
      if (!allowedTabs.includes(tabId)) return;
      activeNasehatTab = tabId;
      document.querySelectorAll('#section-nasehat .subtab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `nasehat-subtab-${tabId}`);
      });
      const selector = document.getElementById('nasehatCategorySelect');
      if (selector) selector.value = tabId;
      filterNasehat();
    }

    function selectNasehatScript(scriptId) {
      const allowed = ['script-model-1','script-model-2','script-model-3','script-model-4','script-model-5'];
      if (!allowed.includes(scriptId)) return;
      document.querySelectorAll('#section-nasehat .nasehat-script-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === scriptId);
      });
      const selector = document.getElementById('nasehatScriptModel');
      if (selector) selector.value = scriptId;
    }

    function applyNasehatDeliveryStyle(style) {
      const allowed = ['formal','warm','practical'];
      if (!allowed.includes(style)) style = 'formal';
      const section = document.getElementById('section-nasehat');
      section.dataset.deliveryStyle = style;
      document.querySelectorAll('#section-nasehat .nasehat-delivery-addition').forEach(block => {
        block.hidden = block.dataset.style !== style || style === 'formal';
      });
      const descriptions = {
        formal: 'Bahasa baku, santun, dengan penjelasan dalil yang lebih dominan.',
        warm: 'Bahasa komunikatif, reflektif, dan menyentuh dengan penguatan emosional.',
        practical: 'Bahasa ringkas dengan langkah konkret yang mudah diterapkan pasangan.'
      };
      const description = document.getElementById('nasehatStyleDescription');
      if (description) description.textContent = descriptions[style];
    }

    async function copyNasehatText(id, source, ar, trans) {
      let text = `[Nasehat Pernikahan - Asisten Penghulu]\nSumber: ${source}\n\n`;
      if (ar) text += `${ar}\n\n`;
      text += `Terjemahan/Ulasan:\n"${trans}"\n`;

      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch (err) {
        copied = false;
      }
      if (!copied) {
        let helper = null;
        try {
          helper = document.createElement('textarea');
          helper.value = text;
          helper.setAttribute('readonly', '');
          helper.style.position = 'fixed';
          helper.style.left = '-9999px';
          helper.style.top = '0';
          document.body.appendChild(helper);
          helper.focus();
          helper.select();
          helper.setSelectionRange(0, helper.value.length);
          copied = document.execCommand('copy');
        } catch (err) {
          copied = false;
        } finally {
          if (helper && helper.parentNode) helper.parentNode.removeChild(helper);
        }
      }
      showToast(copied ? 'Nasehat pernikahan berhasil disalin.' : 'Penyalinan otomatis gagal. Silakan pilih dan salin teks secara manual.');
      return copied;
    }

    function filterNasehat() {
      const input = document.getElementById('searchNasehatInput');
      const query = (input ? input.value : '').trim().toLocaleLowerCase('id');
      const pane = document.getElementById(`nasehat-subtab-${activeNasehatTab}`);
      if (!pane) return;

      if (activeNasehatTab === 'artikel') {
        const cards = Array.from(pane.querySelectorAll('.nasehat-reference-card'));
        cards.forEach(card => {
          card.hidden = !!query && !(card.textContent || '').toLocaleLowerCase('id').includes(query);
        });
        return;
      }

      if (activeNasehatTab === 'naskah') {
        if (query) {
          const match = Array.from(pane.querySelectorAll('.nasehat-script-panel')).find(panel =>
            (panel.textContent || '').toLocaleLowerCase('id').includes(query));
          if (match) selectNasehatScript(match.id);
        }
        return;
      }

      const grid = pane.querySelector('.nasehat-grid');
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll('.nasehat-card'));
      let visibleCount = 0;
      cards.forEach(card => {
        const matches = !query || (card.textContent || '').toLocaleLowerCase('id').includes(query);
        card.hidden = !matches;
        if (matches) visibleCount++;
      });
      let empty = grid.querySelector('.nasehat-empty-state');
      if (query && cards.length && visibleCount === 0) {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'nasehat-empty-state';
          empty.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><strong>Nasihat tidak ditemukan</strong><span>Ubah kata kunci atau pilih kategori lain.</span>';
          grid.appendChild(empty);
        }
        empty.hidden = false;
      } else if (empty) {
        empty.hidden = true;
      }
    }

    function copyMainNasehatScript() {
      const activePanel = document.querySelector('#section-nasehat .nasehat-script-panel.active');
      const script = activePanel ? activePanel.querySelector('.nasehat-main-script') : null;
      if (!script) return;
      const clone = script.cloneNode(true);
      clone.querySelectorAll('.nasehat-script-actions').forEach(node => node.remove());
      clone.querySelectorAll('.nasehat-delivery-addition[hidden]').forEach(node => node.remove());
      const text = clone.innerText || clone.textContent || '';
      const helper = document.createElement('textarea');
      helper.value = text.trim();
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.left = '-9999px';
      document.body.appendChild(helper);
      helper.focus();
      helper.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (err) { copied = false; }
      helper.remove();
      showToast(copied ? 'Naskah nasihat lengkap berhasil disalin.' : 'Salin otomatis gagal. Silakan gunakan fitur cetak atau salin manual.');
      return copied;
    }



  
function searchKnowledgeFromDashboard() {
  const input = document.getElementById('dashboardKnowledgeSearch');
  const query = input ? input.value.trim() : '';
  window.location.href = 'pages/ensiklopedia.html?query=' + encodeURIComponent(query);
}
