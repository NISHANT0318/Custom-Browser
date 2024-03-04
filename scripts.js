let tabs = [{url: "intro.html"}];
let currentTab = 0;

function switchTab(index) {
    currentTab = index;
    renderTabs();
    renderInput(); 
}

function closeTab(index) {
    tabs.splice(index, 1);
    currentTab = Math.min(currentTab, tabs.length - 1);
    renderTabs();
    renderInput(); 
}

function createTab() {
    tabs.push({url: ""});
    currentTab = tabs.length - 1;
    renderTabs();
    renderInput(); 
}

function loadURL() {
    const urlInput = document.getElementById(`urlInput-${currentTab}`);
    const iframe = document.getElementById(`iframe-${currentTab}`);
    const currentTabURL = urlInput.value.trim();

    if (currentTabURL !== '') {
        tabs[currentTab].url = currentTabURL;
        iframe.src = currentTabURL;
    }
}

function renderTabs() {
    const tabsElement = document.getElementById('tabs');
    tabsElement.innerHTML = '';

    tabs.forEach((tab, index) => {
        const tabElement = document.createElement('li');
        tabElement.innerHTML = `
            <span class="tab ${index === currentTab ? 'active' : ''}" onclick="switchTab(${index})">Tab ${index + 1}</span>
            ${index !== 0 ? '<button class="close" onclick="closeTab('+index+')">x</button>' : ''}
        `;
        tabsElement.appendChild(tabElement);
    });

  
    const addTabButton = document.createElement('li');
    addTabButton.innerHTML = '<span class="tab" onclick="createTab()">+</span>';
    tabsElement.appendChild(addTabButton);
}

function renderInput() {
    const tabContent = document.getElementById('tab-content');
    const currentTabURL = tabs[currentTab].url;
    tabContent.innerHTML = ''; 

    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.id = `urlInput-${currentTab}`;
    urlInput.placeholder = 'Enter URL and press Enter';
    urlInput.value = currentTabURL; 
    urlInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            loadURL();
        }
    });

    tabContent.appendChild(urlInput); 

   
    const iframe = document.createElement('iframe');
    iframe.id = `iframe-${currentTab}`;
    iframe.className = 'content';
    iframe.src = currentTabURL;
    tabContent.appendChild(iframe);
}


renderTabs();
renderInput(); 
