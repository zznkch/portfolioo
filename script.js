document.addEventListener('DOMContentLoaded', () => {

    const polaroid = document.getElementById('polaroid');
    const nodes = document.querySelectorAll('.node');
    const overlay = document.getElementById('overlay');
    const flysheets = document.querySelectorAll('.flysheet');
    const closeButtons = document.querySelectorAll('.flysheet-close');

    let activeSheet = null;
    let flipped = false;

    polaroid.addEventListener('click', (e) => {
        if (e.target.closest('.node') || activeSheet) return;
        flipped = !flipped;
        if (flipped) {
            polaroid.classList.add('flipped');
        } else {
            polaroid.classList.remove('flipped');
        }
    });

    function openSheet(sheetId) {
        if (activeSheet) {
            closeSheet(false);
        }

        const sheet = document.getElementById('sheet-' + sheetId);
        if (!sheet) return;

        const mindmap = document.getElementById('mindmap');
        gsap.to(mindmap, {
            opacity: 0.25,
            scale: 0.96,
            duration: 0.35,
            ease: 'power2.inOut'
        });

        overlay.classList.add('active');

        sheet.classList.add('active');
        activeSheet = sheet;

        gsap.fromTo(sheet,
            { scale: 0.7, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.5)', onStart: () => {
                sheet.scrollTop = 0;
            }}
        );

        const cards = sheet.querySelectorAll('.detail-card, .skill-tag, .contact-item');
        gsap.fromTo(cards,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.15 }
        );
    }

    function closeSheet(animate = true) {
        if (!activeSheet) return;

        const sheet = activeSheet;
        const mindmap = document.getElementById('mindmap');

        if (animate) {
            gsap.to(sheet, {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => {
                    sheet.classList.remove('active');
                    activeSheet = null;
                    overlay.classList.remove('active');
                    gsap.to(mindmap, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
                }
            });
        } else {
            sheet.classList.remove('active');
            activeSheet = null;
            overlay.classList.remove('active');
            gsap.to(mindmap, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
        }
    }

    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = node.getAttribute('data-target');
            if (target) {
                openSheet(target);
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSheet();
        });
    });

    overlay.addEventListener('click', () => {
        closeSheet();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeSheet) {
            closeSheet();
        }
    });

    document.querySelectorAll('.flysheet-paper').forEach(paper => {
        paper.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    console.log('Portfolio prêt !');
});