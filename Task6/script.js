// 1. Tabs Data
let tabs = [];
let activeTabId = null;

// 2. Select DOM elements
const tabBar = document.getElementById("tabBar");
const contentArea = document.getElementById("contentArea");
const addTabBtn = document.getElementById("addTabBtn");
const tabCount = document.getElementById("tabCount");

// 3. Add Tab Button
addTabBtn.addEventListener("click", addTab);

// 4. Add Tab Function
function addTab() {
  const id = Date.now();
  const number = tabs.length + 1;

  const newTab = {
    id: id,
    name: `Tab ${number}`,
    content: `<p>Content for Tab ${number}</p>`
  };

  tabs.push(newTab);

  saveTabs();
  renderTabs();
  switchTab(id);
}

// 5. Render Tabs
function renderTabs() {
  tabBar.innerHTML = "";

  tabs.forEach(tab => {
    const tabBtn = document.createElement("div");
    tabBtn.classList.add("tab-btn");
    tabBtn.setAttribute("data-tab-id", tab.id);

    if (tab.id === activeTabId) {
      tabBtn.classList.add("active");
    }

    tabBtn.innerHTML = `
      <span class="tab-name">${tab.name}</span>
      <button class="rename-btn">✏</button>
      <button class="delete-btn">✗</button>
    `;

    tabBar.appendChild(tabBtn);
  });

  updateTabCount();
}

// 6. Event Delegation (Tab Bar)
tabBar.addEventListener("click", function (e) {
  const tabElement = e.target.closest(".tab-btn");
  if (!tabElement) return;

  const tabId = Number(tabElement.dataset.tabId);

  // Switch tab (click anywhere except buttons)
  if (e.target.classList.contains("tab-name") || e.target.classList.contains("tab-btn")) {
    switchTab(tabId);
  }

  // Rename tab
  if (e.target.classList.contains("rename-btn")) {
    const newName = prompt("Enter new tab name:");
    if (newName && newName.trim() !== "") {
      renameTab(tabId, newName);
    }
  }

  // Delete tab
  if (e.target.classList.contains("delete-btn")) {
    deleteTab(tabId);
  }
});

// 7. Switch Tab
function switchTab(tabId) {
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return;

  activeTabId = tabId;

  // update UI
  renderTabs();
  contentArea.innerHTML = tab.content;
}

// 8. Rename Tab
function renameTab(tabId, newName) {
  tabs = tabs.map(tab => {
    if (tab.id === tabId) {
      return { ...tab, name: newName };
    }
    return tab;
  });

  saveTabs();
  renderTabs();
}

// 9. Delete Tab
function deleteTab(tabId) {
  const wasActive = tabId === activeTabId;

  tabs = tabs.filter(tab => tab.id !== tabId);

  saveTabs();

  if (tabs.length === 0) {
    activeTabId = null;
    tabBar.innerHTML = "";
    contentArea.innerHTML = "<p>No tabs available. Click Add Tab.</p>";
    updateTabCount();
    return;
  }

  // if active tab deleted → switch to first tab
  if (wasActive) {
    switchTab(tabs[0].id);
  } else {
    renderTabs();
  }
}

// 10. Save to localStorage
function saveTabs() {
  localStorage.setItem("tabsData", JSON.stringify(tabs));
  localStorage.setItem("activeTab", activeTabId);
}

// 11. Load from localStorage
function loadTabs() {
  const storedTabs = localStorage.getItem("tabsData");
  const storedActive = localStorage.getItem("activeTab");

  if (storedTabs) {
    tabs = JSON.parse(storedTabs);
  } else {
    tabs = [
      {
        id: Date.now(),
        name: "Home",
        content: "<p>Welcome to the dashboard!</p>"
      }
    ];
  }

  activeTabId = storedActive ? Number(storedActive) : tabs[0]?.id;

  renderTabs();

  if (activeTabId) {
    switchTab(activeTabId);
  } else {
    contentArea.innerHTML = "<p>No tabs available.</p>";
  }
}
// 12. Tab Counter
function updateTabCount() {
  if (tabCount) {
    tabCount.textContent = `Tabs: ${tabs.length}`;
  }
}
// 13. Initial Load
loadTabs();