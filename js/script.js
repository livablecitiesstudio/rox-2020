(function () {
    initPageTitle();
    initHeaderNavigation();
    initTOC();
    initHamburger();
    initSectionToc();
    initProjectMapLabels();
    initFooterNav();
    adjustAnchorScroll();
    initChapterColor();
    initFooterCredit();
    currentPageHighlight();
    projectTypeColor();


    //populate page title info based on page h1
    function initPageTitle() {
        const PAGE_TITLE = document.querySelector('title');
        const PAGE_H1 = document.querySelector('h1').innerText;

        PAGE_TITLE.innerText = `${PAGE_H1} | RVMD Master Plan 2020`;
    }

    //hamburger menu
    function initHamburger() {
        let hamburger = {
            navToggle: document.querySelector('.nav-toggle') || "",
            nav: document.querySelector('.toc-nav'),

            doToggle: function (e) {
                e.preventDefault();
                this.navToggle.classList.toggle('expanded');
                this.nav.classList.toggle('expanded');
            }
        };

        if (hamburger.navToggle) {
            hamburger.navToggle.addEventListener('click', function (e) {
                hamburger.doToggle(e);
            })
        };
    }

    //header navigation
    function initHeaderNavigation() {
        const HEADER_NAV = document.querySelector('header nav ul');
        HEADER_NAV.innerHTML = '';

        //navigation button information
        const headerNavBtn = {
            about: {
                a: 'About',
                href: 'about.html',
                target: ''
            },

            projectMap: {
                a: 'Project Map',
                href: 'project-map.html',
                target: ''
            },

            pdf: {
                a: 'Downlaod PDF',
                href: 'https://roxboroughmetrodistrict.org/wp-content/uploads/2020/04/Roxborough-Master-Plan_final-200415.pdf',
                target: '_blank'
            }
        }

        //inject info into HTML tags
        for (let button in headerNavBtn) {
            let list = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.appendChild(document.createTextNode(headerNavBtn[button].a));
            anchor.setAttribute('href', headerNavBtn[button].href);
            anchor.setAttribute('target', headerNavBtn[button].target);

            list.appendChild(anchor);
            HEADER_NAV.appendChild(list);
        }
    }

    //table of contents (TOC)
    function initTOC() {
        const FIXED_MENU = document.querySelector('.toc-nav ul');

        if (!FIXED_MENU) return;

        //create template for page info
        class Page {
            constructor(name, className, href) {
                this.name = name;
                this.className = className;
                this.href = href || name.toLowerCase().replace(/[\W]+/g, '-') + ".html";
            }
        }

        //list of pages for TOC
        //ADD NEW PAGE INTO TOC IN HERE
        const PAGES = {
            planOnAPage: new Page(
                'Plan on A Page',
                ["section-title", "toc-footer-nav"],
                'index.html',
            ),

            projectMap: new Page(
                'Project Map',
                ["section-title", "toc-footer-nav"]
            ),

            introduction: new Page(
                'Introdcution',
                ["section-title"],
                'plan-overview.html'
            ),

            planOverview: new Page(
                'Plan Overview',
                ["subsection-title", "toc-footer-nav"]
            ),

            context: new Page(
                'RVMD Context',
                ["subsection-title", "toc-footer-nav"]
            ),

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

        //inject info into HTML
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


        //inject info into HTML
        for (let i = 0; i < SUBSECTIONS_TITLE.length; i++) {
            let li = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.appendChild(document.createTextNode(SUBSECTIONS_TITLE[i].innerText));

            //for maintenance matrix page (only one section)
            //phase 1, 2, 3 all under one section tag
            if (SUBSECTIONS.length > 1) {
                anchor.setAttribute('href', `#${SUBSECTIONS[i].id}`);
            } else {
                anchor.setAttribute('href', `#${SUBSECTIONS_TITLE[i].id}`)
            }


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

    function initProjectMapLabels() {
        const MAP_ICONS = document.querySelectorAll('.icon-label a');

        for (let icon of MAP_ICONS) {
            switch (icon.innerText) {
                case "1":
                    icon.href = 'trails-connectivity.html#connections-state-parks';
                    icon.title = 'Connections to Waterton Canyon, Chatfield State Park and Roxborough State Park';
                    break;
                case '2':
                    icon.href = 'trails-connectivity.html#crossings';
                    icon.title = 'Improved Pedestrian and Bike Crossings on Major Roads';
                    break;
                case '3':
                    icon.href = 'trails-connectivity.html#new-paths';
                    icon.title = 'New and Improved Paths';
                    break;
                case '4':
                    icon.href = 'open-space.html#willow-creek-general';
                    icon.title = 'Little Willow Creek Greenway - General Improvements';
                    break;
                case '5':
                    icon.href = 'open-space.html#willow-creek-spillway';
                    icon.title = 'Little Willow Creek - Upper and Lower Pond Crossing and Spillway/Embankment';
                    break;
                case '6':
                    icon.href = 'open-space.html#rampart-range-open-space';
                    icon.title = 'Rampart Range Road Linear Open Space';
                    break;
                case '7':
                    icon.href = 'open-space.html#small-open-space';
                    icon.title = 'Small Neighborhood Open Spaces';
                    break;
                case '8':
                    icon.href = 'neighborhood-parks.html#chatfield-farms';
                    icon.title = 'Chatfield Farms Park';
                    break;
                case '9':
                    icon.href = 'neighborhood-parks.html#crystal-lake-park';
                    icon.title = 'Crystal Lake Park';
                    break;
                case '10':
                    icon.href = 'neighborhood-parks.html#imperial-park';
                    icon.title = 'Imperial Park';
                    break;
                case '11':
                    icon.href = 'neighborhood-parks.html#mule-deer-park';
                    icon.title = 'Mule Deer Park';
                    break;
                case '12':
                    icon.href = 'neighborhood-parks.html#airplane-park';
                    icon.title = 'Airplane Park';
                    break;
                case '13':
                    icon.href = 'neighborhood-parks.html#marmot-ridge-park';
                    icon.title = 'Marmot Ridge Park';
                    break;
                case '14':
                    icon.href = 'neighborhood-parks.html#new-park';
                    icon.title = 'New Parks and Improved Native Areas';
                    break;
                case '15':
                    icon.href = 'programming.html#community-park-programming';
                    icon.title = 'Programming for the Community Park';
                    break;
                case '16':
                    icon.href = 'programming.html#active-events';
                    icon.title = 'Active Events and Programs within the Trails and Open Space';
                    break;
                case '17':
                    icon.href = 'recreation.html#soocer-field';
                    icon.title = 'Soccer Field';
                    break;
                case '18':
                    icon.href = 'recreation.html#softball';
                    icon.title = 'Softball Field';
                    break;
                case '19':
                    icon.href = 'recreation.html#volleyball';
                    icon.title = 'Volleyball Court';
                    break;
                case '20':
                    icon.href = 'recreation.html#basketball';
                    icon.title = 'Basketball Court';
                    break;
                case '21':
                    icon.href = 'recreation.html#skate-park';
                    icon.title = 'Skate Park';
                    break;
                case '22':
                    icon.href = 'recreation.html#tennis';
                    icon.title = 'Tennis & Pickleball Courts';
                    break;
                case '23':
                    icon.href = 'recreation.html#bike-bump';
                    icon.title = 'Bike Pump Track';
                    break;
            }
        }
    }

    //identify chapter colors based on page title
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

        //footer credit info
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

        //inject info into HTML
        for (let entity in credit) {
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


    //highlight text in toc to indicate current page
    function currentPageHighlight() {
        const TOC_LIST = Array.from(document.querySelectorAll('.toc-nav li a'));
        const CURRENT_PAGE = document.querySelector('.content-wrap h1');

        //if title matches list in TOC
        //add CSS class 'current'
        for (let page of TOC_LIST) {
            (page.innerText === CURRENT_PAGE.innerText) ?
            page.classList.add('current'):
                page.classList.remove('current');
        }
    }

    function insertAnchor(text, href, appendTo) {
        let anchor = document.createElement('a');
        anchor.appendChild(document.createTextNode(text));
        anchor.setAttribute('href', href);
        anchor.setAttribute('target', '_blank');
        appendTo.appendChild(anchor);
    }

    //project type color for implementation matrix
    function projectTypeColor() {
        const PROJECT_TYPE = Array.from(document.querySelectorAll('.project-type'));

        if (PROJECT_TYPE == "") return;

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

                default:
                    type.style.backgroundColor = 'var(--green)';
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
        window.onload = function () {
            if (window.location.hash) shiftWindow();
        }
    }


}());






// window.onscroll = function(){
//     // window.location.href = window.location.pathname;
//     // window.location.href.split('#')[0];
//     if (window.location.hash) window.location.hash = "";
// }