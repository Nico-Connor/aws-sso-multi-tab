async function init() {
  const fragment = document.createDocumentFragment();
  const [identities, state] = await Promise.all([
    browser.contextualIdentities.query({}),
    browser.runtime.sendMessage({
      method: "queryIdentitiesState",
      message: {
        windowId: browser.windows.WINDOW_ID_CURRENT
      }
    })
  ]);

  for (const identity of identities) {
    const stateObject = state[identity.cookieStoreId];
    if(stateObject.awsURL){
      const tr = document.createElement("tr");
      tr.classList.add("menu-item", "hover-highlight");
      tr.setAttribute("data-cookie-store-id", identity.cookieStoreId);
      const td = document.createElement("td");
      td.innerHTML = Utils.escaped`
          <div class="menu-icon">
            <div class="usercontext-icon"
              data-identity-icon="${identity.icon}"
              data-identity-color="${identity.color}">
            </div>
          </div>
          <span class="menu-text">${identity.name}</span>
          <img alt="" class="page-action-flag flag-img" src="/img/flags/.png"/>
          `;

      tr.appendChild(td);
      fragment.appendChild(tr);

      Utils.addEnterHandler(tr, async () => {
        Utils.moveToContainer(identity);
        window.close();
      });
    }
  }

  const list = document.querySelector("#picker-identities-list");
  list.innerHTML = "";
  list.appendChild(fragment);

  MozillaVPN.handleContainerList(identities);

  // Set the theme
  Utils.applyTheme();
}

init();
