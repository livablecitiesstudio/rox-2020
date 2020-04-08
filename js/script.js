(function () {

    initTOC();
    initHamburger();
    initSectionToc();
    initFooterNav();
    adjustAnchorScroll();
    initChapterColor();
    initFooterCredit();
    currentPageHighlight();
    projectTypeColor();

    function initHamburger() {
        let hamburger = {
            navToggle: document.querySelector('.nav-toggle'),
            nav: document.querySelector('.toc-nav'),

            doToggle: function (e) {
                e.preventDefault();
                this.navToggle.classList.toggle('expanded');
                this.nav.classList.toggle('expanded');
            }
        };


        hamburger.navToggle.addEventListener('click', function (e) {
            hamburger.doToggle(e);
        });
    }

    function initTOC() {
        const FIXED_MENU = document.querySelector('.toc-nav ul');

        if(!FIXED_MENU) return;

        class Page {
            constructor(name, className, href) {
                this.name = name;
                this.className = className;
                this.href = href || name.toLowerCase().replace(/[\W]+/g, '-') + ".html";
            }
        }

        const PAGES = {
            planOnAPage: new Page(
                'Plan on A Page',
                ["section-title", "toc-footer-nav"],
                'index.html',
            ),

            // projectMap: new Page(
            //     'Project Map',
            //     ["section-title", "toc-footer-nav"]
            // ),

            introduction: new Page(
                'Introdcution',
                ["section-title"],
                'plan-overview.html'
            ),

            planOverview: new Page(
                'Plan Overview',
                ["subsection-title", "toc-footer-nav"]
            ),

            // context: new Page(
            //     'RVMD Context',
            //     ["subsection-title", "toc-footer-nav"]
            // ),

            analysis: new Page(
                'Community Open Space Analysis',
                ["subsection-title", "toc-footer-nav"]
            ),

            existingAssessment: new Page(
                'Existing Parks Assessment',
                ["subsection-title", "toc-footer-nav"]
            ),

            publicInvolvement: new Page(
                'Master Plan Process & Public Involvement',
                ["subsection-title", "toc-footer-nav"]
            ),

            financialConsiderations: new Page(
                'Financial Considerations',
                ["subsection-title", "toc-footer-nav"]
            ),

            vision: new Page(
                'Vision and Community Priorities',
                ["subsection-title", "toc-footer-nav"]
            ),

            masterPlanRecommendations: new Page(
                'Master Plan Recommendations',
                ['section-title'],
                'trails-connectivity.html'
            ),

            trails: new Page(
                'Trails & Connectivity',
                ["subsection-title", "toc-footer-nav"]
            ),

            openSpace: new Page(
                'Open Space',
                ["subsection-title", "toc-footer-nav"]
            ),

            neighborhoodParks: new Page(
                'Neighborhood Parks',
                ["subsection-title", "toc-footer-nav"]
            ),

            programming: new Page(
                'Programming',
                ["subsection-title", "toc-footer-nav"]
            ),

            recreation: new Page(
                'Recreation',
                ["subsection-title", "toc-footer-nav"]
            ),

            communityCenter: new Page(
                'Community Center and/or Pool',
                ["subsection-title", "toc-footer-nav"]
            ),

            nativeEcology: new Page(
                'Native Ecology and Water Quality',
                ["subsection-title", "toc-footer-nav"]
            ),

            median: new Page(
                'Median Landscape and Fences',
                ["subsection-title", "toc-footer-nav"]
            ),

            guidelines: new Page(
                'Design Guidelines & Standards',
                ["section-title", "toc-footer-nav"]
            ),

            irrigationMaintenance: new Page(
                'Irrigation & Maintenance',
                ["section-title", "toc-footer-nav"]
            ),

            implementationStrategyDivider: new Page(
                'Implementation',
                ["section-title"],
                'implementation-strategy.html'
            ),

            implementationStrategy: new Page(
                'Implementation Strategy',
                ["subsection-title", "toc-footer-nav"],
            ),

            projectLifeCycle: new Page(
                'Project Life Cycle',
                ["subsection-title", "toc-footer-nav"],
            ),

            implementationMatrix: new Page(
                'Implementation Matrix',
                ["subsection-title", "toc-footer-nav"],
            ),

            about: new Page(
                'About',
                ["section-title", "toc-footer-nav"]
            )
        };

        for (let page in PAGES) {
            let li = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.appendChild(document.createTextNode(PAGES[page].name));
            anchor.setAttribute('href', PAGES[page].href);

            li.appendChild(anchor);
            li.classList.add(...PAGES[page].className);

            FIXED_MENU.appendChild(li);
            // console.log(PAGES[page].href);
        }
    }

    //populate section toc list
    function initSectionToc() {
        const SECTION_TOC_LIST = document.querySelector('.section-toc ul');

        if (!SECTION_TOC_LIST) return; 

        const SUBSECTIONS = Array.from(document.querySelectorAll('.content-wrap section'));
        const SUBSECTIONS_TITLE = Array.from(document.querySelectorAll('.content-wrap section h3'));
        

        for (let i = 0; i < SUBSECTIONS.length; i++) {
            let li = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.appendChild(document.createTextNode(SUBSECTIONS_TITLE[i].innerText));

            anchor.setAttribute('href', `#${SUBSECTIONS[i].id}`)

            li.appendChild(anchor);

            SECTION_TOC_LIST.appendChild(li);
        }
    }

    //auto populate footer navigation
    function initFooterNav() {
        const TOC_FOOTER = Array.from(document.querySelectorAll('.toc-footer-nav'));

        if (TOC_FOOTER == '') return; 

        let currentSection = document.querySelector('.content-wrap h1').innerHTML;
        let previousSection = document.querySelector('#prev-section');
        let previousSectionLabel = document.querySelector('#prev-section-label');

        let nextSection = document.querySelector('#next-section');
        let nextSectionLabel = document.querySelector('#next-section-label');

        // nextSection.innerHTML = "";
        // previousSection.innerHTML = "";

        if (currentSection.includes('&amp;')) currentSection = currentSection.replace('&amp;', '&');
        //find index of currentSection in TOC
        //locate previous and next indices
        for (let i = 0; i < TOC_FOOTER.length; i++) {
            if (TOC_FOOTER[i].innerText.toLowerCase() === currentSection.toLowerCase()) {
                if (TOC_FOOTER[i - 1]) {
                    previousSection.innerHTML = TOC_FOOTER[i - 1].innerHTML;
                } else {
                    previousSection.innerHTML = " ";
                    previousSectionLabel.innerHTML = " ";
                }

                if (TOC_FOOTER[i + 1]) {
                    nextSection.innerHTML = TOC_FOOTER[i + 1].innerHTML;
                } else {
                    nextSection.innerHTML = " ";
                    nextSectionLabel.innerHTML = " ";
                }

            }
        }
    }

    function initChapterColor() {
        const CHAPTER = document.querySelector('.section-label') || '';

        if (CHAPTER == '') return; 

        let color = '#fff';
        switch (CHAPTER.innerText.toLowerCase()) {
            case 'introduction':
                color = '#4db6ac';
                break;
            case 'master plan recommendations':
                color = 'var(--yellow)';
                break;
            case "design guidelines & standards":
                color = 'var(--blue)';
                break;
            case 'irrigation & maintenance':
                color = 'var(--brown)';
                break;
            case 'implementation strategy':
                color = 'var(--green)';
                break;
            default:
                color = 'var(--red)';
        }

        return document.documentElement.style
            .setProperty('--section-color', color);
    }


    function initFooterCredit() {
        const FOOTER_CREDIT = document.querySelector('.footer-container');

        if (!FOOTER_CREDIT) return; 

        FOOTER_CREDIT.innerHTML = '';

        const credit = {
            rvmd: {
                a: 'Visit Website',
                href: 'https://roxboroughmetrodistrict.org/',
                p: 'Roxborough Village Metro District | ',
                className: ['rvmd']
            },

            lcs: {
                a: 'Design by Livable Cities Studio',
                href: 'http://livablecitiesstudio.com/',
                p: '',
                className: ['lcs']
            }
        }

        for (entity in credit) {
            let paragraph = document.createElement('p');
            let anchor = document.createElement('a');

            paragraph.appendChild(document.createTextNode(credit[entity].p));
            paragraph.classList.add(...credit[entity].className);

            anchor.appendChild(document.createTextNode(credit[entity].a));
            anchor.setAttribute('href', credit[entity].href);
            anchor.setAttribute('target', '_blank');

            paragraph.appendChild(anchor);
            FOOTER_CREDIT.appendChild(paragraph);
            // console.log(credit[entity].className);
        }
    }

    function currentPageHighlight() {
        const TOC_LIST = Array.from(document.querySelectorAll('.toc-nav li a'));
        const CURRENT_PAGE = document.querySelector('.content-wrap h1');

        for (let page of TOC_LIST) {
            (page.innerText === CURRENT_PAGE.innerText) ?
            page.classList.add('current'):
                page.classList.remove('current');
        }
    }

    //project type color for implementation matrix
    function projectTypeColor() {
        const PROJECT_TYPE = Array.from(document.querySelectorAll('.project-type'));

        if(PROJECT_TYPE == "") return; 

        let color = 'var(--green)';

        for (let type of PROJECT_TYPE) {

            switch (type.innerText.toLowerCase()) {
                case 'open space':
                    type.style.backgroundColor = 'var(--green)';
                    break;

                case 'trails & connectivity':
                    type.style.backgroundColor = 'var(--teal)';
                    type.style.color = 'white';
                    break;

                case 'programming':
                    type.style.backgroundColor = 'var(--red)';
                    type.style.color = 'white';
                    break;

                case 'neighborhood parks':
                    type.style.backgroundColor = 'var(--vintage)';
                    break;

                case 'recreation':
                    type.style.backgroundColor = 'var(--blue)';
                    break;

                case 'community center and/or pool':
                    type.style.backgroundColor = '#0297a7';
                    type.style.color = 'white';
                    break;

                default: type.style.backgroundColor = 'var(--green)';
            }
        }
    }

    //when click on section toc, go to id with adjusted window height
    function adjustAnchorScroll() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        var shiftWindow = function () {
            scrollBy(0, -130)
        };

        //https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
        window.addEventListener("hashchange", shiftWindow);

        //https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
        // window.onload = function(){
        //     if (window.location.hash) shiftWindow();
        // }
    }


}());

let headerNav = document.querySelector('header nav ul');
// headerNav.innerHTML = '';

window.onscroll = function(){
    // window.location.href = window.location.pathname;
    // window.location.href.split('#')[0];
    if (window.location.hash) window.location.hash = "";
}
